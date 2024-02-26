import { StoreApiKey } from '@nop-chaos/nop-react-core';

import { useState, useEffect, ReactNode } from 'react';

import { createFlowEditorStore } from '../store';
import { useRenderContext } from '@nop-chaos/nop-react-core';
import { useStore } from 'zustand';

import { FlowEditorSchema, FlowSchema } from '../store/types';
export type FlowEditorProps = {
  flowEditorSchema: FlowEditorSchema;
  flowSchema: FlowSchema,

  value: any;
  onChange: (value: any) => void;
  data: any;

  children?: ReactNode;
};

export const FlowEditorScope = (props: FlowEditorProps) => {
  const {
    children,
    flowEditorSchema,
    flowSchema,
    value
  } = props;

  const {saveApi, initApi} = flowEditorSchema
  const data = props.data;

  const renderContext = useRenderContext()!;

  const [store] = useState(() => {
    const store = createFlowEditorStore(flowEditorSchema, value, flowSchema);
    if (initApi) {
      store.getState().setFlowDataLoader(() => {
        return Promise.resolve(
          renderContext.executor(initApi, data, { props, store })
        );
      });
    }

    if (saveApi) {
      store.getState().setFlowDataSaver(flowData => {
        return Promise.resolve(
          renderContext.executor(saveApi, { data: flowData }, { props, store })
        );
      });
    }
    return store;
  });

  const loadFlowData = useStore(store, state => state.loadFlowData);

  // 只有初始化时执行一次
  useEffect(() => {
    loadFlowData();
  }, []);

  return <StoreApiKey.Provider value={store}>{children}</StoreApiKey.Provider>;
};
