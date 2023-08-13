export declare function clearLocalCache(): void;
export declare function clearPageCache(): void;
export declare function clearDictCache(): void;
export declare function deletePageCache(path: string): void;
export declare function withPageCache(path: string, fn: () => Promise<any>): Promise<any>;
export declare function withDictCache(dictName: string, fn: () => Promise<any>): Promise<any>;
