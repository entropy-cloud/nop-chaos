import { styled } from 'styled-components';
import { RightOutlined } from '@ant-design/icons';

import {
  DingFlowNode,
  DingFlowNodeMeta,
  NodeTitleShell,
  NodeContent,
  ContentPlaceholder,
  NodeTitle,
  FlowEditorStoreType,
  DingFlowRouteNode
} from '@nop-chaos/plugin-dingflow';

import React from 'react';
import { ConditionNodeTitle } from '@nop-chaos/plugin-dingflow/src/nodes/RouteNode/ConditionNodeTitle';

type NodeProps = {
  node: DingFlowNode;
  store: FlowEditorStoreType;
  material: DingFlowNodeMeta;
  t: (msg: string) => string;
  editable?: boolean;
};

function StartNodeContent(props: NodeProps) {
  const { material, t, store } = props;

  return (
    <>
      <NodeTitleShell
        className="node-title start-node-title"
        style={{ backgroundColor: material.color }}
      >
        {t(material.label || '')}
      </NodeTitleShell>
      <NodeContent className="content">
        <ContentPlaceholder text={t(material.info)} />
        <RightOutlined className="arrow" />
      </NodeContent>
    </>
  );
}

function NormalNodeContent(props: NodeProps) {
  const { node, material, t, editable } = props;
  return (
    <>
      <NodeTitle
        node={node}
        material={material}
        closable={editable && material.deletable}
        editable={editable}
      />
      <NodeContent className="content">
        <ContentPlaceholder text={t(material.info)} />
        <RightOutlined className="arrow" />
      </NodeContent>
    </>
  );
}

type ConditionNodeProps = NodeProps & {
  parent: DingFlowRouteNode;
  index: number;
};

function ConditionNodeContent(props: ConditionNodeProps) {
  const {node, parent, index,t,editable} = props

  return (
    <>
      <ConditionNodeTitle node={node} parent={parent} index={index} editable={editable}/>
      <NodeContent className="content">
       <ContentPlaceholder text={t("pleaseSetCondition")} />
      </NodeContent>
    </>
  );
}

export default {
  start: StartNodeContent,
  approver: NormalNodeContent,
  notifier: NormalNodeContent,
  audit: NormalNodeContent,
  condition: ConditionNodeContent,
};
