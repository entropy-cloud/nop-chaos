import type { Options } from 'lru-cache';
export type AsyncCacheLoader<T> = (key: string) => Promise<T>;
export type AsyncCache<T> = {
    get(key: string, loader: AsyncCacheLoader<T>): Promise<T>;
    delete(key: string): void;
    clear(): void;
};
export type AsyncCacheOptions<T> = Options<string, T>;
export declare function createAsyncCache<T>(options: AsyncCacheOptions<any>): AsyncCache<T>;
