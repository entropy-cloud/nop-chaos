import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { styled } from 'styled-components';
import { useError } from '../store/hooks';

const Shell = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  right: -40px;
`;

const ErrorIcon = styled(InfoCircleOutlined)`
  color: red;
  font-size: 24px;
`;

export const ErrorTip = (props: { nodeId: string }) => {
  const { nodeId } = props;
  const errorMsg = useError(nodeId);
  return (
    <Shell>
      {errorMsg && (
        <Tooltip title={errorMsg}>
          <ErrorIcon />
        </Tooltip>
      )}
    </Shell>
  );
};
