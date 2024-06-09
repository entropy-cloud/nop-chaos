import { ReactStoreApiKey } from '@nop-chaos/sdk';

import { ReactNode, useState } from 'react';

import { useReactRenderContext } from '@nop-chaos/sdk';
import { createFlowEditorStore } from '../store';

import { ApiObject, SchemaType } from '@nop-chaos/sdk';
import { FlowEditorSchema } from '../store/types';

export type FlowEditorProps = {
  editing: boolean,
  flowEditorSchema: FlowEditorSchema;
  materialLib: string;

  flowData: any;
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
    editable,
    flowEditorSchema,
    materialLib,
    flowData,
    header,
    body,
    initApi,
    saveApi
  } = props;
  console.debug("render-flow-editor-scope")
  const data = props.data;

  const renderContext = useReactRenderContext()!;

  const [store] = useState(() => {
    const store = createFlowEditorStore(flowEditorSchema, flowData, materialLib,editable)
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
        {header && renderContext.render('header',header,{},{props,store})}
        {body && renderContext.render('body', body, {}, { props, store })}
    </ReactStoreApiKey.Provider>
  );
};
