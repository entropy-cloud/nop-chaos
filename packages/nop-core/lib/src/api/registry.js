const registeredApis = {};
export function registerApi(name, fn) {
    if (registeredApis[name])
        console.error("replace-api:name=" + name);
    registeredApis[name] = fn;
}
export function getApi(name) {
    return registeredApis[name];
}
