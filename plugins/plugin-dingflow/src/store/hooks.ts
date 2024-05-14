import { useContext } from 'react';

import { FlowEditorStoreType } from './types';
import { StoreApi, useStore } from 'zustand';

import { ReactStoreApiKey } from '@nop-chaos/sdk';

export function useFlowEditorStore(): StoreApi<FlowEditorStoreType> {
  return useContext(ReactStoreApiKey)!  as unknown as StoreApi<FlowEditorStoreType>;
}

export function useFlowEditorStoreWith<T>(
  selector: (state: FlowEditorStoreType) => T
) {
  const store = useFlowEditorStore();
  return useStore(store, selector);
}

export function useError(nodeId: string) {
  return useFlowEditorStoreWith(state => state?.errors?.[nodeId]);
}

export function useStartNode() {
  return useFlowEditorStoreWith(state => state.flowData.startNode)
}

export function useNodeSchema(nodeType: string){
  return useFlowEditorStoreWith(state => state.flowEditorSchema)
}
