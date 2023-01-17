<template>
  <h1>连线</h1>
  <a-form layout="vertical" class="properties-panel-form" :model="data" name="ppform">
    <a-form-item label="编号" extra="唯一标识">
      <a-input v-model:value="data.id" />
    </a-form-item>
    <a-form-item label="名称" name="text">
      <a-textarea v-model:value="data.text" auto-size />
    </a-form-item>
    <a-form-item label="描述" name="description">
      <a-textarea v-model:value="data.properties.description" auto-size />
    </a-form-item>
    <a-form-item label="扩展属性" name="properties">
      <properties-editor :value="data.properties" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { usePropertiesPanelData } from '../../../core'
import './style.css'
const data = usePropertiesPanelData()
</script>
