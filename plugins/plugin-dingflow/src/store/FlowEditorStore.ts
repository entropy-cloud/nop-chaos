import { StoreApi } from 'zustand';

import {
  useTranslate,
  createReactStdStore
} from '@nop-chaos/sdk';
import {
  DingFlow,
  DingFlowBranchNode,
  DingFlowNode,
  DingFlowRouteNode,
  FlowEditorSchema,
  FlowEditorStoreType
} from './types';

import { recursiveProcess, recursiveReducer } from './processor';

import { createUndoManager, createUuid, VComponentType } from '@nop-chaos/sdk';

type SnapshotType = {
  flowData: DingFlow;
  errors: Record<string, string>;
};

const initSchema: FlowEditorSchema = {
  type: 'static',
  zoom: {
    initialValue: 1,
    min: 0.1,
    max: 3,
    step: 0.1
  },

  mainEditor: {
    type: 'static'
  },
  editForms: {}
};

const initData: DingFlow = {
  wfName: 'default',
  wfVersion: 1
};

export function createFlowEditorStore(
  flowEditorSchema: FlowEditorSchema,
  flowData: DingFlow,
  editable: boolean,
  initStateCreator?: (set:any,get:any)=>any,
): StoreApi<FlowEditorStoreType> {
  if (!flowEditorSchema) flowEditorSchema = initSchema;
  if (!flowData) flowData = initData;

  const undoManager = createUndoManager<SnapshotType>();
  undoManager.reset({flowData,errors:{}})

  const stateCreator = (set: any,get:any) => {
    const t = useTranslate();

    const { undo, redo } = undoManager.bindStore(value =>
      set({ flowData: value.flowData, errors: value.errors })
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
        const state = get();
        undoManager.saveState({
          flowData: state.flowData,
          errors: state.errors
        });
      }
    }

    function setError(nodeId: string, error: string | null) {
      const state = get();
      const errors = { ...state.errors };
      if (error) {
        errors[nodeId] = error;
      } else {
        delete errors[nodeId];
      }
      set({ errors });

      undoManager.saveState({
        flowData: state.flowData,
        errors
      });
    }

    function removeNode(id: string) {
      const startNode = get().flowData?.startNode;
      if (!startNode) return;

      const reducedNode = recursiveReducer(startNode, node => {
        if(node.id === id)
          return node.childNode
        
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
      newCondition.name = newCondition.name + t('flowEditor.ofCopy');
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
      editable: editable,
      flowEditorSchema,
      flowData,
      errors: {},
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
      setError,
      getComponent(name:string){
        return get().flowEditorComponents[name]
      },

      setFlowEditorSchema(flowEditorSchema: FlowEditorSchema) {
        set({ flowEditorSchema });
      },
      setFlowData(flowData: any) {
        set({ flowData });
      },
      clear() {
        set({ flowData: initData });
      },
      setFlowDataLoader(loader: any) {
        set({ flowDataLoader: loader });
      },
      setFlowDataSaver(saver: any) {
        set({ flowDataSaver: saver });
      },

      setEditing(editing:boolean){
        set({editing})
      },

      async loadFlowData() {
        const loader = get().flowDataLoader;
        if (!loader) return;
        const flowData = await loader();
        set({ flowData });
        undoManager.reset({flowData,errors:{}});
      },

      async saveFlowData() {
        const saver = get().flowDataSaver;
        if (!saver) return;
        return saver(get().flowData);
      },
      ...initStateCreator?.(set,get)
    };
  };

  return createReactStdStore({
    stateCreator
  });
}
