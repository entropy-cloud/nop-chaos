import { styled } from "styled-components"
import {RightOutlined} from '@ant-design/icons'

import { DingFlowNode, MaterialMeta, NodeTitleShell,NodeContent, ContentPlaceholder } from "@nop-chaos/plugin-dingflow";

import React from 'react'

type NodeProps = {
  node: DingFlowNode,
  material: MaterialMeta
  t: (msg:string) => string
}

function StartNodeContent(props: NodeProps){
  const {material,t} = props
  
    return <>
      <NodeTitleShell className="node-title start-node-title" style={{ backgroundColor: props.material?.color }}>
          {t(material.label || "")}
        </NodeTitleShell>
        <NodeContent className="content">
          <ContentPlaceholder secondary text={t("pleaseChooseApprover")} />
          <RightOutlined className="arrow" />
        </NodeContent>
        </>
}

export default {

    'start': StartNodeContent
}