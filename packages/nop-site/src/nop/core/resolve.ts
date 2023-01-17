import { camelize, capitalize } from "vue";

let g_resolver: (name: string) => any;

export function resolveVueComponent(name: string) {
    let comp =  g_resolver(name)
    if(!comp){
        comp = g_resolver(capitalize(camelize(name)))
    }
    return comp
}

export function registerVueComponentResolver(resolver: (name: string) => any) {
    g_resolver = resolver;
}