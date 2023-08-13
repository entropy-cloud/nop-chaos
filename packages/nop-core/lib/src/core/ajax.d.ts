import { AjaxResponse, FetcherRequest, FetcherResult } from "./types";
export declare const ajax: import("axios").AxiosInstance;
export declare const isCancel: (value: any) => boolean;
export declare function createCancelToken(cancelExecutor: any): import("axios").CancelToken;
export declare function fetcherOk(data: any): FetcherResult;
export declare function responseOk(data: any): AjaxResponse;
export declare function ajaxRequest(options: FetcherRequest): Promise<any>;
/**
 * 提供的对外接口符合amis框架的要求
 */
export declare function ajaxFetch(options: FetcherRequest): Promise<FetcherResult>;
