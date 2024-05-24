import {
  registerRenderComponent,
  unregisterRenderComponent,
  Plugin
} from '@nop-chaos/sdk';

import { FlowEditor, FlowEditorCanvas } from './FlowEditor';

export * from './store';

export function install() {
  registerRenderComponent({name: 'nop-flow-editor', amis:true, reactComponent: FlowEditor});
  registerRenderComponent({name: 'nop-flow-editor-canvas', amis:true, reactComponent: FlowEditorCanvas});
}

export function uninstall() {
  unregisterRenderComponent('nop-flow-editor');
  unregisterRenderComponent('nop-flow-editor-canvas');
}

export function loadPlugin(): Plugin{
  return {
    name: "plugin-dingflow",
    install,
    uninstall
  }
}