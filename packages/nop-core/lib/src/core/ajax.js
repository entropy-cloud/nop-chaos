import axios from 'axios';
import { handleGraphQL } from './graphql';
import { parse as qsparse } from 'qs';
import { useAdapter } from '../adapter';
import { HEADER_ACCESS_TOKEN, HEADER_APP_ID, HEADER_TENANT_ID, HEADER_TIMESTAMP, HEADER_VERSION } from './consts';
import { splitPrefixUrl } from '../page';
const GRAPHQL_URL = '/graphql';
const { useAuthToken, useTenantId, useLocale, setAuthToken, logout, useSettings, useI18n, useAppId, globalVersion, notify, alert, processRequest, processResponse } = useAdapter();
export const ajax = axios.create({});
ajax.interceptors.response.use(res => {
    const token = res.headers[HEADER_ACCESS_TOKEN];
    if (token) {
        setAuthToken(token);
    }
    return res;
});
export const isCancel = axios.isCancel;
export function createCancelToken(cancelExecutor) {
    return new axios.CancelToken(cancelExecutor);
}
export function fetcherOk(data) {
    return {
        status: 200,
        headers: {},
        data: {
            status: 0,
            msg: '',
            data: data
        }
    };
}
export function responseOk(data) {
    return {
        status: 0,
        msg: '',
        data
    };
}
export function ajaxRequest(options) {
    return ajaxFetch(options).then(d => {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!options.silent) {
            if ((_a = d.data) === null || _a === void 0 ? void 0 : _a.msg) {
                if ((_b = options.config) === null || _b === void 0 ? void 0 : _b.useAlert) {
                    alert(d.data.msg);
                }
                else {
                    notify(((_c = d.data) === null || _c === void 0 ? void 0 : _c.status) == 0 ? 'info' : 'error', d.data.msg);
                }
            }
        }
        if (((_d = d.data) === null || _d === void 0 ? void 0 : _d.status) != 0)
            throw new Error(((_e = d.data) === null || _e === void 0 ? void 0 : _e.msg) || 'ajax-fail:\ncode=' + ((_f = d.data) === null || _f === void 0 ? void 0 : _f.code) + ',status=' + ((_g = d.data) === null || _g === void 0 ? void 0 : _g.status));
        return d.data.data;
    });
}
/**
 * 提供的对外接口符合amis框架的要求
 */
export function ajaxFetch(options) {
    var _a, _b, _c, _d;
    options.config = options.config || {};
    let url = options.url;
    let query = options.query || {};
    const pos = url.indexOf('?');
    if (pos > 0) {
        query = Object.assign(Object.assign({}, query), qsparse(url.substring(pos + 1)));
        url = url.substring(0, pos);
    }
    options.query = query;
    const [type, path] = splitPrefixUrl(url) || [];
    if (type == 'action') {
        const actionName = path;
        const action = (_a = options._page) === null || _a === void 0 ? void 0 : _a.getAction(actionName);
        if (!action) {
            return Promise.reject(new Error("nop.err.unknown-action:" + actionName));
        }
        try {
            return Promise.resolve(action(options));
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    else if (type == 'dict') {
        return useAdapter().fetchDict(path, options);
    }
    else if (type == 'page') {
        return useAdapter().fetchPageAndTransform(path, options);
    }
    const globSetting = useSettings();
    if (globSetting.apiUrl && options.config.useApiUrl !== false) {
        url = `${globSetting.apiUrl}${url}`;
    }
    const config = {
        withCredentials: (_b = options.config.withCredentials) !== null && _b !== void 0 ? _b : true,
        url: url,
        method: options.method || 'post',
        headers: options.headers || {},
        data: options.data,
        params: query,
        responseType: options.responseType
    };
    if ((_c = options.config) === null || _c === void 0 ? void 0 : _c.cancelExecutor) {
        const controller = new AbortController();
        options.config.cancelExecutor(() => {
            controller.abort();
        });
        config.signal = controller.signal;
    }
    const opts = {
        withToken: options.config.withToken,
    };
    prepareHeaders(config, opts);
    handleGraphQL(config, GRAPHQL_URL, options);
    if (((_d = config.method) === null || _d === void 0 ? void 0 : _d.toLowerCase()) == 'get') {
        config.params = Object.assign(Object.assign({}, options.data), query);
        config.data = null;
    }
    const res = ajax.request(processRequest(config))
        .then(res => {
        var _a;
        if (res.status == 200 && ((_a = options.config) === null || _a === void 0 ? void 0 : _a.rawResponse)) {
            res.data = responseOk(res.data);
        }
        return res;
    })
        .catch(error => {
        var _a;
        if (axios.isCancel(error)) {
            throw error;
        }
        const { t } = useI18n();
        const { response } = error || {};
        if (!response || !response.status) {
            // return '[HTTP] Request has no return value';
            throw new Error(t('sys.api.apiRequestFailed'));
        }
        const err = error.toString();
        let errMessage = normalizeErrMessage(response.status, '');
        if (!errMessage && (err === null || err === void 0 ? void 0 : err.includes('Network Error'))) {
            errMessage = t('sys.api.networkExceptionMsg');
        }
        if (((_a = response.data) === null || _a === void 0 ? void 0 : _a.status) == null) {
            return {
                status: response.status,
                data: {
                    status: -1,
                    msg: errMessage
                }
            };
        }
        return response;
    }).then(response => {
        if (options.responseType == 'blob') {
            if (response.status == 401) {
                doLogout("401");
                return response;
            }
            //const __ = makeTranslator(currentLocale.value);
            //return attachmentAdpator(response, __);
            return response;
        }
        let data = response.data || {};
        if (response.status == 401 || data.status == 401) {
            doLogout("401");
        }
        else if (data.status == 0 || data.status == 200) {
            if (options.responseKey) {
                data = { [options.responseKey]: data.data };
            }
        }
        response.data = data;
        return response;
    });
    return processResponse(res);
}
function prepareHeaders(config, opts) {
    // 请求之前处理config
    const token = useAuthToken();
    let tenantid = useTenantId();
    config.headers = config.headers || {};
    config.headers['nop-locale'] = useLocale();
    config.headers['x-requested-with'] = 'XMLHttpRequest';
    if (token && opts.withToken !== false) {
        // jwt token
        //config.headers.Authorization = `${options.authenticationScheme} ${token}` : token;
        config.headers.Authorization = `Bearer ${token}`;
        //config.headers[ConfigEnum.TOKEN] = token;
        //--update-begin--author:liusq---date:20210831---for:将签名和时间戳，添加在请求接口 Header
        // update-begin--author:taoyan---date:20220421--for: VUEN-410【签名改造】 X-TIMESTAMP牵扯
        config.headers[HEADER_TIMESTAMP] = new Date().getTime();
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
        let appId = useAppId();
        if (appId) {
            config.headers[HEADER_APP_ID] = appId;
        }
        // update-end--author:sunjianlei---date:20220624--for: 添加低代码应用ID
        // ========================================================================================
    }
}
function normalizeErrMessage(status, msg) {
    const { t } = useI18n();
    let errMessage = '';
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
    return errMessage;
}
function doLogout(reason) {
    setAuthToken(undefined);
    logout(reason);
}
