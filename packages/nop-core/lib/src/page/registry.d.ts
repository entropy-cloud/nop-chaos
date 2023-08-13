export type XuiComponent = (json: any) => any | Promise<any>;
export declare function registerXuiComponent(type: string, component: XuiComponent): void;
export declare function unregisterXuiComponent(type: string): void;
export declare function resolveXuiComponent(type: string, json: any): any;
