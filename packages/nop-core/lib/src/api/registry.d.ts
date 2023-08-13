export type ApiFunction = Function;
export declare function registerApi(name: string, fn: ApiFunction): void;
export declare function getApi(name: string): ApiFunction;
