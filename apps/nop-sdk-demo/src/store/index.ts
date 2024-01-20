import { createPinia } from 'pinia';
const pinia = createPinia();

import {useAppStore} from './app'

export function usePinia(){
    return pinia
}

export function useStore(name:string){
    if(name == 'app')
        return useAppStore(pinia)
    throw new Error("invalid-store:"+name)
}