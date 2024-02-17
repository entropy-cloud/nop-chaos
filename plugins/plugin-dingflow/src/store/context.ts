import { createContext, useContext } from 'react';

import { FlowEditorStoreType } from './types';
import { StoreApi, useStore } from 'zustand';

export const FlowEditorStoreContextType =
  createContext<StoreApi<FlowEditorStoreType> | null>(null);

export function useFlowEditorStore(): StoreApi<FlowEditorStoreType> {
  return useContext(FlowEditorStoreContextType)!;
}

export function useFlowEditorStoreWith<T>(
  selector: (state: FlowEditorStoreType) => T
) {
  const store = useFlowEditorStore();
  return useStore(store, selector);
}
