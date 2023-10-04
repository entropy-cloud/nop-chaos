import { Router } from "vue-router";
export declare function default_jumpTo(router: Router, to: string): void;
export declare function openWindow(url: string, opt?: {
    target?: string;
    noopener?: boolean;
    noreferrer?: boolean;
}): void;
export declare function isPageUrl(url: string): boolean;
export declare function default_updateLocation(to: any, replace: boolean): void;
export declare function default_isCurrentUrl(to: string, ctx?: any): true | import("path-to-regexp").Match<object>;
