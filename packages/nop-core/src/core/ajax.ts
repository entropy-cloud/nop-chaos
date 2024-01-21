import type { AxiosRequestConfig } from 'axios'

import axios from 'axios'

import { handleGraphQL } from './graphql';

import { parse as qsparse } from 'qs'

import { ApiResponse, FetcherRequest, FetcherResult } from "./types";
import { useAdapter } from '../adapter';
import { HEADER_ACCESS_TOKEN, HEADER_APP_ID, HEADER_TENANT_ID, HEADER_TIMESTAMP, HEADER_VERSION } from './consts';
import { splitPrefixUrl } from '../page';
import attachmentAdpator from './attachmentAdpator';

const GRAPHQL_URL = '/graphql'


export const ajax = axios.create({

})

ajax.interceptors.response.use(
	res => {
		const token = res.headers[HEADER_ACCESS_TOKEN]
		if (token) {
			useAdapter().setAuthToken(token)
		}
		return res
	}
)

export const isCancel = axios.isCancel

export function createCancelToken(cancelExecutor: any) {
	return new axios.CancelToken(cancelExecutor)
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

export function responseOk(data: any): ApiResponse {
	return {
		status: 0,
		msg: '',
		data
	}
}

export function ajaxRequest(options: FetcherRequest): Promise<any> {
	const { notify, alert } = useAdapter()


	return ajaxFetch(options).then(d => {
		if (!options.silent) {
			if (d.data?.msg) {
				if (options.config?.useAlert) {
					alert(d.data.msg)
				} else {
					notify(d.data?.status == 0 ? 'info' : 'error', d.data.msg)
				}
			}
		}
		if (d.data?.status != 0)
			throw new Error(d.data?.msg || 'ajax-fail:\ncode=' + d.data?.code + ',status=' + d.data?.status);
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
	options.query = query

	const [type, path] = splitPrefixUrl(url) || []

	if (type == 'action') {
		const actionName = path
		const action = options._page?.getAction(actionName)
		if (!action) {
			return Promise.reject(new Error("nop.err.unknown-action:" + actionName))
		}

		try {
			let result = action(options)
			return Promise.resolve(result).then(res=>{
				if(res == null)
					return fetcherOk(res)
				return res as any
			})
		} catch (e: any) {
			return Promise.reject(e)
		}
	} else if (type == 'dict') {
		return useAdapter().fetchDict(path, options)
	} else if (type == 'page') {
		return useAdapter().fetchPageAndTransform(path, options)
	}

	const globSetting = useAdapter().useSettings()

	if (globSetting.apiUrl && options.config.useApiUrl !== false) {
		url = `${globSetting.apiUrl}${url}`;
	}

	function normalizeData(data:any){
		if(!data)
			return data
		if(data instanceof FormData || data instanceof ArrayBuffer)
			return data
		return Object.assign({}, data)
	}

	const data = normalizeData(options.data)

	const config: AxiosRequestConfig<any> = {
		withCredentials: options.config.withCredentials ?? true,
		url: url,
		method: options.method as any || 'post',
		headers: options.headers || {},
		data: data,
		params: query,
		responseType: options.responseType
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
		config.params = { ...config.data, ...query }
		config.data = null
	}

	const { useI18n, processRequest, processResponse } = useAdapter()



	const res = ajax.request(processRequest(config))
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
			if (options.responseType == 'blob') {
				if (response.status == 401) {
					doLogout("401")
					return response
				}

				const __ = useI18n().t
				return attachmentAdpator(response, __);
				//return response
			}
			let data = response.data || {}
			if (response.status == 401 || data.status == 401) {
				doLogout("401")
			} else if (data.status == 0 || data.status == 200) {
				if (options.responseKey) {
					data = { [options.responseKey]: data.data }
				}
			}

			response.data = data
			return response
		})

	return processResponse(res)
}

type ExtOptions = {
	withToken?: boolean
}

function prepareHeaders(config: AxiosRequestConfig, opts: ExtOptions) {
	const { useAuthToken, useTenantId, useLocale, useAppId, globalVersion } = useAdapter()


	// 请求之前处理config
	const token = useAuthToken();
	let tenantid = useTenantId();
	config.headers = config.headers || {}
	config.headers['nop-locale'] = useLocale()?.replace('_','-')
	config.headers['x-requested-with'] = 'XMLHttpRequest'

	if (token && opts.withToken !== false) {
		// jwt token
		//config.headers.Authorization = `${options.authenticationScheme} ${token}` : token;
		config.headers.Authorization = `Bearer ${token}`;
		//config.headers[ConfigEnum.TOKEN] = token;
		//--update-begin--author:liusq---date:20210831---for:将签名和时间戳，添加在请求接口 Header

		// update-begin--author:taoyan---date:20220421--for: VUEN-410【签名改造】 X-TIMESTAMP牵扯
		config.headers[HEADER_TIMESTAMP] = new Date().getTime()
		// update-end--author:taoyan---date:20220421--for: VUEN-410【签名改造】 X-TIMESTAMP牵扯

		//config.headers[ConfigEnum.Sign] = signMd5Utils.getSign(config.url, config.params);
		//--update-end--author:liusq---date:20210831---for:将签名和时间戳，添加在请求接口 Header
		//--update-begin--author:liusq---date:20211105---for: for:将多租户id，添加在请求接口 Header
		if (!tenantid) {
			tenantid = '0';
		}
		config.headers[HEADER_TENANT_ID] = tenantid;
		//--update-begin--author:liusq---date:20220325---for: 增加vue3标记
		config.headers[HEADER_VERSION] = globalVersion;
		//--update-end--author:liusq---date:20220325---for:增加vue3标记
		//--update-end--author:liusq---date:20211105---for:将多租户id，添加在请求接口 Header

		// ========================================================================================
		// update-begin--author:sunjianlei---date:20220624--for: 添加低代码应用ID
		let appId = useAppId()
		if (appId) {
			config.headers[HEADER_APP_ID] = appId
		}
		// update-end--author:sunjianlei---date:20220624--for: 添加低代码应用ID
		// ========================================================================================
	}
}

function normalizeErrMessage(status: number, msg: string) {
	const { t } = useAdapter().useI18n()

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

function doLogout(reason: string) {
	const { setAuthToken, logout } = useAdapter()
	setAuthToken(undefined)
	logout(reason)
}