import { useAdapter } from '../adapter';

import { createEventBus } from '../eventbus';

const componentEventBus = createEventBus(true)

export type RenderComponentConfig = {
  name: string,
  isolateScope?: boolean,
  autoVar?:boolean,
  isFormItem?: boolean,
  vueComponent?: any;
  reactComponent?: any;
  // 其他扩展属性
  [name:string]: any;
};

const g_componentConfigs = new Map<string, RenderComponentConfig>();

export function registerRenderComponent(
  config: RenderComponentConfig
) {
    g_componentConfigs.set(config.name, config);
    componentEventBus.onEvent("register",config)
}

export function unregisterRenderComponent(name: string) {
  const config = g_componentConfigs.get(name);
  if (config == null) return;
  g_componentConfigs.delete(name)
  componentEventBus.onEvent("unregister",config)
}

type ComponentKind = 'vue' | 'react'

export function getRenderComponent(kind: ComponentKind, name: string) {
  const factory = g_componentConfigs.get(name);
  if (kind == 'vue') {
    return factory?.vueComponent || useAdapter().resolveVueComponent(name);
  } else {
    return factory?.reactComponent || useAdapter().resolveReactComponent(name);
  }
}


export function addRegisterComponentEventListener(listener:(name:string, config:RenderComponentConfig)){
  return componentEventBus.addListener(listener)
}