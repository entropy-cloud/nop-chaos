declare function toggleDebug(): void;
declare function setDebug(b: boolean): void;
/**
 * 是否进入开发调试状态。调试状态下显示在线编辑器按钮，并设置amisDebug=1，启用AMIS内置的调试器。
 * 根据后台返回的SiteMap.supportDebug属性进行初始化
 */
export declare function useDebug(): {
    debug: import("vue").Ref<boolean>;
    supportDebug: import("vue").Ref<boolean>;
    toggleDebug: typeof toggleDebug;
    setDebug: typeof setDebug;
};
export {};
