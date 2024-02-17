import { Space, Button } from 'antd';
import { memo } from 'react';
import { MiniFloatContainer } from '../../components/MiniFloatContainer';
import { undoIcon, redoIcon } from '../../icons';
import { useFlowEditorStoreWith } from '../../store';

export const OperationBar = memo((props: { float?: boolean }) => {
  const { float } = props;
  const [canUndo, canRedo, undo, redo] = useFlowEditorStoreWith(state => [
    state.canUndo,
    state.canRedo,
    state.undo,
    state.redo
  ]);

  return (
    <MiniFloatContainer
      className={'workflow-operation-bar' + (float ? ' float' : '')}
    >
      <Space>
        <Button
          type={'text'}
          size="small"
          icon={undoIcon}
          disabled={!canUndo()}
          onClick={undo}
        />
        <Button
          type={'text'}
          size="small"
          disabled={!canRedo()}
          icon={redoIcon}
          onClick={redo}
        />
      </Space>
      
    </MiniFloatContainer>
  );
});
