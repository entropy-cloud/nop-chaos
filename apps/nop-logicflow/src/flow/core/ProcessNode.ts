import { TextNode, TextNodeModel } from '@logicflow/core'

// 解决 logic-flow 1.1 版本不支持存储流程整体属性的问题，通过添加一种特殊的节点类型来存储流程整体属性
class ProcessNodeModel extends TextNodeModel {
  static extendKey = 'ProcessNodeModel'
  setAttributes(): void {
    this.visible = false
  }
}

class ProcessNodeView extends TextNode {
  static extendKey = 'ProcessNode'
}

const ProcessNode = {
  type: '_ProcessNode_',
  view: ProcessNodeView,
  model: ProcessNodeModel,
}

export { ProcessNodeModel, ProcessNodeView }
export default ProcessNode
