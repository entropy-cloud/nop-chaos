import { memo } from 'react';
import { FlowEditorScope, FlowEditorProps } from './FlowEditorScope';

export const FlowEditor = memo((props: FlowEditorProps) => {
  return <FlowEditorScope {...props}/>;
});
