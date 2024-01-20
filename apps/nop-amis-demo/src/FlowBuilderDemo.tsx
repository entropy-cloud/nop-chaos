import { RenderOptions, RendererProps, render as renderAmis } from 'amis'

import { useContext, Component as ReactComponent } from 'react'

import page from './flow-builder.page'
import { RootRenderProps } from 'amis-core/lib/Root'

import "@nop-chaos/nop-amis-ext"

import { registerFlowModel, NodeContext, IRegisterNode, INode } from '@nop-chaos/nop-flow-builder'

class ConfigComponent extends ReactComponent {
  render() {
    return <></>
  }
}

const StartNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="start-node">{node.name}</div>;
};

const EndNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="end-node">{node.name}</div>;
};

const NodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="other-node">{node.name}</div>;
};

const ConditionNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="condition-node">{node.name}</div>;
};

const registerNodes: IRegisterNode[] = [
  {
    type: 'start',
    name: '开始节点',
    displayComponent: StartNodeDisplay,
    isStart: true,
  },
  {
    type: 'end',
    name: '结束节点',
    displayComponent: EndNodeDisplay,
    isEnd: true,
  },
  {
    type: 'node',
    name: '普通节点',
    displayComponent: NodeDisplay,
    configComponent: ConfigComponent
  },
  {
    type: 'condition',
    name: '条件节点',
    displayComponent: ConditionNodeDisplay,
  },
  {
    type: 'branch',
    name: '分支节点',
    conditionNodeType: 'condition',
  },
];

registerFlowModel("simple", registerNodes)

export type FlowBuilderProps = {
  flowModel: string,
  graphDiagram?: {
    nodes: INode[]
  }
}


function FlowBuilderDemo() {
  const options: RenderOptions = {
    loadRenderer(schema: any, path: string, reRender: Function) {
      return "invalid"
    }
  }

  const props: RootRenderProps = {

  }

  return (
    <>
      {renderAmis(page as any, props, options)}
    </>
  )
}

export default FlowBuilderDemo
