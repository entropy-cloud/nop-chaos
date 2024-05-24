import { ReactStoreApiKey } from '@nop-chaos/sdk';

import { ReactNode, useState } from 'react';

import { useReactRenderContext } from '@nop-chaos/sdk';
import { createFlowEditorStore } from '../store';

import { ApiObject, SchemaType } from '@nop-chaos/sdk';
import { FlowEditorSchema } from '../store/types';

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

  const renderContext = useReactRenderContext()!;

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
    store.getState().loadFlowData()
    return store;
  });

  return (
    <ReactStoreApiKey.Provider value={store}>
      {children}
      {body && renderContext.render('body', body, {}, { props, store })}
    </ReactStoreApiKey.Provider>
  );
};
