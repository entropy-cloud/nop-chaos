/**
 * nop-chaos对外部框架的依赖都集中在adapter对象中
 */
export const adapter = {
    globalVersion: 'v3',
    // 如果存放在localStorage中的数据需要升级，这里的版本号需要增加。
    // 从localStorage中读取缓存数据时会检查版本号，如果版本不一致，会调用configUpgrade函数来升级，缺省会丢弃原有配置
    configUpgrade(configName, version, prevVersion, config) {
        return undefined;
    },
    /**
     * 返回当前的locale
     */
    useLocale() {
        throw new Error("not-impl");
    },
    useI18n() {
        throw new Error("not-impl");
    },
    /**
     * 返回当前的全局store
     */
    useStore() {
        throw new Error("not-impl");
    },
    useRouter() {
        throw new Error("not-impl");
    },
    useSettings() {
        return {
            apiUrl: ''
        };
    },
    /**
     * 返回当前的认证token
     */
    useAuthToken() {
        throw new Error("not-impl");
    },
    setAuthToken(token) {
    },
    isUserInRole(role) {
        throw new Error("not-impl");
    },
    useTenantId() {
        throw new Error("not-impl");
    },
    useAppId() {
        return "nop-chaos";
    },
    /**
     * 自动退出时执行的回调
     */
    logout(reason) {
        throw new Error("not-impl");
    },
    /**
     * 根据组件名加载Vue组件
     */
    resolveVueComponent(name) {
        throw new Error("not-impl");
    },
    useToast() {
        throw new Error("not-impl");
    },
    useAlert() {
        throw new Error("not-impl");
    },
    processRequest(request) {
        return request;
    },
    processResponse(response) {
        return response;
    }
};
export function registerAdapter(data) {
    Object.assign(adapter, data);
}
export function useAdapter() {
    return adapter;
}
