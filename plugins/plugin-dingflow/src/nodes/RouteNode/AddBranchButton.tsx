import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslate, createUuid } from '@nop-chaos/sdk';
import { nodeColor } from '../../utils/theme-utils';
import {
  DingFlowNode,
  DingFlowRouteNode,
  useFlowEditorStore,
  useFlowEditorStoreWith
} from '../../store';

const AddBranch = styled.button`
  border: none;
  outline: none;
  user-select: none;
  justify-content: center;
  font-size: 12px;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  color: ${props => props.theme.token?.colorPrimary};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: center center;
  cursor: pointer;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  background: ${nodeColor};
  border: solid ${props => (props.theme.mode === 'dark' ? '1px' : 0)}
    ${props => props.theme?.token?.colorBorder};
  &:hover {
    transform: translateX(-50%) scale(1.1);
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.1);
  }
  &:active {
    transform: translateX(-50%);
    box-shadow: none;
  }
`;

export const AddBranchButton = memo((props: { node: DingFlowRouteNode,editable?:boolean }) => {
  const { node,editable } = props;
  const t = useTranslate();
  const [addCondition, getNode, selectNode] = useFlowEditorStoreWith(state => [
    state.addCondition,
    state.getNode,
    state.selectNode
  ]);

  const handleClick = useCallback(() => {
    const newId = createUuid();

    addCondition(node, {
      id: newId,
      nodeType: 'condition',
      nodeKind: 'condition',
      name: t('condition') + (node.conditionNodeList.length + 1)
    });
    selectNode(newId);
  }, [node]);

  return <AddBranch onClick={handleClick}>{editable ? t('addCondition'): t('conditions')}</AddBranch>;
});
