export declare const PageApis: {
    DevTool__clearComponentCache: typeof DevTool__clearComponentCache;
    PageProvider__getPage: typeof PageProvider__getPage;
    PageProvider__getPageSource: typeof PageProvider__getPageSource;
    PageProvider__rollbackPageSource: typeof PageProvider__rollbackPageSource;
    PageProvider__savePageSource: typeof PageProvider__savePageSource;
    DictProvider__getDict: typeof DictProvider__getDict;
};
declare function DevTool__clearComponentCache(): Promise<any>;
declare function PageProvider__getPage(path: string): Promise<any>;
declare function PageProvider__getPageSource(path: string, silent?: boolean): Promise<any>;
declare function PageProvider__rollbackPageSource(path: string, silent?: boolean): Promise<any>;
declare function PageProvider__savePageSource(path: string, data: any, silent?: boolean): Promise<any>;
declare function DictProvider__getDict(dictName: string, silent: boolean): Promise<any>;
export {};
