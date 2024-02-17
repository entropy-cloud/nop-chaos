import { SchemaType, ApiObject } from '@nop-chaos/nop-core';

export type DingFlowNodeKind =
  //开始节点
  | 'start'
  | 'normal'
  | 'route' //路由(条件节点)，下面包含分支节点
  | 'condition' // 分支节点
  | 'end';

//审批流节点
export interface DingFlowNode {
  // 唯一id
  id: string;

  //在程序代码中使用的步骤名称
  name: string;

  // 显示名称
  displayName?: string;

  nodeType: string;

  nodeKind: DingFlowNodeKind;

  //描述
  description?: string;

  //子节点
  childNode?: DingFlowNode;

  //配置
  config?: Record<string, any>;
}

//条件根节点，下面包含各分支节点
export interface DingFlowRouteNode extends DingFlowNode {
  //分支节点
  conditionNodeList: DingFlowBranchNode[];
}

//条件分支的子节点，分支节点
export interface DingFlowBranchNode extends DingFlowNode {
  //条件表达式，后端就是这样的名字，保留了
  //后面考虑通过泛型放入config，视条件复杂度决定
  //flowNodeConditionVOList?: IExpression[]
}

//审批流，代表一张审批流图
export interface DingFlow {
  //审批流名称
  wfName: string;
  wfVersion: number;

  //开始节点
  startNode?: DingFlowNode;
}

export type FlowEditorSchema = {
  type: string;

  toolbar?: SchemaType;

  mainEditor: SchemaType;

  subEditors: {
    [groupName: string]: SchemaType;
  };

  /**
   * 初始化数据 API
   */
  initApi?: ApiObject;

  saveApi?: ApiObject;
};

export type FlowEditorStoreType = {
    flowEditorSchema: FlowEditorSchema;
    flowData: DingFlow;
  
    selectedId?: string; // 当前选中的节点id
  
    canRedo(): boolean;
    canUndo(): boolean;
    redo(): void;
    undo(): void;
  
    getNode(nodeId: string): DingFlowNode | undefined;
  
    selectNode(nodeId?: string): void;
  
    removeNode(nodeId: string): void;
  
    changeNode(node: DingFlowNode): void;
  
    addChild(parent: DingFlowNode, child: DingFlowNode): void;
  
    addCondition(parent: DingFlowRouteNode, condition: DingFlowBranchNode): void;
  
    cloneCondition(
      parent: DingFlowRouteNode,
      condition: DingFlowBranchNode
    ): void;
  
    moveConditionLeft(
      parent: DingFlowRouteNode,
      condition: DingFlowBranchNode
    ): void;
  
    moveConditionRight(
      parent: DingFlowRouteNode,
      condition: DingFlowBranchNode
    ): void;
  
    clear(): void;
  };