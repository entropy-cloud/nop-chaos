type SetStateInternal<T> = {
  _(
    partial:
      | T
      | Partial<T>
      | {
          _(state: T): T | Partial<T>;
        }['_'],
    replace?: boolean | undefined
  ): void;
}['_'];

/**
 * 与zustand的接口保持一致
 */
export interface StoreApi<T> {
  setState: SetStateInternal<T>;
  getState: () => T;
  getInitialState: () => T;

  subscribe: (listener: (state: T, prevState: T) => void) => () => void;
  /**
   * @deprecated Use `unsubscribe` returned by `subscribe`
   */
  destroy: () => void;
}
