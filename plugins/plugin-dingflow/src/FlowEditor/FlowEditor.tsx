import { memo } from 'react';
import { FlowEditorScope, FlowEditorProps } from './FlowEditorScope';

import { styled } from 'styled-components';

const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
`;

export const FlowEditor = memo((props: FlowEditorProps) => {
  return <EditorContainer>
  <FlowEditorScope {...props}/>
  </EditorContainer>
});
