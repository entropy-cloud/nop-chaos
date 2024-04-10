import {
  ReactNode,
  createContext,
  useContext,
  createElement,
  useState
} from 'react';

import { useStore, create } from 'zustand';

import {
  StdStoreInitOptions,
  buildStdStoreCreator,
  StdStoreApi,
  StdStoreState,
  importModule
} from '@nop-chaos/nop-core';

export function createReactStdStore(options: StdStoreInitOptions) {
  return create<StdStoreState>(buildStdStoreCreator(options));
}

const rootStore = create<StdStoreState>((set, get) => {
  return {
    getValue(name: string) {
      return get()[name];
    },
    setValue(name: string, value: any) {
      set({ [name]: value });
    },

    reset() {
      set({});
    },

    triggerLoad() {
      return Promise.resolve();
    },
    triggerSave() {
      return Promise.resolve();
    }
  };
});

export const ReactStoreApiKey = createContext<StdStoreApi>(rootStore);

export function useReactStoreVar(name: string): any | undefined {
  const store = useContext(ReactStoreApiKey);
  return useStore(store, state => {
    const getValue = state.getValue;
    return getValue ? getValue(name) : state[name];
  });
}

export function useReactStore(
  store: StdStoreApi,
  fn: (state: StdStoreState) => any
) {
  return useStore(store, fn);
}

type ReactStoreComponentProps = {
  store: StdStoreApi;
  children?: ReactNode;
};

export function ReactStoreScopeComponent(props: ReactStoreComponentProps) {
  return createElement(
    ReactStoreApiKey.Provider,
    {
      value: props.store
    },
    [props.children]
  );
}

export type ReactDynamicStoreScopeComponentProps = {
  storeLib: string;
  initState?: { [name: string]: any };
  inheritParentStore?: boolean;
  saveKeys?: string[];
  children?: ReactNode;
};

export function ReactDynamicStoreScopeComponent(
  props: ReactDynamicStoreScopeComponentProps
) {
  const { storeLib, initState, inheritParentStore, saveKeys, children } = props;

  const parentGetValue = useReactStoreVar('getValue');

  const [store, setStore] = useState<StdStoreApi>();

  importModule(storeLib).then((mod: any) => {
    setStore(
      createReactStdStore({
        initState,
        getDefaultValue: inheritParentStore ? parentGetValue : undefined,
        saveKeys,
        stateCreator: mod.stateCreator
      })
    );
  });

  if (store) {
    return createElement(
      ReactStoreScopeComponent,
      {
        store: store
      },
      children
    );
  } else {
    return children;
  }
}
