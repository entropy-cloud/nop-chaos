import { StoreApi, createStore } from 'zustand';

export type MapStoreType = StoreApi<{
  value: Record<string, any>;
  setValue(value: Record<string, any>): void;
}>;

export function createMapStore(value?: Record<string, any>): MapStoreType {
  return createStore(set => {
    return {
      value: value || {},
      setValue(value: Record<string, any>) {
        set(value);
      }
    };
  });
}