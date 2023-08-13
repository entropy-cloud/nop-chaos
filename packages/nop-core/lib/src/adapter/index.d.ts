import { Store } from "pinia";
import { Router } from "vue-router";
export type Settings = {
    apiUrl: string;
};
export type I18nOperation = {
    t(msg: string): string;
};
export type Toast = {
    container: any;
    success: (content: string, conf?: any) => void;
    error: (content: string, conf?: any) => void;
    info: (content: string, conf?: any) => void;
    warning: (content: string, conf?: any) => void;
};
export type Alert = (content: string, title?: string) => void;
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
    useToast(): Toast;
    useAlert(): Alert;
    processRequest(request: any): any;
    processResponse(response: any): any;
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
    useToast(): Toast;
    useAlert(): Alert;
    processRequest(request: any): any;
    processResponse(response: any): any;
};
