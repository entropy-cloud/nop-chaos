import React, { useState, useContext } from 'react';
import { Drawer, Popconfirm, Popover } from 'antd';
import { RenderContextKey } from '@nop-chaos/nop-react-core'

import ReactFlowBuilder, {
  INode,
} from 'react-flow-builder';

import './index.css';
import { getFlowModel } from './registry';


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


export type FlowBuilderProps = {
  flowModel: string,
  graphDiagram?: {
    nodes: INode[]
  }
}

export function FlowBuilder(props: FlowBuilderProps) {
  const [nodes, setNodes] = useState<INode[]>(props.graphDiagram?.nodes || []);
  const renderContext = useContext(RenderContextKey)!
  const { onEvent } = renderContext

  const nodeModels = getFlowModel(props.flowModel)
  if (!nodeModels)
    throw new Error("nop.err.unknown-flow-model:" + props.flowModel)

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
      registerNodes={nodeModels}
      DrawerComponent={DrawerComponent}
      PopoverComponent={PopoverComponent}
      PopconfirmComponent={PopconfirmComponent}
    />
  );
};