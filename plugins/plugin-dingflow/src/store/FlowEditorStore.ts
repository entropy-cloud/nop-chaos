import { StoreApi, createStore } from 'zustand';

import { useTranslate } from '@nop-chaos/nop-core';
import {
  DingFlow,
  DingFlowBranchNode,
  DingFlowNode,
  DingFlowRouteNode,
  FlowEditorSchema,
  FlowEditorStoreType
} from './types';

import { recursiveProcess, recursiveReducer } from './processor';

import { createUndoManager, createUuid } from '@nop-chaos/nop-shared';

type SnapshotType = {
  flowData: DingFlow;
};

const initSchema: FlowEditorSchema = {
  type: 'static',
  zoom: {
    initialValue:1,
    min: 0.1,
    max: 3,
    step: 0.1
  },

  mainEditor: {
    type: 'static'
  },
  subEditors: {}
};

const initData: DingFlow = {
  wfName: 'default',
  wfVersion: 1
};

export function createFlowEditorStore(
  flowEditorSchema: FlowEditorSchema,
  flowData: DingFlow
): StoreApi<FlowEditorStoreType> {
  if (!flowEditorSchema) flowEditorSchema = initSchema;
  if (!flowData) flowData = initData;

  const undoManager = createUndoManager<SnapshotType>();

  return createStore<FlowEditorStoreType>((set, get) => {
    const t = useTranslate('flowEditor');

    const { undo, redo } = undoManager.bindStore(value =>
      set({ flowData: value.flowData })
    );

    function getNode(nodeId: string): DingFlowNode | undefined {
      const startNode = get().flowData?.startNode;
      if (!startNode) return;

      let ret: DingFlowNode | undefined;
      recursiveProcess(startNode, node => {
        if (node.id === nodeId) {
          ret = node;
          return true;
        }
        return false;
      });
      return ret;
    }

    function selectNode(id?: string) {
      set({ selectedId: id });
    }

    function saveStartNode(startNode: DingFlowNode | undefined) {
      const flowData = get().flowData;
      if (startNode !== flowData.startNode) {
        set({ flowData: { ...flowData, startNode } });
        undoManager.saveState({ flowData: get().flowData });
      }
    }

    function removeNode(id: string) {
      const startNode = get().flowData?.startNode;
      if (!startNode) return;

      const reducedNode = recursiveReducer(startNode, node => {
        if (node.childNode) {
          if (node.childNode.id === id) {
            return { ...node, childNode: node.childNode.childNode };
          }
        } else if (node.nodeKind === 'route') {
          const routeNode = node as DingFlowRouteNode;
          if (!routeNode.conditionNodeList.some(cond => cond.id === id))
            return node;

          let newConditions = routeNode.conditionNodeList.filter(
            cond => cond.id !== id
          );
          return { ...node, conditionNodeList: newConditions };
        }

        return node;
      });

      saveStartNode(reducedNode);
    }

    function changeNode(newNode: DingFlowNode) {
      const startNode = get().flowData?.startNode;
      if (!startNode) return;

      const reducedNode = recursiveReducer(startNode, node => {
        return node.id === newNode.id ? newNode : node;
      });

      saveStartNode(reducedNode);
    }

    function addChild(node: DingFlowNode, child: DingFlowNode) {
      const newNode = {
        ...node,
        childNode: { ...child, childNode: node.childNode }
      };
      changeNode(newNode);
    }

    function addCondition(
      parent: DingFlowRouteNode,
      condition: DingFlowBranchNode
    ) {
      const newNode: DingFlowRouteNode = {
        ...parent,
        conditionNodeList: [...parent.conditionNodeList, condition]
      };
      changeNode(newNode);
    }

    function cloneCondition(
      node: DingFlowRouteNode,
      condition: DingFlowBranchNode
    ) {
      const newCondition = JSON.parse(JSON.stringify(condition));
      newCondition.name = newCondition.name + t('ofCopy');
      //重写Id
      resetId(newCondition);
      const index = node.conditionNodeList.indexOf(condition);
      const newList = [...node.conditionNodeList];
      newList.splice(index + 1, 0, newCondition);
      const newNode: DingFlowRouteNode = {
        ...node,
        conditionNodeList: newList
      };
      changeNode(newNode);
    }

    function moveConditionLeft(
      node: DingFlowRouteNode,
      condition: DingFlowBranchNode
    ) {
      const index = node.conditionNodeList.indexOf(condition);
      if (index > 0) {
        const newConditions = [...node.conditionNodeList];
        newConditions[index] = newConditions.splice(
          index - 1,
          1,
          newConditions[index]
        )[0];
        const newNode: DingFlowRouteNode = {
          ...node,
          conditionNodeList: newConditions
        };
        changeNode(newNode);
      }
    }

    function moveConditionRight(
      node: DingFlowRouteNode,
      condition: DingFlowBranchNode
    ) {
      const index = node.conditionNodeList.indexOf(condition);
      if (index >= 0 && index < node.conditionNodeList.length - 1) {
        const newConditions = [...node.conditionNodeList];
        newConditions[index] = newConditions.splice(
          index + 1,
          1,
          newConditions[index]
        )[0];
        const newNode: DingFlowRouteNode = {
          ...node,
          conditionNodeList: newConditions
        };
        changeNode(newNode);
      }
    }

    function resetId(node: DingFlowNode) {
      node.id = createUuid();
      if (node.childNode) {
        resetId(node.childNode);
      }
      if (node.nodeKind === 'route') {
        for (const condition of (node as DingFlowRouteNode).conditionNodeList) {
          resetId(condition);
        }
      }
    }

    return {
      flowEditorSchema,
      flowData,
      canUndo: undoManager.canUndo,
      canRedo: undoManager.canRedo,
      undo,
      redo,
      getNode,
      selectNode,
      removeNode,
      changeNode,
      addChild,
      addCondition,
      cloneCondition,
      moveConditionLeft,
      moveConditionRight,
      setFlowEditorSchema(flowEditorSchema) {
        set({ flowEditorSchema });
      },
      setFlowData(flowData) {
        set({ flowData });
      },
      clear() {
        set({ flowData: initData });
      },
      setFlowDataLoader(loader) {
        set({ flowDataLoader: loader });
      },
      setFlowDataSaver(saver) {
        set({ flowDataSaver: saver });
      },

      async loadFlowData() {
        const loader = get().flowDataLoader;
        if (!loader) return;
        const flowData = await loader();
        set({ flowData });
        undoManager.reset()
      },

      async saveFlowData(){
        const saver = get().flowDataSaver
        if(!saver)
            return
        return saver(get().flowData)
      }
    };
  });
}
