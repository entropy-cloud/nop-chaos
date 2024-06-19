import { importModule } from '@nop-chaos/nop-core';
import { Fragment, ReactComponentElement, ReactNode, createContext, createElement, useContext, useState } from 'react';

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
  inheritParentComponents?:boolean;
  children?: ReactNode;
};

export function useReactComponentScope(){
  return useContext(ReactComponentScopeKey)
}

export function ReactComponentScopeComponent(
  props: ComponentScopeComponentProps
) {
  const componentScope = useContext(ReactComponentScopeKey)

  return createElement(
    ReactComponentScopeKey.Provider,
    { value: props.inheritParentComponents ? {...componentScope,...props.components} : props.components },
    [props.children]
  );
}

export type ReactDynamicComponentScopeComponentProps = {
  componentLib: string;
  inheritParentComponents?: boolean
  children?: ReactNode;
};

export function ReactDynamicComponentScopeComponent(
  props: ReactDynamicComponentScopeComponentProps
) {
  const { componentLib, inheritParentComponents, children } = props;

  const [components, setComponents] = useState<ComponentScope>();

  const componentScope = useContext(ReactComponentScopeKey)

  importModule(componentLib).then((mod: any) => {
    setComponents(mod.components || mod.defaults || mod);
  });

  if(!components)
    return createElement(Fragment)

  return createElement(ReactComponentScopeComponent,
       {components, inheritParentComponents}, children)
}
