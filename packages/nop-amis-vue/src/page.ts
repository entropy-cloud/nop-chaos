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
import { Ref, ref } from "@vue/reactivity";
import { fetcherConfig } from "amis-core/lib/factory";
import { fetcherResult } from "amis/lib/types";
import { Store } from "pinia";
import { Component } from "react";
import { createRoot } from 'react-dom/client'
import { Router } from "vue-router";
import { ajaxFetch, ajaxRequest, FetcherRequest, FetcherResult, router, store } from '../core'

import type { RootRenderProps } from 'amis-core/lib/Root';
import type { Schema } from 'amis/lib/types';
import type { IRendererStore, IIRendererStore, FormRenderer, IScopedContext, RenderOptions } from 'amis'
import type { ScopedComponentType } from 'amis-core/lib/Scoped';

import { clearStoresCache, render as renderAmis, setDefaultLocale } from 'amis';
import { createEnv } from './createEnv';
import { currentLocale } from '../core';
import { collectActions } from './action';

import { fetchPage, importModule } from '../api';
import { transformPageJson } from "./transform";

/**
 * scoped对应当前amis的scope。只有page/crud/service/form/等少数组件才具有scope
 */
export type PageAction = (options: fetcherConfig, page: PageObject, scoped: IScopedContext) => Promise<fetcherResult>

export type OnOkCallback = (value?: any) => Promise<boolean | void> | boolean | void
export type OnCancelCallback = () => void
export type OnChangeCallback = (value: any) => void
export type OnInvokeCallback = (action: string, options: fetcherConfig,
  page: PageObject, scoped: IScopedContext) => Promise<fetcherResult>|void

export type RegisterPage = (page:PageObject)=> void  

/**
 * 在action函数中可以访问到的页面对象，包括router, amis的store和pinia store等
 */
export type PageObject = {
  id: string,
  path?: string,
  data: any;

  env?: RenderOptions,

  ajaxRequest: (req: FetcherRequest) => Promise<any>

  ajaxFetch: (req: FetcherRequest) => Promise<FetcherResult>

  require: (path: string) => Promise<any>

  domRef: Ref<HTMLElement | undefined>,
  amisScoped?: IScopedContext,
  reactRoot: any
  vueComp: any,

  actions: Record<string, any>,

  router: Router,
  loading: Ref<boolean>,

  // 点击对话框确认按钮时回调此函数，如果返回false，则不允许关闭对话框
  handleOk?: OnOkCallback
  handleCancel?: OnCancelCallback
  handleChange?: OnChangeCallback
  handleInvoke?: OnInvokeCallback

  getRoot(): ScopedComponentType | undefined

  /**
   * 假设页面中只有一个form，获取到该form对象
   */
  getForm(): FormRenderer | undefined

  /**
   * 获取amis的component
   */
  getComponent(name: string): Component | undefined

  /**
   * 获取Amis的store对象
   */
  getRootStore(): IRendererStore

  getComponentStore(name: string): IIRendererStore

  /**
   * 从全局的pinia store中按名称获取到对应的Store对象
   * @param name  store的唯一id
   */
  getVueStore(name: string): Store

  destroy()

  renderPage(schema: any)
};

let g_nextIndex = 0;

export function createPage(comp: any): PageObject {
  let page: PageObject = {
    id: 'page_' + String(g_nextIndex++),
    amisScoped: undefined,
    domRef: ref<HTMLElement>(),
    path: undefined,
    vueComp: comp,
    reactRoot: null,
    router,
    loading: ref(false),
    data: {},
    actions: {},
    ajaxRequest: ajaxRequest,
    ajaxFetch: ajaxFetch,

    require(path: string) {
      return importModule(path)
    },

    getRoot: get_root,
    getComponent: get_component,

    getComponentStore(name: string) {
      return get_component(name)?.props.store
    },

    getForm: get_form,

    getRootStore() {
      return get_root()?.context.store
    },

    getVueStore(name: string) {
      return (store as any)._s.get(name)
    },

    destroy() {
      destroyPage(page, page.reactRoot)
    },

    renderPage(schema: any) {
      if (page.reactRoot) {
        page.reactRoot.unmount();
        page.reactRoot = undefined
      }

      if (!page.domRef.value)
        return

      page.reactRoot = createRoot(page.domRef.value);
      renderPage(page, schema);
    }
  };

  function get_root() {
    return page.amisScoped?.getComponents()[0];
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

  return page
}


function destroyPage(page: PageObject, reactRoot: any) {
  reactRoot && reactRoot.unmount();
  clearStoresCache(page.id);
}

export function isPageUrl(url: string) {
  let pos = url.indexOf('?')
  if (pos > 0)
    url = url.substring(0, pos)

  return url.endsWith(".page.json5") || url.endsWith(".page.yaml") || url.endsWith(".page.json")
}

export function fetchPageAndTransform(path: string) {
  return fetchPage(path).then(page=> transformPageJson(path,page));
}

async function renderPage(page: PageObject, schema: Schema) {
  page.actions = {}
  await collectActions(schema.__baseUrl || page.path, schema, '', '', page.actions);

  clearStoresCache(page.id);
  let env = createEnv(page);

  let opts: RootRenderProps = {
    data: page.data,
    onConfirm: page.handleOk || function(){},
    onClose: function(b){
      if(b){
        page.handleOk?.()
      }else{
        page.handleCancel?.()
      }
    },
    scopeRef: scoped => { page.amisScoped = scoped },
    locale: currentLocale.value, // amis内部会自动替换zh_CN为zh-CN
    theme: 'cxd'
  };

  setDefaultLocale(opts.locale);
  const vdom = renderAmis(schema, opts, env);

  // render返回undefined
  page.reactRoot.render(vdom as any);
}