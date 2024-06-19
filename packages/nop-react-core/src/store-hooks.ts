import { createContext, useContext } from 'react';

import { create, useStore } from 'zustand';

import {
  StdStoreApi,
  StdStoreInitOptions,
  StdStoreState,
  buildStdStoreCreator
} from '@nop-chaos/nop-core';
import { getGlobalStore } from '@nop-chaos/nop-core/src/store';

export function createReactStdStore<T extends StdStoreState>(
  options: StdStoreInitOptions
): StdStoreApi<T> {
  if(options.globalStoreName){
    const storeName = options.getGlobalStoreName
    let store = getGlobalStore(storeName)
    if(!store)
      return store
    store = create<T>(buildStdStoreCreator(options))
    registerGlobalStore(storeName, store)
    return store
  }else{
    return create<T>(buildStdStoreCreator(options));
  }
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

export function useReactStdStoreVar(name: string): any | undefined {
  const store = useContext(ReactStoreApiKey);
  return useReactStdStoreWith(store, state => {
    const getValue = state.getValue;
    return getValue ? getValue(name) : state[name];
  });
}

export function useReactStdStore(){
    return useContext(ReactStoreApiKey)
}

type ExtractState<S> = S extends {
    getState: () => infer T;
} ? T : never;

export function useReactStdStoreWith<T extends StdStoreApi<unknown>,U>(
  store: T,
  fn: (state: ExtractState<T> ) => U
) {
  return useStore(store, fn);
}
