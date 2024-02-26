import { createContext, useContext } from 'react';
import { StoreApi, createStore, useStore } from 'zustand';

const rootStore = createStore((set, get) => {
  return {};
});

export const StoreApiKey = createContext<StoreApi<any>>(rootStore);

type ActionType = (args: any) => any;

export function useForStore(
  store: StoreApi<any>,
  name: string,
  local?: boolean
) {
  return useStore(
    store,
    state => findInState(state, name, local) as ActionType
  );
}

export function useAction(
  name: string,
  local?: boolean
): ActionType | undefined {
  const store = useContext(StoreApiKey);
  return useForStore(store, name, local) as ActionType;
}

export function useVar(name: string, local?: boolean): any | undefined {
  const store = useContext(StoreApiKey);
  return useForStore(store, name, local);
}

function findInState(state: any, name: string, local?: boolean): any {
  const v = state[name];
  if (v) return v;

  if (local) return;

  const parent = state.parentStore as StoreApi<any>;
  if (!parent) return;
  return findInState(parent.getState(), name);
}
