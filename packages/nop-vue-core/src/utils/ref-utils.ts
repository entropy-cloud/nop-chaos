

import { shallowRef, toRaw } from 'vue'

export type ValueHolder<T> = {
    getRaw(): T| undefined,
    get(): T | undefined,
    set(value: T):void
}

export function refHolder<T>(): ValueHolder<T> {
    const value = shallowRef<T>();
    return {
        getRaw(){
            return toRaw(value).value
        },
        get() {
            return value.value
        },
        set(t: T) {
            value.value = t
        }
    }
}