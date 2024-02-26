import { memo } from 'react';
import { RouteNode } from './RouteNode';
import { NormalNode } from './NormalNode';
import { DingFlowNode, DingFlowRouteNode } from '../store';

export const ChildNode = memo((props: { node: DingFlowNode }) => {
  const { node } = props;
  return node.nodeKind === 'route' ? (
    <RouteNode node={node as DingFlowRouteNode} />
  ) : (
    <NormalNode node={node} />
  );
});
