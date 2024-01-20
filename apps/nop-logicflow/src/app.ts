import type { Component, ComputedOptions, MethodOptions } from 'vue'
import { createApp } from 'vue'
import { message } from 'ant-design-vue'

import bpmn from './flow/models/bpmn'
import bpmnProps from './flow/models/bpmn/propertiesPanel'

message.config({
  duration: 5,
})

function errorHandler(err: any) {
  console.error('app.config.errorHandler', err)
  message.error(err.message || '未知错误，请重试')
}

export default function (rootComponent: Component<any, any, any, ComputedOptions, MethodOptions>): void {
  const app = createApp(rootComponent, {
    model: bpmn,
    propertiesPanelConfig: bpmnProps,
    loadData: () => Promise.resolve(bpmn.newData),
    saveData: (data: any) => {
      
    }
  })
  app.config.errorHandler = errorHandler
  app.mount('#app')
}
