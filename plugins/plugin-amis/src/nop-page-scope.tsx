import {
  ActionObject,
  ApiObject as AmisApiObject,
  IScopedContext,
  RendererProps,
  isEffectiveApi,
  IServiceStore,
  unRegisterRenderer,
  Renderer
} from 'amis';
import React from 'react';

import {
  ApiObject,
  StdStoreApi
} from '@nop-chaos/sdk';

import {
  ReactRenderContextKey,
  RenderComponentCtx,
} from '@nop-chaos/sdk'

class PageScopeComponent extends React.Component<RendererProps, any> {
  constructor(props: RendererProps) {
    super(props);
    this.state = {};
    this.handleAmisAction = this.handleAmisAction.bind(this);
    this.amisRender = this.amisRender.bind(this);
    this.amisInvokeApi = this.amisInvokeApi.bind(this);
  }

  handleAmisAction(
    renderCtx: RenderComponentCtx,
    e: React.UIEvent<any> | void,
    action: ActionObject,
    ctx: object,
    throwErrors: boolean = false,
    delegate?: IScopedContext
  ) {
    const store = renderCtx.store as StdStoreApi;
    const actionType = action.actionType?.toString()
    if (actionType?.startsWith('store:')) {
      const handlerName = actionType.substring('store:'.length);
      const handler = store.getState().getValue(handlerName);
      if(!handler)
        throw new Error("nop.err.unknown-store-handler:"+handlerName)
      return handler?.(action.mergeData);
    }
    if(renderCtx.onOk && actionType == 'action:ok'){
      return renderCtx.onOk(ctx)
    }
    if(renderCtx.onCancel && actionType == 'action:cancel'){
      return renderCtx.onCancel()
    }
    return this.props.onAction?.(e, action, ctx, throwErrors, delegate);
  }

  amisRender(
    name: string,
    schema: any,
    opts: any,
    renderCtx: RenderComponentCtx
  ) {
    return this.props.render(name, schema, {
      ...opts,
      onAction: (
        e: React.UIEvent<any> | void,
        action: ActionObject,
        ctx: object,
        throwErrors: boolean = false,
        delegate?: IScopedContext
      ) => {
        this.handleAmisAction(
          renderCtx,
          e,
          action,
          ctx,
          throwErrors,
          delegate
        );
      }
    });
  }

  amisInvokeApi(
    api: ApiObject,
    data: any,
    ctx: RenderComponentCtx
  ): Promise<any> | any {
    const store = this.props.store as IServiceStore;
    if (store) {
      if (!isEffectiveApi(api as AmisApiObject, data)) return;
      return store
        .fetchData(api as AmisApiObject, data)
        .then(res => res.data as any);
    }
    return;
  }

  override render() {
    const props = this.props;

    const subProps = {
      onAction: props.onAction
    }

    return (
      <ReactRenderContextKey.Provider
        value={{
          render: this.amisRender,
          invokeApi: this.amisInvokeApi
        }}
      >
        {props.body && props.render("body",props.body,subProps)}
      </ReactRenderContextKey.Provider>
    );
  }
}

unRegisterRenderer('nop-page-scope');

// autoVar只对最顶层的string字符串属性有效
Renderer({
  type: 'nop-page-scope',
  autoVar: false
})(PageScopeComponent);
