import 'systemjs/dist/system.js';
const System = (typeof self !== 'undefined' ? self : global).System;
/**
 * 动态加载js文件
 * @param path js文件路径
 * @returns
 */
export function importModule(path) {
    if (path.endsWith(".lib.js") && path.startsWith("/") && !path.startsWith("/p/")) {
        path = "/p/SystemJsProvider__getJs" + path;
    }
    let url = System.resolve(path);
    return System.import(/*@vite-ignore*/ url);
}
export function deleteDynamicModules() {
    for (let module of System.entries()) {
        const moduleId = module[0];
        if (moduleId.endsWith(".lib.js"))
            System.delete(moduleId);
    }
}
export function registerModule(name, lib) {
    let libPath = name;
    if (name.startsWith("./")) {
        libPath = System.resolve(name);
    }
    System.set(libPath, lib);
}
export function addSystemImportMap(imports) {
    System.addImportMap({
        imports
    });
}
