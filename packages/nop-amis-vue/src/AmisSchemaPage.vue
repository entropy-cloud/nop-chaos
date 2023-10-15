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
import { PropType, defineComponent, onBeforeUnmount, ref, watchEffect } from 'vue';
import type { RegisterPage } from '@nop-chaos/nop-core';
import { bindActions, createPage,  useAdapter } from '@nop-chaos/nop-core';
import { clearStoresCache, setDefaultLocale } from 'amis';
import { RootRenderProps } from 'amis-core/lib/Root';
import { render as renderAmis } from 'amis'
import { createEnv } from './env'
import {createRoot} from 'react-dom/client'
import {cloneDeep} from 'lodash-es'


/**
 * 嵌入到vue中的amis页面。每个AmisSchemaPage都对应一个ReactRooot。schema发生变化时会重新创建react组件
 */
export default defineComponent({
  props: {
    schema: Object,
    data: Object,
    registerPage: Function as PropType<RegisterPage>,
    actions: Object as PropType<Record<string, Function>>
  },

  setup(props) {

    const domRef = ref<HTMLElement>()
    let root: any;
    let amisScoped: any;

    let page = createPage({
      getComponent(name: string) {
        return get_component(name)
      },

      getScopedStore(name: string) {
        return get_component(name)?.props?.store
      },

      getState(name: string) {
        return get_root_store().get(name)
      },

      setState(name: string, value: any) {
        get_root_store().set(name, value)
      },

      actions: props.actions
    });

    props.registerPage?.(page)

    function get_root() {
      return amisScoped?.getComponents()[0];
    }

    function get_root_store() {
      return get_root()?.context.store
    }

    function get_component(name: string) {
      if (name[0] == "#") {
        let pos = name.indexOf(".");
        if (pos < 0) {
          return get_root()?.context.getComponentById(name.substring(1));
        } else {
          return get_root()
            ?.context.getComponentById(name.substring(1))
            .getComponentByName(name.substring(pos + 1));
        }
      } else {
        return get_root()?.context.getComponentByName(name);
      }
    }

    function get_form() {
      let root = get_root()
      let comps = root?.context.getComponents()
      for (let i = 0, n = comps.length; i < n; i++) {
        if (comps[i].props.type == 'form')
          return comps[i]
      }
      return null
    }

    function destroyPage() {
      root?.unmount();
      clearStoresCache(page.id);
    }

    async function renderPage() {
      let env = createEnv(page);
      const locale = useAdapter().useLocale()
      let opts: RootRenderProps = {
        data: props.data,
        onConfirm: page.getAction('ok') || function () { },
        onClose: function (b) {
          if (b) {
            page.getAction('ok')?.()
          } else {
            page.getAction('cancel')?.()
          }
        },
        scopeRef: scoped => { amisScoped = scoped },
        locale: locale, // amis内部会自动替换zh_CN为zh-CN
        theme: 'cxd'
      };

      setDefaultLocale(locale);
      const schema = cloneDeep(props.schema as any)
      await bindActions(schema.__baseUrl, schema, page)
      const vdom = renderAmis(schema, opts, env);
      // render返回undefined
      root = createRoot(domRef.value!);
      root.render(vdom as any);
    }

    watchEffect(() => {
      destroyPage()
      if (props.schema && domRef.value) {
        renderPage();
      }
    });

    onBeforeUnmount(() => {
      if (root) {
        root.unmount();
        root = undefined;
      }
    });

    return {
      domRef,
    };
  },
});
</script>
