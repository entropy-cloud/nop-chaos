import LRUCache from "lru-cache";
import { cloneDeep } from "lodash-es";
export function createAsyncCache(options) {
    const cache = new LRUCache(options);
    return {
        get(key, loader) {
            let promise = cache.get(key);
            if (promise) {
                return promise.then(v => v && cloneDeep(v));
            }
            promise = loader(key);
            cache.set(key, promise);
            return promise.then(v => v && cloneDeep(v)).catch(e => {
                cache.delete(key);
                throw e;
            });
        },
        delete(key) {
            cache.delete(key);
        },
        clear() {
            cache.clear();
        }
    };
}
