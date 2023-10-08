import { createAsyncCache } from '../shared'
import { deleteDynamicModules } from '../core'
import { useAdapter } from '../adapter'


const pageCache = createAsyncCache({ max: 50 })

const dictCache = createAsyncCache({ max: 100 })


function buildLocaleKey(name: string) {
    const { useLocale } = useAdapter()
    return useLocale() + '|' + name
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

export function deletePageCache(path: string) {
    const key = buildLocaleKey(path)
    pageCache.delete(key)
}

export function withPageCache(path: string, fn: () => Promise<any>): Promise<any> {
    const key = buildLocaleKey(path)
    return pageCache.get(key, fn)
}

export function withDictCache(dictName: string, fn: () => Promise<any>): Promise<any> {
    const key = buildLocaleKey(dictName)

    return dictCache.get(key, () => {
        return fn().then(res => {
            // 如果不是static的，则下次ajax调用会获取到新的值。
            // 如果一个界面上多个控件用到同一个字典，并发进行ajax调用, 则实际也只会调用后台一次
            if (!res.static) {
                dictCache.delete(key)
            }
            return res
        })
    })
}