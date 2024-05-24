import { FlowEditorStoreType } from './types';

import { StdStoreApi, useReactStdStore, useReactStdStoreWith } from '@nop-chaos/sdk';

export function useFlowEditorStore(): StdStoreApi<FlowEditorStoreType> {
  return useReactStdStore()  as unknown as StdStoreApi<FlowEditorStoreType>;
}

export function useFlowEditorStoreWith<T>(
  selector: (state: FlowEditorStoreType) => T
) {
  const store = useFlowEditorStore();
  return useReactStdStoreWith(store, selector);
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
