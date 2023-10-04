import { Store } from "pinia";
import { Router } from "vue-router";
import { default_isCurrentUrl, default_updateLocation } from "./link";
export * from "./link";
export type Settings = {
    apiUrl: string;
};
export type I18nOperation = {
    t(msg: string): string;
};
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
/**
 * nop-chaos对外部框架的依赖都集中在adapter对象中
 */
export declare const adapter: {
    globalVersion: string;
    configUpgrade(configName: string, version: number, prevVersion: number, config: any): any;
    /**
     * 返回当前的locale
     */
    useLocale(): string;
    useI18n(): I18nOperation;
    /**
     * 返回当前的全局store
     */
    useStore(): Store;
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
    notify(type: ToastLevel, msg: any, conf?: ToastConf): never;
    alert(msg: string, title?: string): never;
    confirm(msg: string, title?: string): Promise<boolean>;
};
export declare function registerAdapter(data: Partial<typeof adapter>): void;
export declare function useAdapter(): {
    globalVersion: string;
    configUpgrade(configName: string, version: number, prevVersion: number, config: any): any;
    /**
     * 返回当前的locale
     */
    useLocale(): string;
    useI18n(): I18nOperation;
    /**
     * 返回当前的全局store
     */
    useStore(): Store<string, {}, {}, {}>;
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
    notify(type: ToastLevel, msg: any, conf?: ToastConf | undefined): never;
    alert(msg: string, title?: string | undefined): never;
    confirm(msg: string, title?: string | undefined): Promise<boolean>;
};
export type AdapterType = typeof adapter;
