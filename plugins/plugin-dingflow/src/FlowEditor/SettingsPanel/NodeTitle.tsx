import { memo } from "react"
import { styled } from "styled-components"
import { NodeTitleEditor } from "./NodeTitleEditor"
import { useTranslate } from "@nop-chaos/sdk"

const Title = styled.div`
  font-weight: normal;
`

export const TitleText = styled.span`
  margin-right: 8px;
`

export const NodeTitle = memo((
  props: {
    node: DingFlowNode
    onNameChange: (value?: string) => void
  }
) => {
  const { node, onNameChange } = props

  const t = useTranslate()

  return (
    <Title>
      {
        node.nodeType === 'start'
          ? <TitleText className="title-text">{t("promoter")}</TitleText>
          : <NodeTitleEditor value={node.name} onChange={onNameChange} />
      }

    </Title>
  )
})