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

import { BasePage, FetcherRequest, FetcherResult } from '../core'

/**
 * scoped对应当前amis的scope。只有page/crud/service/form/等少数组件才具有scope
 */
export type PageAction = (page: PageObject, scoped: any, options: FetcherRequest) => Promise<FetcherResult>

export type OnOkCallback = (value?: any) => Promise<boolean | void> | boolean | void
export type OnCancelCallback = () => void
export type OnChangeCallback = (value: any) => void

export type RegisterPage = (page: PageObject) => void

/**
 * 在action函数中可以访问到的页面对象，包括router, amis的store和pinia store等
 */
export type PageObject = BasePage & {
  id: string,

  getScopedStore(name: string): any

  getComponent(name:string):any

  getState(name:string):any

  setState(name:string, value:any)
};

export type PageOptions = {

  /**
   * 获取amis的component
   */
  getComponent(name: string): any

  getScopedStore(name: string): any

  getState(name:string):any

  setState(name:string, value:any)

  actions?: Record<string,Function>
}

let g_nextIndex = 0;

export function createPage(options: PageOptions,): PageObject {
  let actions: Record<string, Function> = {...options.actions}

  let page: PageObject = {
    id: 'page_' + String(g_nextIndex++),

    getAction(name: string) {
      return actions[name]
    },

    registerAction(name: string, fn: Function) {
      actions[name] = fn;
    },

    resetActions() {
      actions = {...options.actions}
    },

    getComponent: options.getComponent,

    getScopedStore: options.getScopedStore,

    getState: options.getState,

    setState: options.setState
  };
  return page
}