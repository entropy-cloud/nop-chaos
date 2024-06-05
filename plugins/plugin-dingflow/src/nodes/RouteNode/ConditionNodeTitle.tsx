import { memo, useCallback, useEffect, useState } from "react"
import { styled } from "styled-components"
import { ConditionButtons } from "./ConditionButtons"
import { ConditionPriority } from "./ConditionPriority"
import { NodeTitleInput, TitleResponse } from "../NodeTitle"
import { DingFlowBranchNode, DingFlowRouteNode, useFlowEditorStoreWith } from "../../store"
import { useTranslate } from "@nop-chaos/sdk"

const TitleWrapper = styled.div`
  position: relative;
  font-size: 12px;
  color: ${props => props.theme?.token?.colorTextSecondary};
  text-align: left;
  line-height: 16px;
  display: flex;
  user-select: none;
`

export const TitleText = styled.div`
  border: solid transparent 1px;
  &:hover{
    line-height: 16px;
    border-bottom: dashed 1px ${props => props.theme.token?.colorTextSecondary};
  }
  user-select: none;
`

export const ConditionNodeTitle = memo((
  props: {
    node: DingFlowBranchNode,
    parent: DingFlowRouteNode,
    index: number,
  }
) => {
  const { node, parent, index } = props
  const [editting, setEditting] = useState(false)
  const [inputValue, setInputValue] = useState(node.name)


  useEffect(() => {
    setInputValue(node.name)
  }, [node.name])


  const t = useTranslate()
  const [changeNode] = useFlowEditorStoreWith(state=>[state.changeNode])

  const changeName = useCallback(() => {
      changeNode({ ...node, name: inputValue })
  }, [inputValue, node, parent])

  const handleNameClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setEditting(true)
  }, [])

  const handleInputClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const handleBlur = useCallback(() => {
    changeName()
    setEditting(false)
  }, [changeName])

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleBlur()
    }
  }, [handleBlur])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])

  return (
    <TitleWrapper>
      {
        !editting && <>
          <TitleResponse onClick={handleNameClick}>
            <TitleText>
              {node.name || t("condition")}
            </TitleText>
          </TitleResponse>
          <ConditionButtons parent={parent} node={node} />
        </>
      }
      {
        editting && <NodeTitleInput
          autoFocus
          value={inputValue}
          onClick={handleInputClick}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      }
      {!editting && <ConditionPriority index={index} />}
    </TitleWrapper>
  )
})