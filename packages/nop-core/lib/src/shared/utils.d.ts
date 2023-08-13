export declare function absolutePath(path: string, basePath: string): string;
type ResolveFunction = (name: string) => any;
export declare function format(msg: string, placeholderStart: string, placeholdeEnd: string, resolver: ResolveFunction): string;
/**
 * 从后台的TreeBean转换为前台Condition
 * @param node
 */
export declare function treeToCondition(node: any): {
    condjunction: any;
    children: any;
    op?: undefined;
    left?: undefined;
    right?: undefined;
} | {
    op: any;
    left: {
        type: string;
        field: any;
    };
    right: any;
    condjunction?: undefined;
    children?: undefined;
};
export declare function conditionToTree(cond: any): {
    $type: any;
    $body: any;
    name?: undefined;
    value?: undefined;
} | {
    $type: any;
    name: any;
    value: any;
    $body?: undefined;
};
export type ValueHolder<T> = {
    getRaw(): T | undefined;
    get(): T | undefined;
    set(value: T): void;
};
export declare function refHolder<T>(): ValueHolder<T>;
export {};
