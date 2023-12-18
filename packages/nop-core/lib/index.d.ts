import { AxiosInstance } from 'axios';
import { AxiosRequestConfig } from 'axios';
import { CancelToken } from 'axios';
import { Component } from 'vue';
import { Match } from 'path-to-regexp';
import type { Options } from 'lru-cache';
import { Pinia } from 'pinia';
import { Ref } from 'vue';
import { Router } from 'vue-router';
import { Store } from 'pinia';

export declare function absolutePath(path: string, basePath: string): string;

/**
 * nop-chaos对外部框架的依赖都集中在adapter对象中
 */
declare const adapter: {
    globalVersion: string;
    configUpgrade(configName: string, version: number, prevVersion: number, config: any): any;
    /**
     * 返回当前的locale
     */
    useLocale(): string;
    useI18n(): I18nOperation;
    usePinia(): Pinia;
    /**
     * 返回指定的Store
     */
    useStore(name: string): Store;
    useRouter(): Router;
    useSettings(): Settings;
    /**
     * 返回当前的认证token
     */
    useAuthToken(): string;
    setAuthToken(token?: string): void;
    isUserInRole(role: string): boolean;
    useTenantId(): string;
    useAppId(): string;
    /**
     * 自动退出时执行的回调
     */
    logout(reason: string): void;
    /**
     * 根据组件名加载Vue组件
     */
    resolveVueComponent(name: string): any;
    processRequest(request: any): any;
    processResponse(response: any): any;
    compileFunction(code: string, page: any): Function;
    jumpTo(to: string, action?: any, ctx?: object): void;
    isCurrentUrl: typeof default_isCurrentUrl;
    updateLocation: typeof default_updateLocation;
    notify(type: ToastLevel, msg: any, conf?: ToastConf): void;
    alert(msg: string, title?: string): Promise<void>;
    confirm(msg: string, title?: string): Promise<boolean>;
    dataMapping(to: any, from?: PlainObject, ignoreFunction?: boolean | ((key: string, value: any) => boolean), convertKeyToPath?: boolean, ignoreIfNotMatch?: boolean): any;
    fetchDict(dictName: string, options: FetcherRequest): Promise<FetcherResult>;
    fetchPageAndTransform(pageName: string, options: FetcherRequest): Promise<FetcherResult>;
    getPage(pageUrl: string): Promise<any>;
};

export declare type AdapterType = typeof adapter;

export declare function addSystemImportMap(imports: Record<string, string>): void;

export declare const ajax: AxiosInstance;

export declare type AjaxConfig = {
    silent?: boolean;
    withCredentials?: boolean;
    cancelExecutor?: (cancel: Function) => void;
    rawResponse?: boolean;
    useAlert?: boolean;
    useApiUrl?: boolean;
    withToken?: boolean;
};

/**
 * 提供的对外接口符合amis框架的要求
 */
export declare function ajaxFetch(options: FetcherRequest): Promise<FetcherResult>;

export declare function ajaxRequest(options: FetcherRequest): Promise<any>;

export declare interface ApiObject extends BaseApiObject {
    config?: {
        withCredentials?: boolean;
        cancelExecutor?: (cancel: Function) => void;
    };
    graphql?: string;
    operationName?: string;
    body?: PlainObject_2;
    query?: PlainObject_2;
    adaptor?: (payload: object, response: FetcherResult, api: ApiObject) => any;
    requestAdaptor?: (api: ApiObject) => ApiObject;
}

/**
 * 后端服务返回的标准结果类型，一般情况下http响应码都是200.
 * 后台出错时status不为0，且code和msg字段有值.
 * 成功时status==0, 此时data字段用于传输返回数据
 */
export declare type ApiResponse<T = any> = {
    status: number;
    code?: string;
    msg?: string;
    msgTimeout?: number;
    data: any;
    bizFatal?: boolean;
    errors?: {
        [propName: string]: string;
    };
    headers?: {
        [name: string]: any;
    };
    [propName: string]: any;
};

export declare type ArgumentDefinition = {
    name: string;
    type: string;
    builder?: (data: any, arg: ArgumentDefinition, options: FetcherRequest) => any;
};

export declare type AsyncCache<T> = {
    get(key: string, loader: AsyncCacheLoader<T>): Promise<T>;
    delete(key: string): void;
    clear(): void;
};

export declare type AsyncCacheLoader<T> = (key: string) => Promise<T>;

export declare type AsyncCacheOptions<T> = Options<string, T>;

declare interface BaseApiObject {
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

export declare type BasePage = {
    getAction(actionName: string): Function;
    registerAction(actionName: string, fn: Function): void;
    resetActions(): any;
};

/**
 * 通过xui:import可以引入SystemJs格式的js模块，通过@action:xxx，@fn:(a,b)=>expr这种形式可以调用js模块中的函数
 *
 * 例如 {
 *    "xui:a.lib"
 *    "page": {
 *       dialog: {
 *          "xui:b.lib"
 *          api: "@action:a.f1"
 *       }
 *    }
 * }
 *
 * 上面的例子中@action:a.f1首先向上查找最近的xui:import引入的js库，如果没有找到，则继续向上查找直到顶层的节点。
 *
 * @action：xxx与 @fn:(a,b)=> expr的区别在于 @action:xxx对应函数名，@fn:(a,b)=>expr则是直接定义匿名函数实现
 *
 * @param json json schema
 */
export declare function bindActions(pageUrl: string, json: any, page: BasePage): Promise<void>;

export declare function clearDictCache(): void;

export declare function clearLocalCache(): void;

export declare function clearPageCache(): void;

export declare function clearScoped(): void;

export declare function conditionToTree(cond: any): {
    $type: any;
    $body: any;
    name?: undefined;
    value?: undefined;
} | {
    $type: any;
    name: any;
    value: any;
    $body?: undefined;
};

export declare function createAsyncCache<T>(options: AsyncCacheOptions<any>): AsyncCache<T>;

export declare function createCancelToken(cancelExecutor: any): CancelToken;

export declare function createPage(options: PageOptions): PageObject;

export declare function default_isCurrentUrl(to: string, ctx?: any): true | Match<object>;

export declare function default_jumpTo(router: Router, to: string): void;

export declare function default_updateLocation(to: any, replace: boolean): void;

export declare function deleteDynamicModules(): void;

export declare function deletePageCache(path: string): void;

declare function DevTool__clearComponentCache(): Promise<any>;

declare function DictProvider__getDict(dictName: string, silent: boolean): Promise<any>;

export declare type EventCallbacks = {
    [source: string]: OnEventType[];
};

export declare type EventCleanup = () => void;

export declare function fetcherOk(data: any): FetcherResult;

export declare type FetcherRequest = ApiObject & {
    config?: AjaxConfig;
    delimiter?: string;
    valueField?: string;
    labelField?: string;
    filter?: TreeBean;
    responseKey?: string;
    "gql:selection"?: string;
    _page?: BasePage;
    _scoped?: any;
};

export declare type FetcherResult = {
    data?: ApiResponse;
    status: number;
    headers: any;
};

export declare function format(msg: string, placeholderStart: string, placeholdeEnd: string, resolver: ResolveFunction): string;

export declare function getSchemaProcessorType(typeName: string): SchemaProcessorType;

export declare function handleGraphQL(config: AxiosRequestConfig<any>, graphqlUrl: string, options: FetcherRequest): boolean;

export declare type I18nOperation = {
    t(msg: string): string;
};

/**
 * 动态加载js文件
 * @param path js文件路径
 * @returns
 */
export declare function importModule(path: string): any;

export declare const isCancel: (value: any) => boolean;

export declare function isPageUrl(url: string): boolean;

declare function LoginApi__generateVerifyCode(verifySecret: string): Promise<any>;

declare function LoginApi__getLoginUserInfo(): Promise<any>;

declare function LoginApi__login(req: LoginRequest): Promise<any>;

declare function LoginApi__logout(): Promise<any>;

export declare type LoginRequest = {
    loginType: number;
    principalId: string;
    principalSecret: string;
    verifyCode?: string;
    verifySecret?: string;
};

export declare type OnCancelCallback = () => void;

export declare type OnChangeCallback = (value: any) => void;

export declare type OnEventType = (event: string, data: any, ctx: any) => any;

export declare type OnOkCallback = (value?: any) => Promise<boolean | void> | boolean | void;

export declare function openWindow(url: string, opt?: {
    target?: string;
    noopener?: boolean;
    noreferrer?: boolean;
}): void;

export declare type OperationDefinition = {
    arguments: ArgumentDefinition[];
};

export declare type OperationType = "query" | "mutation" | "subscription";

export declare type OptionsType = {
    [propName: string]: any;
};

export declare type OrderFieldBean = {
    name: string;
    desc: boolean;
    nullsFirst?: boolean;
};

/**
 * scoped对应当前amis的scope。只有page/crud/service/form/等少数组件才具有scope
 */
export declare type PageAction = (page: PageObject, scoped: any, options: FetcherRequest) => Promise<FetcherResult>;

export declare const PageApis: {
    DevTool__clearComponentCache: typeof DevTool__clearComponentCache;
    PageProvider__getPage: typeof PageProvider__getPage;
    PageProvider__getPageSource: typeof PageProvider__getPageSource;
    PageProvider__rollbackPageSource: typeof PageProvider__rollbackPageSource;
    PageProvider__savePageSource: typeof PageProvider__savePageSource;
    DictProvider__getDict: typeof DictProvider__getDict;
};

/**
 * 分页数据
 */
export declare type PageBean<T> = {
    items: T[];
    total: number;
    limit: number;
    offset: number;
    hasPrev?: Boolean;
    hasNext?: Boolean;
    prevCursor: string;
    nextCursor: string;
};

/**
 * 在action函数中可以访问到的页面对象，包括router, amis的store和pinia store等
 */
export declare type PageObject = BasePage & {
    id: string;
    getScopedStore(name: string): any;
    getComponent(name: string): any;
    getState(name: string): any;
    setState(name: string, value: any): any;
};

export declare type PageOptions = {
    /**
     * 获取amis的component
     */
    getComponent(name: string): any;
    getScopedStore(name: string): any;
    getState(name: string): any;
    setState(name: string, value: any): any;
    actions?: Record<string, Function>;
};

declare function PageProvider__getPage(path: string): Promise<any>;

declare function PageProvider__getPageSource(path: string, silent?: boolean): Promise<any>;

declare function PageProvider__rollbackPageSource(path: string, silent?: boolean): Promise<any>;

declare function PageProvider__savePageSource(path: string, data: any, silent?: boolean): Promise<any>;

declare interface PlainObject {
    [propsName: string]: any;
}

declare interface PlainObject_2 {
    [propsName: string]: any;
}

/**
 * 查找所有具有typeProp指定的属性的节点，并调用processor进行处理，返回结果将会替换原节点。
 * 例如识别xui:roles属性，自动删除没有对应权限的节点
 *
 * @param json json对象
 * @param typeProp 类型字段名
 * @param processor 处理器
 * @returns 经过处理替换后得到的节点
 */
export declare function processXuiDirective(json: any, typeProp: string, processor: XuiDirectiveProcessor): Promise<any>;

/**
 * 对json对象中的字符串值调用processor来处理
 * @param json 待处理的对象
 * @param processor 处理器
 * @returns
 */
export declare function processXuiValue(json: any, processor: XuiValueProcessor): any;

export declare function providePage(page: PageObject): void;

export declare function provideScoped(scoped: any): void;

export declare function provideScopedStore(store: any): void;

export declare type QueryBean = {
    offset?: number;
    limit?: number;
    cursor?: string;
    filter?: TreeBean;
    orderBy?: OrderFieldBean[];
    timeout?: number;
};

export declare function refHolder<T>(): ValueHolder<T>;

export declare function registerAdapter(data: Partial<typeof adapter>): void;

export declare function registerModule(name: string, lib: any): void;

export declare function registerOperation(name: string, op: OperationDefinition): void;

export declare type RegisterPage = (page: PageObject) => void;

export declare function registerSchemaProcessorType(typeName: string, schemaProcessorType: SchemaProcessorType): void;

export declare function registerXuiComponent(type: string, component: XuiComponent): void;

export declare type RenderContext = {
    /**
     * 将json对象渲染为虚拟DOM类型。不同的框架实现不同
     */
    render: (name: string, schema: SchemaType, props: OptionsType, ctx: any) => VDomType;
    /**
     * 动态执行ajax调用，
     */
    executor: (api: ApiObject, data: any, ctx: any) => Promise<ApiResponse> | undefined;
    /**
     * 向上冒泡触发自定义动作
     */
    onEvent?: OnEventType;
    /**
     * 监听兄弟节点或者父节点触发的事件
     * @param source 兄弟节点或者父节点的标识
     * @param handler 回调函数
     */
    observeEvent?: (source: string, handler: OnEventType) => EventCleanup;
};

declare type ResolveFunction = (name: string) => any;

export declare function resolveXuiComponent(type: string, json: any): any;

export declare function responseOk(data: any): ApiResponse;

export declare type SchemaCollectionType = SchemaType | Array<SchemaType>;

export declare type SchemaProcessorType = {
    componentType: Component;
    editorComponentType: Component;
    transformSchemaIn?(schema: any): any;
    transformSchemaOut?(schema: any): any;
};

export declare type SchemaType = {
    type: string;
    [propName: string]: any;
};

declare function setDebug(b: boolean): void;

export declare type Settings = {
    apiUrl: string;
};

declare function SiteMapApi__getSiteMap(): Promise<any>;

export declare function splitPrefixUrl(url: string): string[] | undefined;

export declare type ToastConf = {
    position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-center' | 'bottom-left' | 'bottom-right' | 'center';
    closeButton: boolean;
    showIcon?: boolean;
    timeout?: number;
    errorTimeout?: number;
    className?: string;
    items?: Array<any>;
    useMobileUI?: boolean;
};

export declare type ToastLevel = 'info' | 'success' | 'error' | 'warning';

declare function toggleDebug(): void;

export declare function transformPageJson(pageUrl: string, json: any): Promise<any>;

export declare type TreeBean = {
    $type: string;
    $body?: any;
    [name: string]: any;
};

/**
 * 从后台的TreeBean转换为前台Condition
 * @param node
 */
export declare function treeToCondition(node: any): {
    condjunction: any;
    children: any;
    op?: undefined;
    left?: undefined;
    right?: undefined;
} | {
    op: any;
    left: {
        type: string;
        field: any;
    };
    right: any;
    condjunction?: undefined;
    children?: undefined;
};

export declare function unregisterXuiComponent(type: string): void;

export declare function useAdapter(): {
    globalVersion: string;
    configUpgrade(configName: string, version: number, prevVersion: number, config: any): any;
    /**
     * 返回当前的locale
     */
    useLocale(): string;
    useI18n(): I18nOperation;
    usePinia(): Pinia;
    /**
     * 返回指定的Store
     */
    useStore(name: string): Store;
    useRouter(): Router;
    useSettings(): Settings;
    /**
     * 返回当前的认证token
     */
    useAuthToken(): string;
    setAuthToken(token?: string | undefined): void;
    isUserInRole(role: string): boolean;
    useTenantId(): string;
    useAppId(): string;
    /**
     * 自动退出时执行的回调
     */
    logout(reason: string): void;
    /**
     * 根据组件名加载Vue组件
     */
    resolveVueComponent(name: string): any;
    processRequest(request: any): any;
    processResponse(response: any): any;
    compileFunction(code: string, page: any): Function;
    jumpTo(to: string, action?: any, ctx?: object | undefined): void;
    isCurrentUrl: typeof default_isCurrentUrl;
    updateLocation: typeof default_updateLocation;
    notify(type: ToastLevel, msg: any, conf?: ToastConf | undefined): void;
    alert(msg: string, title?: string | undefined): Promise<void>;
    confirm(msg: string, title?: string | undefined): Promise<boolean>;
    dataMapping(to: any, from?: PlainObject, ignoreFunction?: boolean | ((key: string, value: any) => boolean), convertKeyToPath?: boolean | undefined, ignoreIfNotMatch?: boolean): any;
    fetchDict(dictName: string, options: FetcherRequest): Promise<FetcherResult>;
    fetchPageAndTransform(pageName: string, options: FetcherRequest): Promise<FetcherResult>;
    getPage(pageUrl: string): Promise<any>;
};

/**
 * 是否进入开发调试状态。调试状态下显示在线编辑器按钮，并设置amisDebug=1，启用AMIS内置的调试器。
 * 根据后台返回的SiteMap.supportDebug属性进行初始化
 */
export declare function useDebug(): {
    debug: Ref<boolean>;
    supportDebug: Ref<boolean>;
    toggleDebug: typeof toggleDebug;
    setDebug: typeof setDebug;
};

export declare function usePage(): PageObject | undefined;

export declare const UserApis: {
    SiteMapApi__getSiteMap: typeof SiteMapApi__getSiteMap;
    LoginApi__login: typeof LoginApi__login;
    LoginApi__getLoginUserInfo: typeof LoginApi__getLoginUserInfo;
    LoginApi__logout: typeof LoginApi__logout;
    LoginApi__generateVerifyCode: typeof LoginApi__generateVerifyCode;
};

export declare function useScoped(): any;

export declare function useScopedStore(): any;

export declare type ValueHolder<T> = {
    getRaw(): T | undefined;
    get(): T | undefined;
    set(value: T): void;
};

export declare type VDomType = any;

export declare function withDictCache(dictName: string, fn: () => Promise<any>): Promise<any>;

export declare function withPageCache(path: string, fn: () => Promise<any>): Promise<any>;

export declare type XuiComponent = (json: any) => any | Promise<any>;

/**
 * 如果返回undefined，表示该节点需要被删除
 */
export declare type XuiDirectiveProcessor = (type: string, // 类型信息
json: any, // 节点数据
processProps: (json: any) => any) => any;

export declare type XuiValueProcessor = (value: string, key: any, o: any) => any;

export { }
