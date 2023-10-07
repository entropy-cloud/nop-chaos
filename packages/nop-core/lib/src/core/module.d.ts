import 'systemjs/dist/system.js';
/**
 * 动态加载js文件
 * @param path js文件路径
 * @returns
 */
export declare function importModule(path: string): any;
export declare function deleteDynamicModules(): void;
export declare function registerModule(name: string, lib: any): void;
export declare function addSystemImportMap(imports: Record<string, string>): void;
