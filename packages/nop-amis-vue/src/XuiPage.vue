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
  <xui-debugger v-if="debug" :path="path" :schema="pageSchema" @update:schema="updateSchema" @rebuild="rebuild" />
  <XuiSchemaPage :schema="pageSchema" :registerPage="registerPage" :action="actions" :data="data"/>
</template>

<script lang="ts">
import { PropType, defineComponent, shallowRef, watchEffect } from 'vue';
import type { PageObject, RegisterPage } from '@nop-chaos/nop-core';
import XuiDebugger from './XuiDebugger.vue';
import XuiSchemaPage from './XuiSchemaPage.vue';

import { useDebug,useAdapter } from '@nop-chaos/nop-core'
import { cloneDeep } from 'lodash-es';

/**
 * 在AmisSchemaPage的基础上增加AmisDebugger调试功能，以及根据path动态加载schema的功能
 */
export default defineComponent({
  name: 'amis-page',
  props: {
    path: {
      type:String,
      required:true,
    },
    data: Object,
    config: Object,
    registerPage: Function as PropType<RegisterPage>,
    actions: Object as PropType<Record<string, Function>>
  },

  components: { XuiDebugger, XuiSchemaPage },

  setup(props) {
    const { getPage} = useAdapter()
    
    let pageSchema = shallowRef<any>();

    function registerPage(p: PageObject) {
      props.registerPage?.(p)
    }

    watchEffect(() => {
      getPage(props.path).then(res=>{
        res.__baseUrl = props.path
        updateSchema(res)
      })
    });

    function updateSchema(value: any) {
      pageSchema.value = value;
    }

    function rebuild() {
      pageSchema.value = cloneDeep(pageSchema.value)
    }

    const { debug } = useDebug()

    const actions = {...props.actions}

    return {
      pageSchema,
      updateSchema,
      rebuild,
      registerPage,
      debug,
      actions,
      data: props.data
    };
  },
});
</script>
