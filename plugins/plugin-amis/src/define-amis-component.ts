import {
  FormControlProps,
  FormItem,
  IScopedContext,
  Renderer,
  RendererProps,
  ScopedContext,
  unRegisterRenderer
} from 'amis-core';
import React from 'react';

export type AmisRendererConfig = {
  type: string;
  isolateScope?: boolean;
  isFormItem?: boolean;
  autoVar?: boolean;
  reactComponent?: any;
};

/**
 * 将普通的React控件包装为AMIS控件，并注册到AMIS的Registry中
 */
export function defineAmisComponent(config: AmisRendererConfig) {
  unRegisterRenderer(config.type);

  const component = createAmisComponent(config.reactComponent);

  if (config.isFormItem) {
    FormItem(config)(component);
  }else{
    Renderer(config)(component as any);
  } 
}

function createAmisComponent(reactComponent: any) {
  return class Component extends React.Component<
    FormControlProps ,
    any
  > {
    static override contextType = ScopedContext;

    constructor(props: FormControlProps & RendererProps) {
      super(props);

      const scoped = this.context as IScopedContext;
      if (scoped) scoped.registerComponent(this);
    }

    override componentWillUnmount() {
        const scoped = this.context as IScopedContext;
        if (scoped) scoped.unRegisterComponent(this);
      }

    override render() {
      return React.createElement(reactComponent, this.props);
    }
  };
}