import React from 'react';
import {
  FormItem,
  FormControlProps,
  Renderer,
  ScopedContext,
  IScopedContext
} from 'amis';
import {
  createObject,
  resolveVariableAndFilter,
  ActionObject,
  RendererData,
  unRegisterRenderer,
  RendererProps
} from 'amis-core';

import { getRenderComponent } from '@nop-chaos/sdk';
import { applyPureVueInReact } from 'veaury';

export interface VueControlProps extends FormControlProps {
  componentName: string;
}

export default class VueControl extends React.Component<
  VueControlProps & RendererProps,
  any
> {
  vueComponent: any;

  constructor(props: VueControlProps) {
    super(props);
    this.vueComponent = applyPureVueInReact(
      getRenderComponent('vue', props.componentName)
    );
  }

  doAction(action: ActionObject, data: RendererData, throwErrors?: boolean) {
    const { resetValue, onChange } = this.props;
    const actionType = action?.actionType as string;

    if (actionType === 'clear') {
      onChange(undefined);
    } else if (actionType === 'reset') {
      onChange(resetValue);
    }
  }

  async dispatchChangeEvent(eventData: any = {}) {
    const { dispatchEvent, data, onChange } = this.props;
    const rendererEvent = await dispatchEvent(
      'change',
      createObject(data, {
        value: eventData
      })
    );

    if (rendererEvent?.prevented) {
      return;
    }

    onChange && onChange(eventData);
  }

  override render() {
    let { componentName, value, env, store, ...rest } = this.props;

    const props = { ...rest };
    for (const key of Object.keys(props)) {
      if (typeof props[key] === 'string') {
        props[key] = resolveVariableAndFilter(
          props[key],
          this.props.data,
          '| raw'
        );
      }
    }

    let mergedProps = {
      env,
      store,
      ...props,
      value,
      'onUpdate:value': (value: any) => this.dispatchChangeEvent(value)
    };
    return React.createElement(this.vueComponent, mergedProps);
  }
}

class VueRenderer extends VueControl {
  static override contextType = ScopedContext;

  constructor(props: VueControlProps) {
    super(props);
    const scoped = this.context as IScopedContext;
    if (scoped) scoped.registerComponent(this);
  }

  override componentWillUnmount() {
    const scoped = this.context as IScopedContext;
    if (scoped) scoped.unRegisterComponent(this);
  }
}

unRegisterRenderer('vue-renderer');
unRegisterRenderer('vue-form-item');

// autoVar只对最顶层的string字符串属性有效
Renderer({
  type: 'vue-renderer',
  autoVar: false
})(VueRenderer);

class VueFormItem extends VueControl {}

FormItem({
  type: 'vue-form-item',
  autoVar: false
})(VueFormItem);
