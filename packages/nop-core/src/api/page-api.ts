import { ajaxRequest, useDebug } from '../core'

import { omit } from 'lodash-es'
import { deletePageCache, withDictCache, withPageCache } from './cache'


export const PageApis = {
    DevTool__clearComponentCache,
    PageProvider__getPage,
    PageProvider__getPageSource,
    PageProvider__rollbackPageSource,
    PageProvider__savePageSource,
    DictProvider__getDict
}

function DevTool__clearComponentCache() {
    const { debug } = useDebug()
    if (debug) {
        return ajaxRequest({
            method: 'post',
            url: '@mutation:DevTool__clearComponentCache'
        })
    }
    return Promise.resolve({})
}

function PageProvider__getPage(path: string) {
    if (import.meta.env.VITE_USE_MOCK)
        return ajaxRequest({ method: 'get', url: `/mock${path}`, config: { rawResponse: true } })

    if(path.startsWith("/p/"))
        return withPageCache(path,()=>{
            return ajaxRequest({
                method: "get",
                url: path
            })
    })    
    return withPageCache(path, () => {
        return ajaxRequest({
            method: 'post',
            url: '@query:PageProvider__getPage',
            data: {
                path
            }
        })
    })
}

function PageProvider__getPageSource(path: string, silent?: boolean) {
    return ajaxRequest({
        method: 'post',
        url: '@query:PageProvider__getPageSource',
        data: {
            path
        },
        silent
    }).then(page => {
        page.__baseUrl = path
        return page
    })
}

function PageProvider__rollbackPageSource(path: string, silent?: boolean) {
    return ajaxRequest({
        method: 'post',
        url: '@mutation:PageProvider__rollbackPageSource',
        data: {
            path
        },
        silent
    })
}

function PageProvider__savePageSource(path: string, data: any, silent?: boolean) {
    deletePageCache(path)

    return ajaxRequest({
        method: 'post',
        url: '@mutation:PageProvider__savePageSource',
        data: {
            path,
            data: omit(data, "__baseUrl")
        },
        silent
    })
}


function DictProvider__getDict(dictName: string, silent: boolean) {
    return withDictCache(dictName, () => {
        return ajaxRequest({
            method: 'post',
            url: '@query:DictProvider__getDict/static,options{value,label}',
            data: {
                dictName
            },
            silent
        })
    })
}
