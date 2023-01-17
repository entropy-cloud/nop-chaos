export type ApiFunction = Function

const registeredApis: Record<string, ApiFunction> = {}

export function registerApi(name: string, fn: ApiFunction) {
    if (registeredApis[name])
        console.error("replace-api:name=" + name)

    registeredApis[name] = fn
}

export function getApi(name: string): ApiFunction {
    return registeredApis[name]
}