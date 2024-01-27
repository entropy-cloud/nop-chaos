export type ValueHolder<T> = {
    getRaw(): T | undefined;
    get(): T | undefined;
    set(value: T): void;
};
export declare function refHolder<T>(): ValueHolder<T>;
