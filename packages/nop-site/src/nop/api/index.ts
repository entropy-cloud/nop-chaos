import { ajaxRequest, createAsyncCache, currentLocale, useDebug } from '../core'
import 'systemjs/dist/system.js'
import { omit } from 'lodash-es'

const pageCache = createAsyncCache({ max: 50 })

function buildLocaleKey(name: string) {
    return currentLocale.value + '|' + name
}

export function clearLocalCache() {
    pageCache.clear()
    dictCache.clear()
    deleteDynamicModules()
}

export function clearPageCache() {
    pageCache.clear()
}

export function clearDictCache() {
    dictCache.clear()
}


export function clearComponentCache() {
    const { debug } = useDebug()
    if (debug) {
        return ajaxRequest({
            method: 'post',
            url: '@mutation:DevTool__clearComponentCache'
        })
    }
    return Promise.resolve({})
}

export function fetchPage(path: string) {
    if (import.meta.env.VITE_USE_MOCK)
        return ajaxRequest({ method: 'get', url: `/mock${path}`, config: { rawResponse: true } })

    const key = buildLocaleKey(path)
    return pageCache.get(key, () => {
        return ajaxRequest({
            method: 'post',
            url: '@query:PageProvider__getPage',
            data: {
                path
            }
        })
    })
}

export function fetchPageSource(path: string, silent?: boolean) {
    return ajaxRequest({
        method: 'post',
        url: '@query:PageProvider__getPageSource',
        data: {
            path
        },
        silent
    }).then(page=> {
        page.__baseUrl = path
        return page
    })
}

export function deletePageCache(path: string) {
    const key = buildLocaleKey(path)
    pageCache.delete(key)
}

export function rollbackPageSource(path: string, silent?: boolean) {
    return ajaxRequest({
        method: 'post',
        url: '@mutation:PageProvider__rollbackPageSource',
        data: {
            path
        },
        silent
    })
}

export function savePageSource(path: string, data: any, silent?: boolean) {
    const key = buildLocaleKey(path)
    pageCache.delete(key)

    return ajaxRequest({
        method: 'post',
        url: '@mutation:PageProvider__savePageSource',
        data: {
            path,
            data: omit(data,"__baseUrl")
        },
        silent
    })
}

const dictCache = createAsyncCache({ max: 100 })

export function fetchDict(dictName: string, silent: boolean) {
    const key = buildLocaleKey(dictName)

    return dictCache.get(key, () => {
        return ajaxRequest({
            method: 'post',
            url: '@query:DictProvider__getDict/static,options{value,label}',
            data: {
                dictName
            },
            silent
        }).then(res => {
            // 如果不是static的，则下次ajax调用会获取到新的值。
            // 如果一个界面上多个控件用到同一个字典，并发进行ajax调用, 则实际也只会调用后台一次
            if (!res.static) {
                dictCache.delete(key)
            }
            return res
        })
    })

}

const System = (typeof self !== 'undefined' ? self : global).System

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