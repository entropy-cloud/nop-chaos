import { useCallback } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';
import { Button } from 'antd';
import { useFlowEditorStoreWith } from '../store';

const CloseStyledButton = styled(Button)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CloseButton = (props: { nodeId: string }) => {
  const { nodeId } = props;
  const removeNode = useFlowEditorStoreWith(state => state.removeNode);

  const handleClose = useCallback(() => {
    removeNode(nodeId);
  }, [nodeId]);

  return (
    <CloseStyledButton
      className="close"
      type="text"
      size="small"
      shape="circle"
      icon={<CloseOutlined style={{ color: '#fff', fontSize: 12 }} />}
      onClick={handleClose}
    />
  );
};
