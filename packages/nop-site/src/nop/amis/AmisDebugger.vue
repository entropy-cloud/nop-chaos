<!--
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
-->
<template>
  <span class="my4 amis-debugger">
    <a-button type="primary" shape="circle" title="Schema Json Editor" @click="openSchemaEditor">S</a-button>
    <a-button type="primary" shape="circle" title="Amis Visual Designer" v-if="path"
       danger @click="openAmisEditor">V</a-button>
    <!-- <a-button type="primary" shape="circle" @click="testDialog" >T</a-button> -->
  </span>
  <!-- <BasicDrawer title="Page Schema" width="50%" @register="register" showFooter @ok="handleOk">
    <CodeEditor :value="schemaValue" @update:value="updateValue" mode="application/json" />
  </BasicDrawer> -->
  <!-- <BasicModal title="Page Schema" @register="register" @ok="handleOk">
    <template #default>
      <CodeEditor :value="schemaValue" @update:value="updateValue" mode="application/json" />
    </template>

    <template #insertFooter>
      <a-button type="primary" danger @click="rebuild" >Rebuild</a-button>
    </template>
  </BasicModal> -->

  <BasicModal
    title="Page Schema"
    @register="register"
    width="600px"
    :height="500"
    :center="true"
    class="debug-modal"
    :mask="false"
    :maskClosable="false"
    :footer="null"
    destroyOnClose
  >
    <AmisSchemaPage
      :schema="debuggerSchema"
      :handleOk="handleOk"
      :data="schemaData"
      :handleInvoke="handleInvoke"
      :handleCancel="handleCancel"
      :handleChange="handleChange"
    />
  </BasicModal>

  <!--
    a-model无法移动位置
    -->
  <a-modal
    :title="null"
    :destroyOnClose="true"
    v-model:visible="designerVisible"
    :maskClosable="false"
    width="100%"
    wrap-class-name="full-modal"
    :footer="null"
    :closable="false" :keyboard="false"
  >
    <AmisEditor :path="path" @exit="handleEditorExit" />
  </a-modal>
</template>

<style lang="less">
.debug-modal .scroll-container {
  padding: 0;
}

.amis-debugger {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 100;
}

.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>

<script lang="ts" setup>
import { shallowRef, ref } from 'vue';
//import { useDrawer, BasicDrawer } from '/@/components/Drawer';
//import { CodeEditor } from '/@/components/CodeEditor';
import { BasicModal, useModal } from '/@/components/Modal';

import AmisSchemaPage from './AmisSchemaPage.vue';
import debuggerSchema from './debugger.json';
import yaml from 'js-yaml';

import AmisEditor from './AmisEditor.vue';
import { showDialog } from './dialog';

//import { useMessage } from '/@/hooks/web/useMessage';

const props = defineProps({
  path: String,
  schema: Object,
});

const emit = defineEmits(['update:schema', 'rebuild']);

function handleChange(data: any) {
  let json = schemaData.value.lang == 'yaml' ? yaml.load(data.schema) : JSON.parse(data.schema);
  emit('update:schema', json);
  //schemaData.value = { schema: data.schema, lang: schemaData.value.lang };
}

//const [register, { openDrawer, closeDrawer }] = useDrawer();
const [register, { openModal, closeModal }] = useModal();

// const visible = ref<boolean>(false);
const schemaData = shallowRef({
  schema: '',
  lang: 'json',
});

function openSchemaEditor() {
  schemaData.value = { schema: yaml.dump(props.schema), lang: 'yaml' };
  openModal();
}

//const {createMessage} = useMessage()

function handleOk(data: any) {
  handleChange(data);
  closeModal();
}

function handleInvoke(action: string, options: any) {
  if (action == 'rebuild') {
    emit('rebuild');
  } else if (action == 'toggleYaml') {
    let schema = options.data.schema;
    if (options.data.lang == 'yaml') {
      schemaData.value = { lang: 'json', schema: JSON.stringify(yaml.load(schema), null, '  ') };
    } else {
      schemaData.value = { lang: 'yaml', schema: yaml.dump(JSON.parse(schema)) };
    }
  }
}

function handleCancel() {
  closeModal();
}

const designerVisible = ref(false);

function openAmisEditor() {
  designerVisible.value = true;
}

function handleEditorExit() {
  designerVisible.value = false;
}

function testDialog(){
  showDialog({
    schema: {
      type:'dialog',
      body:{
        type: "static",
        body: "xxx"
      }
    },
    onOk(){
      alert('ok')
    },
    onCancel(){
      alert('cancel')
    }
  })
}

</script>
