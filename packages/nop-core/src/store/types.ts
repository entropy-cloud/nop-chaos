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

export type StdStoreInitOptions = {
  initState?: { [name: string]: any };

  stateCreator?: (get:any,set:any) => any

  /**
   * 封装从父store或者外部环境获取变量值，同步获取
   */
  getDefaultValue?(name: string): any;

  loadData?(): Promise<any>;

  /**
   * 指定state中的哪些key对应的值需要保存到远程。如果指定为&&，则保存整个state
   */
  saveKeys?: string[];

  saveData?(data: any): Promise<any>;
};

export type StdStoreState = {
  [name: string]: any;

  getValue(name: string): any;
  setValue(name: string, value: any): void;

  /**
   * 将状态变量重置回初始化的值
   */
  reset(): void;

  /**
   * 异步加载数据到store中，每次调用都会重新加载数据
   */
  triggerLoad(): Promise<void>;

  /**
   * 将store中的数据保存到远程
   */
  triggerSave(): Promise<void>;
};

export type StdStoreApi = StoreApi<StdStoreState>

export type StdStoreCreator = (
  get: () => any,
  set: (name: string, value: any) => void
) => StdStoreState;
