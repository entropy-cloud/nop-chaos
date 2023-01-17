<template>
  <a-space>
    <a-button-group>
      <a-button disabled>
        <template #icon>
          <file-outlined />
        </template>
      </a-button>
      <a-button disabled>
        <template #icon>
          <folder-open-outlined />
        </template>
      </a-button>
      <a-dropdown :trigger="['click']">
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="(adapter, key) in adapters" :key="key">
              导入 {{ adapter.label }} 文件（*.{{ adapter.extension }}）
            </a-menu-item>
            <a-menu-item key="json">
              导入 JSON 文件（*.json）
            </a-menu-item>
          </a-menu>
        </template>
        <a-tooltip title="导入">
          <a-button id="import">
            <template #icon>
              <import-outlined />
            </template>
          </a-button>
        </a-tooltip>
      </a-dropdown>
      <a-dropdown :trigger="['click']">
        <template #overlay>
          <a-menu>
            <a-menu-item
              v-for="(adapter, key) in adapters" :key="key"
              @click="exportData(`${modelType.name}.${adapter.extension}`, key)"
            >
              导出 {{ adapter.label }} 文件（*.{{ adapter.extension }}）
            </a-menu-item>
            <a-menu-item key="json" @click="exportData(`${modelType.name}.json`, 'json')">
              导出 JSON 文件（*.json）
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="png" @click="exportPng(modelType.name)">
              导出图像文件 （*.png）
            </a-menu-item>
          </a-menu>
        </template>
        <a-tooltip title="导出">
          <a-button id="export">
            <template #icon>
              <export-outlined />
            </template>
          </a-button>
        </a-tooltip>
      </a-dropdown>
    </a-button-group>
    <a-button-group>
      <a-button :disabled="!modified" type="primary">
        保存
        <template #icon>
          <save-outlined />
        </template>
      </a-button>
    </a-button-group>
    <a-button-group>
      <a-button :disabled="undoDisable" @click="undo">
        <template #icon>
          <undo-outlined />
        </template>
      </a-button>
      <a-button :disabled="redoDisable" @click="redo">
        <template #icon>
          <redo-outlined />
        </template>
      </a-button>
    </a-button-group>
    <a-button-group>
      <a-button @click="zoomOut">
        <template #icon>
          <zoom-out-outlined />
        </template>
      </a-button>
      <a-tooltip title="点击此处，恢复原始大小和位置">
        <a-button style="padding: 4px" @click="resetZoom">
          {{ scale.percentage }}
        </a-button>
      </a-tooltip>
      <a-button @click="zoomIn">
        <template #icon>
          <zoom-in-outlined />
        </template>
      </a-button>
      <a-tooltip title="自适应大小">
        <a-button id="fitView" @click="fitView(100)">
          <template #icon>
            <Icon>
              <template #component>
                <svg className="icon" viewBox="0 0 1024 1024" width="1em" height="1em">
                  <path
                    d="M144 112h232a8 8 0 0 1 8 8v48a8 8 0 0 1-8 8H221.255l216.716 216.716a8 8 0 0 1 0 11.313l-33.942 33.942a8 8 0 0 1-11.313 0L176 221.255V376a8 8 0 0 1-8 8h-48a8 8 0 0 1-8-8V144c0-17.673 14.327-32 32-32z m-32 536v232c0 17.673 14.327 32 32 32h232a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H221.884l215.901-215.901a8 8 0 0 0 0-11.314l-33.941-33.941a8 8 0 0 0-11.314 0L176 803.374V648a8 8 0 0 0-8-8h-48a8 8 0 0 0-8 8z m690.744 200L586.529 631.785a7.999 7.999 0 0 1 0-11.314l33.941-33.941a8 8 0 0 1 11.314 0L848 802.747V648a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v232c0 17.673-14.327 32-32 32H648a8 8 0 0 1-8-8v-48a8 8 0 0 1 8-8h154.744zM912 376V144c0-17.673-14.327-32-32-32H648a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h155.373l-217.03 217.029a8 8 0 0 0 0 11.314l33.941 33.941a8 8 0 0 0 11.314 0L848 221.882V376a8 8 0 0 0 8 8h48a8 8 0 0 0 8-8z"
                  />
                </svg>
              </template>
            </Icon>
          </template>
        </a-button>
      </a-tooltip>
    </a-button-group>
    <a-button-group>
      <a-tooltip title="显示/隐藏 缩略图导航">
        <a-button :type="showMiniMap ? 'primary' : 'default'" @click="toggleMiniMap()">
          <template #icon>
            <fund-view-outlined />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip title="显示/隐藏 属性面板">
        <a-button
          :disabled="propertiesPanel.disabled" :type="propertiesPanel.collapsed ? 'default' : 'primary'"
          @click="propertiesPanel.toggleCollapsed"
        >
          <template #icon>
            <control-outlined />
          </template>
        </a-button>
      </a-tooltip>
      <a-button disabled>
        <template #icon>
          <setting-outlined />
        </template>
      </a-button>
      <a-tooltip title="查看代码">
        <a-button :type="codeViewerVisible ? 'primary' : 'default'" @click="codeViewerVisible = true">
          <template #icon>
            <Icon>
              <template #component>
                <svg className="icon" viewBox="100 100 820 820" width="1em" height="1em">
                  <path
                    d="M541.141333 268.864l61.717334 16.938667-132.394667 482.474666-61.717333-16.938666 132.394666-482.474667zM329.002667 298.666667l44.885333 45.610666-175.36 172.586667 175.04 167.573333-44.266667 46.229334L106.666667 517.504 329.002667 298.666667z m355.882666 0l222.336 218.837333L684.586667 730.666667l-44.266667-46.229334 175.018667-167.573333L640 344.277333 684.885333 298.666667z"
                  />
                </svg>
              </template>
            </Icon>
          </template>
        </a-button>
      </a-tooltip>
    </a-button-group>
  </a-space>
  <code-viewer v-model:visible="codeViewerVisible" :graph-viewer="modelerContext" />
</template>

<script setup lang="ts">
import Icon from '@ant-design/icons-vue'
import type { ModelerContext } from '../core'
import { inject, ref } from 'vue'
import CodeViewer from '../components/CodeViewer.vue'

const modelerContext: ModelerContext = inject<any>('modeler_context')
const {
  exportPng, exportData, modelType,
  showMiniMap, toggleMiniMap, scale, zoomOut, zoomIn, resetZoom, fitView,
  modified, undoDisable, redoDisable, undo, redo, propertiesPanel,
} = modelerContext

const adapters = modelerContext.modelType.adapters

const codeViewerVisible = ref(false)
</script>
