import { Pinia, Store } from "pinia";
import { Router } from "vue-router";
import { FetcherResult, FetcherRequest } from "../core/types";

import { default_jumpTo,default_isCurrentUrl,default_updateLocation } from "./link";

export * from "./link"

export type Settings = {
    apiUrl: string
}

export type I18nOperation = {
    t(msg: string): string
}

export type ToastLevel = 'info' | 'success' | 'error' | 'warning';
export type ToastConf = {
    position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-center' | 'bottom-left' | 'bottom-right' | 'center';
    closeButton: boolean;
    showIcon?: boolean;
    timeout?: number;
    errorTimeout?: number;
    className?: string;
    items?: Array<any>;
    useMobileUI?: boolean;
};

interface PlainObject {
    [propsName: string]: any;
}

/**
 * nop-chaos对外部框架的依赖都集中在adapter对象中
 */
const adapter = {
    globalVersion: 'v3' as string,

    // 如果存放在localStorage中的数据需要升级，这里的版本号需要增加。
    // 从localStorage中读取缓存数据时会检查版本号，如果版本不一致，会调用configUpgrade函数来升级，缺省会丢弃原有配置
    configUpgrade(configName: string, version: number, prevVersion: number, config: any): any {
        return undefined
    },

    /**
     * 返回当前的locale
     */
    useLocale(): string {
        throw new Error("not-impl")
    },

    useI18n(): I18nOperation {
        throw new Error("not-impl")
    },

    usePinia():Pinia{
        throw new Error("not-impl")
    },

    /**
     * 返回指定的Store
     */
    useStore(name:string): Store{
        throw new Error("not-impl")
    },

    useRouter(): Router {
        throw new Error("not-impl")
    },

    useSettings(): Settings {
        return {
            apiUrl: ''
        }
    },

    /**
     * 返回当前的认证token
     */
    useAuthToken(): string {
        throw new Error("not-impl")
    },

    setAuthToken(token?: string) {

    },

    isUserInRole(role: string): boolean {
        throw new Error("not-impl")
    },

    useTenantId(): string {
        throw new Error("not-impl")
    },

    useAppId(): string {
        return "nop-chaos"
    },

    /**
     * 自动退出时执行的回调
     */
    logout(reason: string): void {
        throw new Error("not-impl")
    },

    /**
     * 根据组件名加载Vue组件
     */
    resolveVueComponent(name: string): any {
        throw new Error("not-impl")
    },

    processRequest(request: any) {
        return request
    },

    processResponse(response: any) {
        return response
    },

    compileFunction(code: string,page:any): Function {
        return new Function("page", "return " + code).call(null,page)
    },
    
    jumpTo(to: string, action?: any, ctx?: object){
        const router = adapter.useRouter()
        return default_jumpTo(router,to)
    },

    isCurrentUrl: default_isCurrentUrl,

    updateLocation: default_updateLocation,

    notify(type: ToastLevel, msg: any, conf?: ToastConf):void{
        throw new Error("not-impl")
    },

    alert(msg: string, title?: string):Promise<void>{
        throw new Error("not-impl")
    },

    confirm(msg: string, title?: string): Promise<boolean>{
        throw new Error("not-impl")
    },

    dataMapping(
        to: any,
        from: PlainObject = {},
        ignoreFunction: boolean | ((key: string, value: any) => boolean) = false,
        convertKeyToPath?: boolean,
        ignoreIfNotMatch = false
      ):any{
        throw new Error("not-impl")
    },

    fetchDict(dictName:string, options:FetcherRequest): Promise<FetcherResult>{
        throw new Error("not-impl")
    },

    fetchPageAndTransform(pageName:string, options:FetcherRequest): Promise<FetcherResult>{
        throw new Error("not-impl")
    },

    getPage(pageUrl:string): Promise<any>{
        throw new Error("not-impl")
    }
}

export function registerAdapter(data: Partial<typeof adapter>) {
    Object.assign(adapter, data)
}

export function useAdapter() {
    return adapter;
}

export type AdapterType = typeof adapter