import React, { memo, useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import { CloseButton } from "./CloseButton";
import { DingFlowNode, DingFlowNodeMeta, useFlowEditorStoreWith } from "../store";
import { NamedIcon } from "../icons";

export const NodeTitleShell = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 30px;
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  color: #fff;
  text-align: left;
  //background: #576a95;
  border-radius: 4px 4px 0 0;
  user-select: none;
  &.start-node-title{
    //background: rgb(87, 106, 149);
  }
`
export const NodeIcon = styled.div`
  font-size: 14px;
  margin-right: 8px;
`

export const TitleResponse = styled.div`
  flex:1;
  display: flex;
  padding: 2px 0;
  align-items: center;
`

export const NodeTitleText = styled.div`
  border: solid transparent 1px;
  &:hover{
    line-height: 16px;
    border-bottom: dashed 1px #fff;
  }
`

export const NodeTitleInput = styled.input`
  flex: 1;
  height: 18px;
  padding-left: 4px;
  text-indent: 0;
  font-size: 12px;
  line-height: 18px;
  z-index: 1;
  outline: solid 2px rgba(80,80,80, 0.3);
  border: 0;
  border-radius: 4px;
  background-color: ${props => props.theme?.token?.colorBgBase};
  color: ${props => props.theme?.token?.colorText};
`


export const NodeTitle = memo((props: {
  node: DingFlowNode,
  material?: DingFlowNodeMeta,
  editable?: boolean,
  closable?: boolean,
}) => {
  const { node, material,editable,closable } = props;
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState(node.name)

  const changeNode = useFlowEditorStoreWith(state=>state.changeNode)

  useEffect(() => {
    setInputValue(node.name)
  }, [node.name])

  const changeName = useCallback(() => {
    changeNode({ ...node, name: inputValue })
  }, [inputValue, node])

  const handleNameClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setEditing(true)
  }, [])

  const handleInputClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const handleBlur = useCallback(() => {
    changeName()
    setEditing(false)
  }, [changeName])

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleBlur()
    }
  }, [handleBlur])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])

  return <NodeTitleShell className="node-title" style={{ backgroundColor: material?.color, color: "#fff" }}>
    <NodeIcon>
      <NamedIcon name={material?.icon} />
    </NodeIcon>
    {!editing &&
      <>
        <TitleResponse onClick={editable ? handleNameClick: undefined}>
          <NodeTitleText className="text" >{node.displayName || node.name}</NodeTitleText>
        </TitleResponse>
        {closable && <CloseButton nodeId={node.id} />}
      </>
    }
    {
      editing && <NodeTitleInput
        autoFocus
        value={inputValue}
        onClick={handleInputClick}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
    }
  </NodeTitleShell>
})