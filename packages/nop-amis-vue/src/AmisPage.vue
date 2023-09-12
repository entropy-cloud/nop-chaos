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
  <amis-debugger v-if="debug" :path="path"
    :schema="pageSchema" @update:schema="updateSchema" @rebuild="rebuild" />
  <AmisSchemaPage :schema="pageSchema" :registerPage="registerPage"
   :handleCancel="handleCancel" :handleOk="handleOk"
   :handleChange="handleChange" :handleInvoke="handleInvoke"/>
</template>

<script lang="ts">
  import { defineComponent, shallowRef, watchEffect } from '@vue/runtime-core';
  import type { Schema } from 'amis/lib/types';
  import { fetchPageAndTransform, OnCancelCallback, OnChangeCallback, OnInvokeCallback, OnOkCallback } from './page';
  import type { PageObject, RegisterPage } from './page';
  import AmisDebugger from './AmisDebugger.vue';
  import AmisSchemaPage from './AmisSchemaPage.vue';

  import {useDebug} from '/@/nop/core/debug'

  /**
   * 在AmisSchemaPage的基础上增加AmisDebugger调试功能，以及根据path动态加载schema的功能
   */
  export default defineComponent({
    name: 'amis-page',
    props: {
      path: String,
      schema: Object as PropType<Schema>,
      data: Object,
      config: Object,
      registerPage: Function as PropType<RegisterPage>,
      handleOk: Function as PropType<OnOkCallback>,
      handleCancel: Function as PropType<OnCancelCallback>,
      handleChange: Function as PropType<OnChangeCallback>,
      handleInvoke: Function as PropType<OnInvokeCallback>,
    },

    components: { AmisDebugger, AmisSchemaPage },

    setup(props) {
      let pageSchema = shallowRef<Schema>();

      let page: PageObject |undefined;

      function registerPage(p:PageObject){
          page = p;
          page.path = props.path
          props.registerPage?.(p)
      }

      watchEffect(() => {
        if (props.path) {
          fetchPageAndTransform(props.path)
            .then((result: any) => {
              updateSchema(result);
            })
        }else if (props.schema) {
          updateSchema(props.schema);
        }
      });

      function updateSchema(value: any) {
        pageSchema.value = value;
      }

      function rebuild() {
        page!.renderPage(pageSchema.value);
      }

      const {debug} = useDebug()

      return {
        pageSchema,
        updateSchema,
        rebuild,
        registerPage,
        debug
      };
    },
  });
</script>
