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
  <div ref="domRef" style="width: 100%; height: 100%" class="amis"></div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, watchEffect } from 'vue';
import type { RegisterPage } from './page';
import { createPage, OnCancelCallback, OnChangeCallback, OnInvokeCallback, OnOkCallback } from './page';

/**
 * 嵌入到vue中的amis页面。每个AmisSchemaPage都对应一个ReactRooot。schema发生变化时会重新创建react组件
 */
export default defineComponent({
  props: {
    schema: Object,
    data: Object,
    registerPage: Function as PropType<RegisterPage>,
    handleOk: Function as PropType<OnOkCallback>,
    handleCancel: Function as PropType<OnCancelCallback>,
    handleChange: Function as PropType<OnChangeCallback>,
    handleInvoke: Function as PropType<OnInvokeCallback>,
  },

  emits: ['update:schema'],

  setup(props) {
    let page = createPage(this);
    props.registerPage?.(page)

    page.handleOk = props.handleOk;
    page.handleCancel = props.handleCancel;
    page.handleChange = props.handleChange;
    page.handleInvoke = props.handleInvoke;

    watchEffect(() => {
      page.data = props.data;
      if (props.schema && page.domRef.value) {
        page.renderPage(props.schema);
      }
    });

    onBeforeUnmount(() => {
      page.destroy();
    });

    return {
      domRef: page.domRef,
    };
  },
});
</script>
