
import { ApiObject, fetcherResult, qsparse } from "amis";
import type { AxiosRequestConfig } from 'axios'

import axios from 'axios'

import { currentLocale, useI18n } from './i18n'

import { handleGraphQL } from './graphql';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { SessionTimeoutProcessingEnum } from '/@/enums/appEnum';
import { getAuthToken, getTenantId, setAuthToken } from './auth';
import { ConfigEnum } from '/@/enums/httpEnum';
import { router } from '/@/router';
import signMd5Utils from '/@/utils/encryption/signMd5Utils';

import { globalVersion } from "../shared";

import projectSetting from '/@/settings/projectSetting';

import { toast, alert } from './ui'

import { useGlobSetting } from '/@/hooks/setting';

const globSetting = useGlobSetting()

const GRAPHQL_URL = '/graphql'


export const ajax = axios.create({

})

ajax.interceptors.response.use(
	res => {
		const token = res.headers[ConfigEnum.TOKEN]
		if (token) {
			setAuthToken(token)
		}
		return res
	}
)

export const isCancel = axios.isCancel

export function createCancelToken(cancelExecutor: any) {
	return new axios.CancelToken(cancelExecutor)
}

export type FetcherResult = fetcherResult
export type FetcherRequest = ApiObject & {
	config?: AjaxConfig,
	delimiter?: string,
	valueField?: string,
	labelField?: string
}
export type AjaxResponse = NonNullable<fetcherResult['data']>

export type AjaxConfig = {
	silent?:boolean,
	withCredentials?: boolean,
	cancelExecutor?: (cancel: Function) => void;

	rawResponse?: boolean,
	useAlert?: boolean,
	useApiUrl?: boolean,
	withToken?: boolean
}

export function fetcherOk(data: any): FetcherResult {
	return {
		status: 200,
		headers: {},
		data: {
			status: 0,
			msg: '',
			data: data
		}
	}
}

export function responseOk(data: any): AjaxResponse {
	return {
		status: 0,
		msg: '',
		data
	}
}

export function ajaxRequest(options: FetcherRequest): Promise<any> {
	return ajaxFetch(options).then(d => {
		if (!options.silent) {
			if (d.data?.msg) {
				if (options.config?.useAlert) {
					alert(d.data.msg)
				} else {
					toast[d.data?.status == 0 ? 'info' : 'error'](d.data.msg)
				}
			}
		}
		if (d.data?.status != 0)
			throw new Error(d.data?.msg ||  'ajax-fail:\ncode='+d.data?.code+',status='+d.data?.status);
		return d.data!.data
	})
}

/**
 * 提供的对外接口符合amis框架的要求
 */
export function ajaxFetch(options: FetcherRequest): Promise<FetcherResult> {
	options.config = options.config || {}

	let url = options.url
	let query = options.query || {}
	const pos = url.indexOf('?')
	if (pos > 0) {
		query = { ...query, ...qsparse(url.substring(pos + 1)) }
		url = url.substring(0, pos)
	}

	if (globSetting.apiUrl && options.config.useApiUrl !== false) {
		url = `${globSetting.apiUrl}${url}`;
	}

	const config: AxiosRequestConfig<any> = {
		withCredentials: options.config.withCredentials ?? true,
		url: url,
		method: options.method as any || 'post',
		headers: options.headers || {},
		data: options.data,
		params: query
	}

	if (options.config?.cancelExecutor) {
		const controller = new AbortController();
		options.config.cancelExecutor(() => {
			controller.abort()
		})
		config.signal = controller.signal
	}

	const opts: ExtOptions = {
		withToken: options.config.withToken,
	}

	prepareHeaders(config, opts)

	handleGraphQL(config, GRAPHQL_URL, options)

	if (config.method?.toLowerCase() == 'get') {
		config.params = { ...options.data, ...query }
		config.data = null
	}

	return ajax.request(config)
		.then(res => {
			if (res.status == 200 && options.config?.rawResponse) {
				res.data = responseOk(res.data)
			}
			return res
		})
		.catch(error => {
			if (axios.isCancel(error)) {
				throw error
			}
			const { t } = useI18n()
			const { response } = error || {};
			if (!response || !response.status) {
				// return '[HTTP] Request has no return value';
				throw new Error(t('sys.api.apiRequestFailed'));
			}

			const err: string = error.toString();
			let errMessage = normalizeErrMessage(response.status, '');
			if (!errMessage && err?.includes('Network Error')) {
				errMessage = t('sys.api.networkExceptionMsg');
			}

			if (response.data?.status == null) {
				return {
					status: response.status,
					data: {
						status: -1,
						msg: errMessage
					}
				}
			}
			return response
		}).then(response => {
			let data = response.data || {}

			if (response.status == 401 || data.status == 401)
				doLogout()

			response.data = data
			return response
		})
}

type ExtOptions = {
	withToken?: boolean
}

function prepareHeaders(config: AxiosRequestConfig, opts: ExtOptions) {
	// 请求之前处理config
	const token = getAuthToken();
	let tenantid = getTenantId();
	config.headers = config.headers || {}
	config.headers['nop-locale'] = currentLocale.value.replace('_', '-')
	config.headers['x-requested-with'] = 'XMLHttpRequest'

	if (token && opts.withToken !== false) {
		// jwt token
		//config.headers.Authorization = `${options.authenticationScheme} ${token}` : token;
		//config.headers.Authorization = `Bearer ${token}`;
		config.headers[ConfigEnum.TOKEN] = token;
		//--update-begin--author:liusq---date:20210831---for:将签名和时间戳，添加在请求接口 Header

		// update-begin--author:taoyan---date:20220421--for: VUEN-410【签名改造】 X-TIMESTAMP牵扯
		config.headers[ConfigEnum.TIMESTAMP] = signMd5Utils.getTimestamp();
		// update-end--author:taoyan---date:20220421--for: VUEN-410【签名改造】 X-TIMESTAMP牵扯

		//config.headers[ConfigEnum.Sign] = signMd5Utils.getSign(config.url, config.params);
		//--update-end--author:liusq---date:20210831---for:将签名和时间戳，添加在请求接口 Header
		//--update-begin--author:liusq---date:20211105---for: for:将多租户id，添加在请求接口 Header
		if (!tenantid) {
			tenantid = '0';
		}
		config.headers[ConfigEnum.TENANT_ID] = tenantid;
		//--update-begin--author:liusq---date:20220325---for: 增加vue3标记
		config.headers[ConfigEnum.VERSION] = globalVersion;
		//--update-end--author:liusq---date:20220325---for:增加vue3标记
		//--update-end--author:liusq---date:20211105---for:将多租户id，添加在请求接口 Header

		// ========================================================================================
		// update-begin--author:sunjianlei---date:20220624--for: 添加低代码应用ID
		let routeParams = router.currentRoute.value.params;
		if (routeParams.appId) {
			config.headers[ConfigEnum.X_LOW_APP_ID] = routeParams.appId as string;
			// lowApp自定义筛选条件
			if (routeParams.lowAppFilter) {
				config.params = { ...config.params, ...JSON.parse(routeParams.lowAppFilter as string) };
				delete routeParams.lowAppFilter;
			}
		}
		// update-end--author:sunjianlei---date:20220624--for: 添加低代码应用ID
		// ========================================================================================
	}
}

function normalizeErrMessage(status: number, msg: string) {
	const { t } = useI18n()

	let errMessage = ''
	switch (status) {
		// 401: Not logged in
		// Jump to the login page if not logged in, and carry the path of the current page
		// Return to the current page after successful login. This step needs to be operated on the login page.
		case 401:
			errMessage = msg || t('sys.api.errMsg401');
			break;
		case 403:
			errMessage = t('sys.api.errMsg403');
			break;
		// 404请求不存在
		case 404:
			errMessage = t('sys.api.errMsg404');
			break;
		case 405:
			errMessage = t('sys.api.errMsg405');
			break;
		case 408:
			errMessage = t('sys.api.errMsg408');
			break;
		case 500:
			errMessage = t('sys.api.errMsg500');
			break;
		case 501:
			errMessage = t('sys.api.errMsg501');
			break;
		case 502:
			errMessage = t('sys.api.errMsg502');
			break;
		case 503:
			errMessage = t('sys.api.errMsg503');
			break;
		case 504:
			errMessage = t('sys.api.errMsg504');
			break;
		case 505:
			errMessage = t('sys.api.errMsg505');
			break;
		default:
	}
	return errMessage
}

function doLogout() {
	const userStore = useUserStoreWithOut();
	userStore.setToken(undefined);
	if (projectSetting.sessionTimeoutProcessing === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
		userStore.setSessionTimeout(true);
	} else {
		userStore.logout(true);
	}
}