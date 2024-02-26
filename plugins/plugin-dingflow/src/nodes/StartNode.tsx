import { memo, useCallback } from 'react';
import {
  useFlowEditorStoreWith,
  useStartNode
} from '../store/hooks';
import { AddButton } from './AddButton';
import { ChildNode } from './ChildNode';
import { EndNode } from './EndNode';
import { ErrorTip } from './ErrorTip';
import { NodeRenderer, NodeWrap, NodeWrapBox } from './NodeContent';

export const StartNode = memo(() => {
  const startNode = useStartNode()!;
  const selectNode = useFlowEditorStoreWith(state => state.selectNode);
  const handleClick = useCallback(() => {
    selectNode(startNode?.id);
  }, [startNode, selectNode]);

  return (
    <NodeWrap className="node-wrap start">
      <NodeWrapBox className="node-wrap-box" onClick={handleClick}>
        <NodeRenderer node={startNode} />
        {startNode?.id && <ErrorTip nodeId={startNode.id} />}
      </NodeWrapBox>
      {<AddButton nodeId={startNode?.id} />}
      {startNode?.childNode && <ChildNode node={startNode?.childNode} />}
      <EndNode />
    </NodeWrap>
  );
});
