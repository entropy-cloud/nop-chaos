import {
  ReactNode,
  createElement,
  useState
} from 'react';


import {
  StdStoreApi,
  importModule
} from '@nop-chaos/nop-core';


import { ReactStoreApiKey, createReactStdStore, useReactStdStoreVar } from './store-hooks';

type ReactStoreComponentProps = {
  store: StdStoreApi;
  children?: ReactNode;
};

export function ReactStoreScopeComponent(props: ReactStoreComponentProps) {
  return createElement(
    ReactStoreApiKey.Provider,
    {
      value: props.store
    },
    [props.children]
  );
}

export type ReactDynamicStoreScopeComponentProps = {
  storeLib: string;
  initState?: { [name: string]: any };
  inheritParentStore?: boolean;
  saveKeys?: string[];
  children?: ReactNode;
};

export function ReactDynamicStoreScopeComponent(
  props: ReactDynamicStoreScopeComponentProps
) {
  const { storeLib, initState, inheritParentStore, saveKeys, children } = props;

  const parentGetValue = useReactStdStoreVar('getValue');

  const [store] = useState<StdStoreApi>(()=>{
    return importModule(storeLib).then((mod: any) => {
        return createReactStdStore({
          initState,
          getDefaultValue: inheritParentStore ? parentGetValue : undefined,
          saveKeys,
          stateCreator: mod.createStoreState
        })
    });
  });

  if (store) {
    return createElement(
      ReactStoreScopeComponent,
      {
        store: store
      },
      children
    );
  } else {
    return children;
  }
}
