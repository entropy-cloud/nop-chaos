
import 'systemjs/dist/system.js'

declare var global:any

const System  = (typeof self !== 'undefined' ? self : global).System

/**
 * 动态加载js文件
 * @param path js文件路径
 * @returns 
 */
export function importModule(path: string) {
    if(path.endsWith(".lib.js") && path.startsWith("/") && !path.startsWith("/p/")){
        path = "/p/SystemJsProvider__getJs" + path   
    }
    let url = System.resolve(path)
    return System.import(/*@vite-ignore*/url)
}


export function deleteDynamicModules() {
    for (let module of System.entries()) {
        const moduleId = module[0]
        if (moduleId.endsWith(".lib.js"))
            System.delete(moduleId)
    }
}

export function registerModule(name:string, lib:any){
    let libPath = name
    if(name.startsWith("./")){
        libPath = System.resolve(name)
    }else if(name.startsWith("@nop/")){
        libPath = System.resolve("./nop/" + name.substring("@nop/".length) + ".js")
    }else{
        libPath = System.resolve('./nop/' + name+'.js')
        System.addImportMap({
            imports: {
                [name] : libPath
            }
        })
    }
    System.set(libPath,lib)
}

export function addSystemImportMap(imports: Record<string,string>){
    System.addImportMap({
        imports
    })
}