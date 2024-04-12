import { mergeAlias } from 'vite'

function isObject(value: any) {
    return Object.prototype.toString.call(value) === '[object Object]';
}

function arraify(target: any) {
    return Array.isArray(target) ? target : [target];
}

function mergeConfigRecursively(defaults: Record<string, any>, overrides: Record<string, any>, rootPath?: string) {
    const merged = { ...defaults };
    for (const key in overrides) {
        if(key.startsWith("!")){
            merged[key.substring(1)] = overrides[key]
            continue;
        }

        const value = overrides[key];
        if (value == null) {
            continue;
        }
        const existing = merged[key];
        if (existing == null) {
            merged[key] = value;
            continue;
        }
        // fields that require special handling
        if (key === 'alias' && (rootPath === 'resolve' || rootPath === '')) {
            merged[key] = mergeAlias(existing, value);
            continue;
        }
        else if (key === 'assetsInclude' && rootPath === '') {
            merged[key] = [].concat(existing, value);
            continue;
        }
        else if (key === 'noExternal' &&
            rootPath === 'ssr' &&
            (existing === true || value === true)) {
            merged[key] = true;
            continue;
        }
        if (Array.isArray(existing) || Array.isArray(value)) {
            merged[key] = [...arraify(existing ?? []), ...arraify(value ?? [])];
            continue;
        }
        if (isObject(existing) && isObject(value)) {
            merged[key] = mergeConfigRecursively(existing, value, rootPath ? `${rootPath}.${key}` : key);
            continue;
        }
        merged[key] = value;
    }
    return merged;
}

export function mergeConfigEx(defaults: Record<string, any>, overrides: Record<string, any>, isRoot:boolean = true) {
    if (typeof defaults === 'function' || typeof overrides === 'function') {
        throw new Error(`Cannot merge config in form of callback`);
    }
    const config = mergeConfigRecursively(defaults, overrides, isRoot ? '' : '.');
   // console.log("merged-vite-config:", JSON.stringify(config,null,"  "))
    return config
}