
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
import { PageObject, bindActions, useAdapter,transformPageJson } from '@nop-chaos/nop-core';
import { clearStoresCache, render as renderAmis, setDefaultLocale } from 'amis';
import { RootRenderProps } from 'amis-core/lib/Root';
import { createEnv } from './env';
import { defineReactPageComponent } from './react-adapter';

export default defineReactPageComponent((props: {actions?: Record<string,Function>})=>{
  let amisScoped:any

  return {
    actions: props.actions,
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

    onDestroyPage(page: PageObject) {
      clearStoresCache(page.id);
    },

    async onRenderPage(schema: any, data: any, page: PageObject) {
      let env = createEnv(page);
      const locale = useAdapter().useLocale()
      let opts: RootRenderProps = {
        data: data,
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
      schema = await transformPageJson(schema.__baseUrl, schema);
      await bindActions(schema.__baseUrl, schema, page)
      return renderAmis(schema, opts, env);
    }
  }

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

  // function get_form() {
  //   let root = get_root()
  //   let comps = root?.context.getComponents()
  //   for (let i = 0, n = comps.length; i < n; i++) {
  //     if (comps[i].props.type == 'form')
  //       return comps[i]
  //   }
  //   return null
  // }

})