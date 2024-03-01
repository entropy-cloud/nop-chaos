import { memo } from 'react';
import { FlowEditorScope, FlowEditorProps } from './FlowEditorScope';

export const FlowEditor = memo((props: FlowEditorProps) => {
  const { children, ...rest } = props;
  return <FlowEditorScope {...rest}>{children}</FlowEditorScope>;
});
