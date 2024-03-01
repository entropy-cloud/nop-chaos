import {
  registerRendererComponent,
  unregisterRendererComponent
} from '@nop-chaos/nop-core';
import { FlowEditor, FlowEditorCanvas } from './FlowEditor';

export * from './store';

export function install() {
  registerRendererComponent('react', 'NopFlowEditor', FlowEditor);
  registerRendererComponent('react', 'NopFlowEditorCanvas', FlowEditorCanvas);
}

export function uninstall() {
  unregisterRendererComponent('react', 'NopFlowEditor');
  unregisterRendererComponent('react', 'NopFlowEditorCanvas');
}
