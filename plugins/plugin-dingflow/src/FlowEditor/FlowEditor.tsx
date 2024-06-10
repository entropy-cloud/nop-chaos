import { memo } from 'react';
import { FlowEditorScope, FlowEditorProps } from './FlowEditorScope';
import {ConfigRoot} from './ConfigRoot'
import {ThemeRoot} from './ThemeRoot'

import { styled } from 'styled-components';

const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  width:100%; // 必须设定宽度，否则canvas不会显示滚动条
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
