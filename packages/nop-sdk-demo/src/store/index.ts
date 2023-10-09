import { createPinia } from 'pinia';
const store = createPinia();


export function useStore(){
    return store
}