<template>
  <a-layout style="height: 100%; width: 100%; margin: 0; overflow: hidden">
    <a-layout-header style="background: #fff; height: 42px;line-height: 32px; padding: 5px 10px">
      <Toolbar />
    </a-layout-header>
    <a-layout-content>
      <div
        ref="container"
        style="height: 100%; width: 100%;padding: 4px;box-shadow: 0 0 4px rgb(0 0 0 / 30%) inset; background: #fff"
      />
    </a-layout-content>
  </a-layout>
</template>

<style>
.ant-layout-sider-children {
  padding: 10px;
}

.lf-mini-map {
  padding-top: 0;
  right: 5px;
  bottom: 5px;
  height: 120px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 30%);
  background-color: rgba(255, 255, 255, 0.8);
}

.lf-mini-map-header,
.lf-mini-map-close {
  visibility: hidden;
}

.lf-mini-map .lf-graph {
  background: none;
}
</style>

<script setup lang="ts">
import '@logicflow/core/dist/style/index.css'
import { MiniMap } from '@logicflow/extension'
import '@logicflow/extension/lib/style/index.css'
import 'highlight.js/styles/stackoverflow-light.css'
import { useViewer } from '../core'
import { onMounted, provide, ref } from 'vue'
import Toolbar from './toolbar.vue'
import type { PropertiesPanelConfig, ModelType } from '../core'

const props = defineProps<{
  model: ModelType
  propertiesPanelConfig: PropertiesPanelConfig
  loadData: () => Promise<any>
  saveData: (data: any) => any
}>()


// Viewer
const container = ref<HTMLElement>()
const _logicflowOptions = {
  plugins: [
    MiniMap,
  ],
}
const viewer = useViewer(props.model, container, _logicflowOptions)

// provide context
provide('viewer_context', viewer)

// init
const promise = props.loadData()

// init
onMounted(() => {
  // 加载数据
  promise.then(value=> viewer.setDataObject(value))
})
</script>
