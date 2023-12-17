export type QueryBean = {
    offset?: number
    limit?: number
    cursor?: string
    filter?: TreeBean
    orderBy?: OrderFieldBean[]
    timeout?: number
}

export type OrderFieldBean = {
    name: string
    desc: boolean
    nullsFirst?: boolean
}

export type TreeBean = {
    $type: string
    $body?: any
    [name: string]: any
}

/**
 * 分页数据
 */
export type PageBean<T> = {
    items: T[],
    total: number,
    limit: number,
    offset: number,
    hasPrev? : Boolean,
    hasNext? : Boolean,
    prevCursor: string,
    nextCursor: string
}

/**
 * 后端服务返回的标准结果类型，一般情况下http响应码都是200.
 * 后台出错时status不为0，且code和msg字段有值.
 * 成功时status==0, 此时data字段用于传输返回数据
 */
export type ApiResponse<T = any> = {
    status: number;
    code?: string,
    msg?: string;
    msgTimeout?: number;
    data: any;
    bizFatal?: boolean,
    errors?: {
        [propName: string]: string;
    };
    headers?: { [name: string]: any }
    [propName: string]: any;
}

export type FetcherResult = {
    data?: ApiResponse
    status: number;
    headers: any;
}

export type FetcherRequest = ApiObject & {
    config?: AjaxConfig,
    delimiter?: string,
    valueField?: string,
    labelField?: string,
    filter?: TreeBean,
    responseKey?: string // 如果返回的数据不是对象类型，可以用这个属性将它包装为{[responseKey]:data}
    "gql:selection"?: string

    _page?: BasePage
    _scoped?: any
}

// export type AjaxResponse = NonNullable<FetcherResult['data']>

export type AjaxConfig = {
    silent?: boolean,
    withCredentials?: boolean,
    cancelExecutor?: (cancel: Function) => void;

    rawResponse?: boolean,
    useAlert?: boolean,
    useApiUrl?: boolean,
    withToken?: boolean
}

export type BasePage = {
    getAction(actionName: string): Function
    registerAction(actionName: string, fn: Function): void
    resetActions()
}

//=================== 以下为从AMIS项目拷贝的类型定义 ===============================

interface BaseApiObject {
    /**
     * API 发送类型
     */
    method?: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'jsonp' | 'js';
    /**
     * API 发送目标地址
     */
    url: string;
    /**
     * 用来控制携带数据. 当key 为 `&` 值为 `$$` 时, 将所有原始数据打平设置到 data 中. 当值为 $$ 将所有原始数据赋值到对应的 key 中. 当值为 $ 打头时, 将变量值设置到 key 中.
     */
    data?: {
        [propName: string]: any;
    };
    /**
     * 默认数据映射中的key如果带点，或者带大括号，会转成对象比如：
     *
     * {
     *   'a.b': '123'
     * }
     *
     * 经过数据映射后变成
     * {
     *  a: {
     *   b: '123
     *  }
     * }
     *
     * 如果想要关闭此功能，请设置 convertKeyToPath 为 false
     */
    convertKeyToPath?: boolean;
    /**
     * 用来做接口返回的数据映射。
     */
    responseData?: {
        [propName: string]: any;
    };
    /**
     * 如果 method 为 get 的接口，设置了 data 信息。
     * 默认 data 会自动附带在 query 里面发送给后端。
     *
     * 如果想通过 body 发送给后端，那么请把这个配置成 false。
     *
     * 但是，浏览器还不支持啊，设置了只是摆设。除非服务端支持 method-override
     */
    attachDataToQuery?: boolean;
    /**
     * 发送体的格式
     */
    dataType?: 'json' | 'form-data' | 'form';
    /**
     * 如果是文件下载接口，请配置这个。
     */
    responseType?: 'blob';
    /**
     * 携带 headers，用法和 data 一样，可以用变量。
     */
    headers?: {
        [propName: string]: string | number;
    };
    /**
     * 设置发送条件
     */
    sendOn?: string;
    /**
     * 默认都是追加模式，如果想完全替换把这个配置成 true
     */
    replaceData?: boolean;
    /**
     * 是否自动刷新，当 url 中的取值结果变化时，自动刷新数据。
     *
     * @default true
     */
    autoRefresh?: boolean;
    /**
     * 当开启自动刷新的时候，默认是 api 的 url 来自动跟踪变量变化的。
     * 如果你希望监控 url 外的变量，请配置 traceExpression。
     */
    trackExpression?: string;
    /**
     * 如果设置了值，同一个接口，相同参数，指定的时间（单位：ms）内请求将直接走缓存。
     */
    cache?: number;
    /**
     * 强制将数据附加在 query，默认只有 api 地址中没有用变量的时候 crud 查询接口才会
     * 自动附加数据到 query 部分，如果想强制附加请设置这个属性。
     * 对于那种临时加了个变量但是又不想全部参数写一遍的时候配置很有用。
     */
    forceAppendDataToQuery?: boolean;
    /**
     * qs 配置项
     */
    qsOptions?: {
        arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma';
        indices?: boolean;
        allowDots?: boolean;
    };
    /**
     * autoFill 是否显示自动填充错误提示
     */
    silent?: boolean;
    /**
     * 提示信息
     */
    messages?: {
        success?: string;
        failed?: string;
    };
}

interface PlainObject {
    [propsName: string]: any;
}

export interface ApiObject extends BaseApiObject {
    config?: {
        withCredentials?: boolean;
        cancelExecutor?: (cancel: Function) => void;
    };
    graphql?: string;
    operationName?: string;
    body?: PlainObject;
    query?: PlainObject;
    adaptor?: (payload: object, response: FetcherResult, api: ApiObject) => any;
    requestAdaptor?: (api: ApiObject) => ApiObject;
}
