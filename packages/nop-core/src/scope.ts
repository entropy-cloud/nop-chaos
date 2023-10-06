import { PageObject } from "./page";

let s_page: PageObject

export function usePage(){
    return s_page
}

export function providePage(page: PageObject){
    s_page = page
}


let s_scoped: any

export function useScoped(){
    return s_scoped
}

export function provideScoped(scoped: any){
    s_scoped = scoped
}

let s_scopedStore: any

export function useScopedStore(){
    return s_scopedStore
}

export function provideScopedStore(store:any){
    s_scopedStore = store
}