import { createContext } from 'react';
import { RenderContext, registerModule } from '@nop-chaos/nop-core';


import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as zustand from 'zustand';

export * from './map-store';

export * from './store-context'

export const RenderContextKey = createContext<RenderContext | null>(null);


registerModule('react', React);
registerModule('react-dom', ReactDom);
registerModule('zustand', zustand);

export function useRenderContext() {
  return React.useContext(RenderContextKey);
}
