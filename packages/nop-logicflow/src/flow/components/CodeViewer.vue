<template>
  <a-modal
    :visible="visible" :footer="null" destroy-on-close wrap-class-name="full-modal"
    style="top:20px;left:20px;width: calc(100% - 40px)" @update:visible="emit('update:visible', $event)"
  >
    <template #title>
      <a-radio-group v-model:value="codeType" button-style="solid" @change="setCode">
        <a-radio-button v-for="(adapter, key) in adapters" :key="key" :value="key">
          {{ adapter.label }}
        </a-radio-button>
        <a-radio-button value="json">
          JSON
        </a-radio-button>
      </a-radio-group>
    </template>
    <highlight autodetect :code="code" />
  </a-modal>
</template>

<style>
.full-modal .ant-modal {
  padding: 0;
  margin: 0;
}

.full-modal .ant-modal-content {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px);
  overflow: hidden;
}

.full-modal .ant-modal-body {
  flex: 1;
  padding: 0;
  overflow: auto;
}

.full-modal pre,
.full-modal pre code.hljs {
  margin: 0;
  padding: 0;
  background-color: transparent;
  overflow: visible;
}
</style>

<script setup lang="ts">
import highlightjs from '@highlightjs/vue-plugin'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/stackoverflow-light.css'
import { ref, watch } from 'vue'
import type { ViewerContext } from '../core'

const props = defineProps<{
  visible: boolean
  graphViewer: ViewerContext
}>()

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
}>()

const viewer = props.graphViewer
const modelType = viewer.modelType
const adapters = modelType.adapters

// codeViewer
hljs.registerLanguage('json', json)
hljs.registerLanguage('xml', xml)
const highlight = highlightjs.component
const code = ref('')
const codeType = ref(adapters?.default ? 'default' : 'json')

const setCode = () => {
  code.value = viewer.getData(codeType.value)
}

watch(() => props.visible, (newVal, oldVal) => {
  if (newVal)
    setCode()
})
</script>
