import { CloseOutlined } from "@ant-design/icons"
import { Button, Drawer } from "antd"
import { memo, useCallback } from "react"
import { NodeTitle } from "./NodeTitle"
import { Footer } from "./Footer"
import { styled } from "styled-components"
import { useFlowEditorStoreWith } from "../../store"


const Content = styled.div`
  display: flex;
  flex-flow: column;
`
export const SettingsPanel = memo(() => {
  const selectedId = useFlowEditorStoreWith(state=> state.selectedId)
  const selectNode = useFlowEditorStoreWith(state=> state.selectNode)

  const selectedNode = useFlowEditorStoreWith(state=> state.getNode(state.selectedId))

  const handelClose = useCallback(() => {
    selectNode(undefined)
  }, [selectNode])

  const handleConfirm = useCallback(() => {
    selectNode(undefined)
  }, [selectNode])

  const handleNameChange = useCallback((name?: string) => {

  }, [])

  const handleSettingsChange = useCallback((value: any) => {

  }, [])
  return (
    <Drawer
      title={selectedNode &&
        <NodeTitle
          node={selectedNode}
          onNameChange={handleNameChange}
        />
      }
      placement="right"
      width={656}
      closable={false}
      extra={
        <Button
          size="small"
          type="text"
          icon={<CloseOutlined />}
          onClick={handelClose}
        />
      }
      footer={
        <Footer
          onConfirm={handleConfirm}
          onCancel={handelClose}
        />
      }
      onClose={handelClose}
      open={!!selectedId}
    >
      <Content className="settings-panel-content">
       
      </Content>
    </Drawer>
  )
})