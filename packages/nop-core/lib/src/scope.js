let s_page;
export function usePage() {
    return s_page;
}
export function providePage(page) {
    s_page = page;
}
let s_scoped;
export function useScoped() {
    return s_scoped;
}
export function provideScoped(scoped) {
    s_scoped = scoped;
}
let s_scopedStore;
export function useScopedStore() {
    return s_scopedStore;
}
export function provideScopedStore(store) {
    s_scopedStore = store;
}
export function clearScoped() {
    s_page = undefined;
    s_scoped = undefined;
    s_scopedStore = undefined;
}
