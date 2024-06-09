import { arrayEquals } from '@nop-chaos/sdk';
import { DingFlowBranchNode, DingFlowNode, DingFlowRouteNode } from './types';

export type NodeProcessor = (node: DingFlowNode) => boolean;

export function recursiveProcess(node: DingFlowNode, processor: NodeProcessor) {
  if (processor(node)) return true;

  if (node.childNode) {
    if (recursiveProcess(node.childNode, processor)) return true;
  }

  if (node.nodeKind === 'route') {
    for (const conditionNode of (node as DingFlowRouteNode).conditionNodeList) {
      if (recursiveProcess(conditionNode, processor)) return true;
    }
  }
  return false;
}

export type NodeReducer = (node: DingFlowNode, parent?: DingFlowNode) => DingFlowNode | undefined;

export function recursiveReducer(
  node: DingFlowNode,
  reducer: NodeReducer,
  parent?: DingFlowNode
): DingFlowNode | undefined {
  const processed = reducer(node,parent);
  if (processed !== node) return processed;

  let newNode: DingFlowNode | undefined;
  let useNew: boolean = false;

  if (node.childNode) {
    const child = recursiveReducer(node.childNode,reducer,parent);
    if (child !== node.childNode) {
      newNode = { ...node };
      newNode.childNode = child;
      useNew = true;
    }
  }

  if (node.nodeKind === 'route') {
    const routeNode = node as DingFlowRouteNode;
    const list = routeNode.conditionNodeList
      .map(child => recursiveReducer(child,reducer,parent))
      .filter(child => child != null) as DingFlowBranchNode[];

    if(list.length == 0){
        if(parent){
          parent.childNode = routeNode.childNode
        }else{
          return node.childNode
        }
    }else if (!arrayEquals(list, routeNode.conditionNodeList)) {
      if (!useNew) {
        newNode = { ...routeNode };
        useNew = true;
      }
      (newNode as DingFlowRouteNode).conditionNodeList = list;
    }
  }

  return useNew ? newNode : node;
}
