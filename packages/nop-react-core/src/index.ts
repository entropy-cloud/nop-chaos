import { createContext } from 'react';
import { RenderContext, registerModule, registerRenderComponent } from '@nop-chaos/nop-core';


import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as zustand from 'zustand';
import { ReactNopScopeComponent } from './nop-scope';

export * from './component-scope'
export * from './store-scope'
export * from './nop-scope'

export const ReactRenderContextKey = createContext<RenderContext | null>(null);

registerModule('react', React);
registerModule('react-dom', ReactDom);
registerModule('zustand', zustand);

registerRenderComponent({
  name: 'nop-scope',
  amis:true,
  reactComponent: ReactNopScopeComponent
})

export function useReactRenderContext() {
  return React.useContext(ReactRenderContextKey);
}
