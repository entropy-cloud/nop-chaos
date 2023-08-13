import { AxiosRequestConfig } from 'axios';
import { FetcherRequest } from "./types";
export type OperationType = "query" | "mutation" | "subscription";
export type OperationDefinition = {
    arguments: ArgumentDefinition[];
};
export type ArgumentDefinition = {
    name: string;
    type: string;
    builder?: (data: any, arg: ArgumentDefinition, options: FetcherRequest) => any;
};
export declare function handleGraphQL(config: AxiosRequestConfig<any>, graphqlUrl: string, options: FetcherRequest): boolean;
export declare function registerOperation(name: string, op: OperationDefinition): void;
