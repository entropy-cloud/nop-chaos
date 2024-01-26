export type Store = {

}

export type RouteLocationRaw = string | {
    /**
     * Replace the entry in the history instead of pushing a new entry
     */
    replace?: boolean;

    /**
     * Triggers the navigation even if the location is the same as the current one.
     * Note this will also add a new entry to the history unless `replace: true`
     * is passed.
     */
    force?: boolean;

    name?: string,
    path?: string,
    params?: Record<string, any>
}

export type Router = {
    /**
     * Programmatically navigate to a new URL by pushing an entry in the history
     * stack.
     *
     * @param to - Route location to navigate to
     */
    push(to: RouteLocationRaw): Promise<Error | void | undefined>;

    /**
     * Programmatically navigate to a new URL by replacing the current entry in
     * the history stack.
     *
     * @param to - Route location to navigate to
     */
    replace(to: RouteLocationRaw): Promise<Error | void | undefined>;

    /**
     * Go back in history if possible by calling `history.back()`. Equivalent to
     * `router.go(-1)`.
     */
    back(): ReturnType<Router['go']>;
    /**
     * Go forward in history if possible by calling `history.forward()`.
     * Equivalent to `router.go(1)`.
     */
    forward(): ReturnType<Router['go']>;
    /**
     * Allows you to move forward or backward through the history. Calls
     * `history.go()`.
     *
     * @param delta - The position in the history to which you want to move,
     * relative to the current page
     */
    go(delta: number): void;
}