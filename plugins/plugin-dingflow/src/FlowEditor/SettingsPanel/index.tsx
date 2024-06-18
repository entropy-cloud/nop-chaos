import { CloseOutlined } from "@ant-design/icons"
import { Button, Drawer } from "antd"
import { memo, useCallback } from "react"
import { NodeTitle } from "./NodeTitle"
import { styled } from "styled-components"
import { useFlowEditorStore, useFlowEditorStoreWith } from "../../store"
import { useReactRenderContext } from "@nop-chaos/sdk"
import { cloneDeep } from "lodash-es"


const Content = styled.div`
  display: flex;
  flex-flow: column;
  width:100%;
  height:100%;
`
export const SettingsPanel = memo((props:any) => {
  const selectedId = useFlowEditorStoreWith(state=> state.selectedId)
  const selectNode = useFlowEditorStoreWith(state=> state.selectNode)

  const selectedNode = useFlowEditorStoreWith(state=> state.selectedId? state.getNode(state.selectedId):undefined)

  const renderContext = useReactRenderContext()
  const schema = useFlowEditorStoreWith(state=> selectedNode && state.flowEditorSchema.editForms?.[selectedNode.nodeType])

  const store = useFlowEditorStore()

  const onCancel = useCallback(() => {
    selectNode(undefined)
  }, [selectNode])

  const onOk = useCallback((data:any) => {
    if(selectedNode && data.data){
      store.getState().changeNode(cloneDeep(data.data))
    }
    
    //延迟更新，否则mobx报错
    setTimeout(()=> selectNode(undefined),10)

  }, [selectNode,selectedNode])

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
          onClick={onCancel}
        />
      }
      onClose={onCancel}
      open={!!selectedId}
      bodyStyle={{padding:0}}
    >
      <Content className="settings-panel-content">
       {schema && renderContext?.render('propsForm',schema,{data:selectedNode},{props,store,onOk,onCancel})}
      </Content>
    </Drawer>
  )
})