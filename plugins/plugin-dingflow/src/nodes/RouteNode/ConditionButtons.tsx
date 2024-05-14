import { useCallback } from "react"
import { CloseOutlined } from "@ant-design/icons"
import { styled } from "styled-components"
import { Button, Tooltip } from "antd"
import { copyIcon } from "../../icons"
import { useTranslate } from "@nop-chaos/sdk"
import { DingFlowRouteNode,DingFlowBranchNode, useFlowEditorStoreWith } from "../../store"

const Container = styled.div`
  position: absolute;
  right: -4px;
  top: -4px;
  display: flex;
  opacity: 0.7;
  font-size: 11px;
`

export const ConditionButtons = ((
  props: {
    parent: DingFlowRouteNode,
    node: DingFlowBranchNode,
  }
) => {
  const { parent, node } = props
  const t = useTranslate()
  const [removeNode,cloneCondition] = useFlowEditorStoreWith(state=> [state.removeNode,state.cloneCondition])

  const handleClose = useCallback(() => {
    node.id && removeNode(node.id)
  }, [node.id, parent])

  const handleClone = useCallback(() => {
    cloneCondition(parent, node)
  }, [node, parent])

  return (
    <Container className="mini-bar">
      <Tooltip placement="topRight" title={t("copyCodition")} arrow>
        <Button
          type="text"
          size="small"
          shape="circle"
          icon={copyIcon}
          onClick={handleClone}
        />
      </Tooltip>
      <Button
        type="text"
        size="small"
        shape="circle"
        icon={<CloseOutlined style={{ fontSize: 11 }} />}
        onClick={handleClose}
      />
    </Container>
  )
})