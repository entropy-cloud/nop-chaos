<template>
  <div>
    <h1>
      <img :src="userTaskIcon">
      用户任务
    </h1>
    <a-tabs>
      <a-tab-pane key="general" tab="常规">
        <a-form layout="vertical" class="properties-panel-form" :model="data" name="ppform">
          <a-form-item label="编号">
            <a-input v-model:value="data.id" />
          </a-form-item>
          <a-form-item label="名称" name="text">
            <a-textarea v-model:value="data.text" auto-size />
          </a-form-item>
          <a-form-item label="描述" name="description">
            <a-textarea v-model:value="data.properties.discription" auto-size />
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="extensions" tab="扩展">
        <a-form layout="vertical" class="properties-panel-form" :model="data" name="propsform">
          <a-form-item label="扩展属性" name="properties">
            <properties-editor :value="data.properties" />
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { usePropertiesPanelData } from '../../../core'
import bpmnModel from '../index'
import './style.css'

const userTaskIcon = bpmnModel.nodeTypes.find(node => node.type === 'bpmn:userTask')?.icon
const data = usePropertiesPanelData()
</script>
