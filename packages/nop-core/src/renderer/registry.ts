import { useAdapter } from '../adapter';

type ComponentKind = 'vue' | 'react';

type ComponentFactory = {
  vueFactory: any;
  reactFactory: any;
};

const g_componentFactorys = new Map<string, ComponentFactory>();

export function registerRendererComponent(
  kind: ComponentKind,
  name: string,
  factory: any
) {
  let componentFactory = g_componentFactorys.get(name);
  if (componentFactory == null) {
    componentFactory = {
      vueFactory: undefined,
      reactFactory: undefined
    };
    g_componentFactorys.set(name, componentFactory);
  }

  if (kind == 'vue') {
    factory.vueFactory = factory;
  } else {
    factory.reactFactory = factory;
  }
}

export function unregisterRendererComponent(kind: ComponentKind, name: string) {
  const factory = g_componentFactorys.get(name);
  if (factory == null) return;
  if (kind == 'vue') {
    factory.vueFactory = undefined;
  } else {
    factory.reactFactory = undefined;
  }
}

export function getRendererComponent(kind: ComponentKind, name: string) {
  const factory = g_componentFactorys.get(name);
  if (!factory) return;
  if (kind == 'vue') {
    return factory.vueFactory || useAdapter().resolveVueComponent(name);
  } else {
    return factory.reactFactory || useAdapter().resolveReactComponent(name);
  }
}
