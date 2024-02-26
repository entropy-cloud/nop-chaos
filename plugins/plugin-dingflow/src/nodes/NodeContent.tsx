import { useRenderContext } from '@nop-chaos/nop-react-core';
import { DingFlowNode, useFlowEditorStoreWith } from '../store';
import { styled } from 'styled-components';

import { lineColor, canvasColor, nodeColor } from '../utils/theme-utils';

export const NodeWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  padding: 0 50px;
  position: relative;
  user-select: none;
  &::before {
    content: '';
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 4px;
    border-style: solid;
    border-width: 8px 6px 4px;
    border-color: ${lineColor} transparent transparent;
    background: ${canvasColor};
  }
  &.start {
    &::before {
      height: 0;
      border-width: 0;
    }
  }
`;

export const NodeWrapBox = styled.div`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  width: 220px;
  min-height: 72px;
  flex-shrink: 0;
  background: ${nodeColor};
  border: solid ${props => (props.theme.mode === 'dark' ? '1px' : 0)}
    ${props => props.theme?.token?.colorBorder};
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  &:after {
    pointer-events: none;
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    border-radius: 4px;
    border: 1px solid transparent;
    transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  }
  .close {
    display: none;
  }
  &:hover {
    outline: solid 1px ${props => props.theme.token?.colorPrimary};
    .close {
      display: inline-flex;
    }
  }
`;
export const NodeContent = styled.div`
  position: relative;
  font-size: 14px;
  padding: 16px;
  padding-right: 30px;
  user-select: none;
  .text {
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    white-space: nowrap;
  }
  .secondary {
    color: ${props => props.theme.token?.colorTextSecondary};
    opacity: 0.8;
  }
  .arrow {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 14px;
    font-size: 14px;
    color: ${props => props.theme.token?.colorTextSecondary};
  }
`;

type NodeContentProps = {
  node: DingFlowNode;
};

export function NodeRenderer(props: NodeContentProps) {
  const { render } = useRenderContext()!;
  const flowSchema = useFlowEditorStoreWith(state => state.flowSchema);
  const schema = flowSchema.nodes[props.node.nodeType];

  return <>{render('node', schema, { node: props.node }, props)}</>;
}
