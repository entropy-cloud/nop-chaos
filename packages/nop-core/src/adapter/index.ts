import { Store } from "pinia";
import { Router } from "vue-router";

export type Settings = {
    apiUrl: string
}

export type I18nOperation = {
    t(msg: string): string
}

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
export const adapter = {
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

    /**
     * 返回当前的全局store
     */
    useStore(): Store {
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

    useToast(): Toast {
        throw new Error("not-impl")
    },

    useAlert(): Alert {
        throw new Error("not-impl")
    },

    processRequest(request: any) {
        return request
    },

    processResponse(response: any) {
        return response
    },

    compileFunction(code: string): Function {
        return new Function("return " + code).call(null)
    }
}

export function registerAdapter(data: Partial<typeof adapter>) {
    Object.assign(adapter, data)
}

export function useAdapter() {
    return adapter;
}