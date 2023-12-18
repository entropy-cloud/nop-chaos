import React, { useState, useContext } from 'react';
import { Drawer, Popconfirm, Popover } from 'antd';
import { RenderContextKey } from '@nop-chaos/nop-react-core'

import ReactFlowBuilder, {
  NodeContext,
  INode,
  IRegisterNode,
} from 'react-flow-builder';

import './index.css';

class ConfigComponent extends React.Component {
  render() {
    return <></>
  }
}

const DrawerComponent = (props: any) => {
  const { visible, children, ...restProps } = props;
  return (
    <Drawer open={visible} {...restProps}>
      {children}
    </Drawer>
  );
};

const PopoverComponent = (props: any) => {
  const { visible, onVisibleChange, children, ...restProps } = props;
  return (
    <Popover open={visible} onOpenChange={onVisibleChange} {...restProps}>
      {children}
    </Popover>
  );
};

const PopconfirmComponent = (props: any) => {
  const { children, ...restProps } = props;
  return <Popconfirm {...restProps}>{children}</Popconfirm>;
};

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

export type FlowBuilderProps = {
  graphDiagram?: {
    nodes: INode[]
  }
}

export function FlowBuilder(props: FlowBuilderProps) {
  const [nodes, setNodes] = useState<INode[]>(props.graphDiagram?.nodes||[]);
  const renderContext = useContext(RenderContextKey)!
  const { onEvent } = renderContext

  const handleChange = (nodes: INode[], event: string, node: INode) => {
    console.log('nodes change', nodes, "event=", event);
    setNodes(nodes);

    if (onEvent) {
      if (event == "click-node") {
        onEvent("designer:selectElement", { groupName: 'steps', elementType: 'step', elementId: node.id }, props)
      } else if (event == 'remove-node') {
        onEvent("designer:removeElement", { groupName: 'steps', elementType: 'step', elementId: node.id }, props)
      }
      onEvent("designer:graphChange", { nodes }, props)
    }
  };

  return (
    <ReactFlowBuilder className='nop-flow-builder'
      historyTool
      zoomTool
      nodes={nodes}
      onChange={handleChange}
      registerNodes={registerNodes}
      DrawerComponent={DrawerComponent}
      PopoverComponent={PopoverComponent}
      PopconfirmComponent={PopconfirmComponent}
    />
  );
};