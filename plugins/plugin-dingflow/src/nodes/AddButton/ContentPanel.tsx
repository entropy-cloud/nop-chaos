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
    const node = getNode(nodeId)!;
    
    //const editorStore = useEditorEngine();
    return (
      <Container className="add-node-content">
        {/* {editorStore?.materials
          ?.filter(material => !material.hidden)
          .map((material, index) => {
            return (
              <MaterialItem
                nodeId={nodeId}
                key={material.defaultConfig?.nodeType || '' + index}
                material={material}
                onClick={() => onClickMaterial(node)}
              />
            );
          })} */}
      </Container>
    );
  }
);
