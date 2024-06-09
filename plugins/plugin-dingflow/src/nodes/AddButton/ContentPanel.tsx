import { memo } from 'react';
import { styled } from 'styled-components';
import { MaterialItem } from './MaterialItem';
import { DingFlowNode, useFlowEditorStoreWith } from '../../store';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 360px;
`;

export const ContentPanel = memo(
  (props: { nodeId: string; onClickMaterial: (node: DingFlowNode) => void }) => {
    const { nodeId, onClickMaterial } = props;
    const getNode = useFlowEditorStoreWith(state => state.getNode);
    const nodeMetas = useFlowEditorStoreWith(state=> state.flowEditorSchema.nodeMetas)
    const edgeMetas = useFlowEditorStoreWith(state=> state.flowEditorSchema.edgeMetas)

    const node = getNode(nodeId)!;
    const edgeMeta = edgeMetas[node.nodeType] || edgeMetas[node.nodeKind] || edgeMetas["default"];

    //const editorStore = useEditorEngine();
    return (
      <Container className="add-node-content">
        { edgeMeta?.allowTargets?.map((nodeType,index) => {
            return (
              <MaterialItem
                nodeId={nodeId}
                key={nodeType || '' + index}
                material={nodeMetas[nodeType]}
                onClick={() => onClickMaterial(node)}
              />
            );
          })
         }
      </Container>
    );
  }
);
