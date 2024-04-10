import { importModule } from '@nop-chaos/nop-core';
import { ReactNode, createContext, createElement, useState } from 'react';

export function createReactNode(component: any, props?: any): React.ReactNode {
  // 使用React.createElement来创建ReactNode
  // component: 要创建的组件
  // props: 组件的props（可选）
  // props.children: 组件的子节点（可选）
  return createElement(component, props, props?.children);
}

type ComponentScope = {
  [name: string]: any;
};

export const ReactComponentScopeKey = createContext<ComponentScope>({});

type ComponentScopeComponentProps = {
  components: ComponentScope;
  children?: ReactNode;
};

export function ReactComponentScopeComponent(
  props: ComponentScopeComponentProps
) {
  return createElement(
    ReactComponentScopeKey.Provider,
    { value: props.components },
    [props.children]
  );
}

export type ReactDynamicComponentScopeComponentProps = {
  componentLib: string;
  children?: ReactNode;
};

export function ReactDynamicComponentScopeComponent(
  props: ReactDynamicComponentScopeComponentProps
) {
  const { componentLib, children } = props;

  const [components, setComponents] = useState<ComponentScope>();

  importModule(componentLib).then((mod: any) => {
    setComponents(mod);
  });

  if (components) {
    return createElement(
      ReactComponentScopeComponent,
      {
        components
      },
      children
    );
  } else {
    return children;
  }
}
