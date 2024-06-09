import { memo } from 'react';
import { FlowEditorScope, FlowEditorProps } from './FlowEditorScope';
import {ConfigRoot} from './ConfigRoot'
import {ThemeRoot} from './ThemeRoot'

import { styled } from 'styled-components';

const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
`;

export const FlowEditor = memo((props: FlowEditorProps) => {
  return (
    <EditorContainer>
      <ConfigRoot>
        <ThemeRoot>
        <FlowEditorScope {...props} />
        </ThemeRoot>
      </ConfigRoot>
    </EditorContainer>
  );
});
