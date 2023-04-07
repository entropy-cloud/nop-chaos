<template>
  <a-layout style="height: 100%; width: 100%; margin: 0; overflow: hidden">
    <a-layout-header
      style="
        background: #fff;
        height: 42px;
        line-height: 32px;
        padding: 5px 10px;
      "
    >
      <AmisPage :schema="toolbar" :handleInvoke="onToolbarInvoke" />
    </a-layout-header>
    <a-layout-content>
      <Splitpanes
        class="default-theme"
        :dbl-click-splitter="false"
        :push-other-panes="false"
        @resized="onResize"
      >
        <Pane
          :size="
            propertiesPanel.collapsed ? 100 - paneSize / 100 : 100 - paneSize
          "
        >
          <div
            ref="container"
            style="
              height: 100%;
              width: 100%;
              padding: 4px;
              box-shadow: 0 0 4px rgb(0 0 0 / 30%) inset;
              background: #fff;
            "
          />
        </Pane>
        <Pane
          v-show="!propertiesPanel.collapsed"
          :size="propertiesPanel.collapsed ? paneSize / 100 : paneSize"
          style="
            padding: 10px;
            background-color: #f8f8f8;
            overflow: hidden auto;
          "
        >
          <keep-alive>
            <component :is="propertiesPanel.component" />
          </keep-alive>
        </Pane>
      </Splitpanes>
    </a-layout-content>
  </a-layout>
</template>

<style>
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
import {
  DndPanel,
  InsertNodeInPolyline,
  Menu,
  MiniMap,
  SelectionSelect,
  Snapshot,
} from '@logicflow/extension'
import '@logicflow/extension/lib/style/index.css'

import type { PropertiesPanelConfig, ModelType } from '@nop-chaos/nop-logicflow'
import { useModeler } from '@nop-chaos/nop-logicflow'
import { Pane, Splitpanes } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { onMounted, provide, ref } from 'vue'

import { ajaxRequest } from '/@/nop/core'
import { loadModel} from './designer-utils'
import AmisPage from '/@nop/amis/AmisPage.vue'

const container = ref<HTMLElement>()
const paneSize = ref(30)

const props = defineProps<{
    modelLibUrl: {
        type: String,
        required: true,
    },

    loadDataUrl: {
        type: String,
        required: true,
    },

    saveDataUrl: {
        type: String,
        required: true,
    },
}>()


const {toolbar, model, propertiesPanelConfig }  = await loadModel(props.modelLibUrl);

// Modeler
const _logicflowOptions = {
  adjustEdgeStartAndEnd: true,
  // nodeTextDraggable: true,
  edgeTextDraggable: true,
  multipleSelectKey: 'meta',
  grid: {
    size: 5, // 栅格
    visible: false, // 是否可见，false则隐藏网格线但是保留栅格效果
  },
  style: {
    nodeText: {
      overflowMode: 'autoWrap',
    },
  },
  keyboard: {
    enabled: true,
  },
  plugins: [
    DndPanel,
    InsertNodeInPolyline,
    Menu,
    MiniMap,
    SelectionSelect,
    Snapshot,
  ],
}
const modeler = useModeler(
  model,
  propertiesPanelConfig,
  container,
  _logicflowOptions
)
const { propertiesPanel } = modeler

async function onResize(e: any) {
  if (!container.value || !modeler.lf) return
  // console.log('onResize', e, modeler.lf.graphModel.width)
  if (e[1] && e[1].size) {
    const size = e[1].size
    propertiesPanel.collapsed = size < 5
    paneSize.value = size
  }
}

// provide context
provide('modeler_context', modeler)

const promise = ajaxRequest({
    method: 'post',
    url: props.loadDataUrl
})

// init
onMounted(() => {
  // 加载数据
  promise.then(value=> modeler.setDataObject(value))
})
</script>