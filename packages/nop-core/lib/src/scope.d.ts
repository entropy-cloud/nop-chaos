import { PageObject } from "./page";
export declare function usePage(): PageObject | undefined;
export declare function providePage(page: PageObject): void;
export declare function useScoped(): any;
export declare function provideScoped(scoped: any): void;
export declare function useScopedStore(): any;
export declare function provideScopedStore(store: any): void;
export declare function clearScoped(): void;
