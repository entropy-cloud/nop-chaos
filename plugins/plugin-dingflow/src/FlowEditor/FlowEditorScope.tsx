import { StoreApiKey } from '@nop-chaos/sdk';

import { useState, useEffect, ReactNode } from 'react';

import { createFlowEditorStore } from '../store';
import { useRenderContext } from '@nop-chaos/sdk';
import { useStore } from 'zustand';

import { FlowEditorSchema } from '../store/types';
import { ApiObject, SchemaType } from '@nop-chaos/sdk';

export type FlowEditorProps = {
  flowEditorSchema: FlowEditorSchema;
  materialLib: string;

  value: any;
  onChange: (value: any) => void;
  data: any;

  children?: ReactNode;

  body: SchemaType;

  /**
   * 初始化数据 API
   */
  initApi?: ApiObject;

  saveApi?: ApiObject;

  [name: string]: any;
};

export const FlowEditorScope = (props: FlowEditorProps) => {
  const {
    children,
    flowEditorSchema,
    materialLib,
    value,
    body,
    initApi,
    saveApi
  } = props;
  const data = props.data;

  const renderContext = useRenderContext()!;

  const [store] = useState(() => {
    const store = createFlowEditorStore(flowEditorSchema, value, materialLib);
    if (initApi) {
      store.getState().setFlowDataLoader(() => {
        return Promise.resolve(
          renderContext.invokeApi(initApi, data, { props, store })
        );
      });
    }

    if (saveApi) {
      store.getState().setFlowDataSaver(flowData => {
        return Promise.resolve(
          renderContext.invokeApi(saveApi, { data: flowData }, { props, store })
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

  return (
    <StoreApiKey.Provider value={store}>
      {children}
      {body && renderContext.render('body', body, {}, { props, store })}
    </StoreApiKey.Provider>
  );
};
