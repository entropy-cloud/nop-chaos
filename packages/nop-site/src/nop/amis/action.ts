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

import { isArray, isPlainObject, isPromise, isString } from "@vue/shared";
import { v4 as uuid } from "uuid";
import { importModule } from "../api";
import { getApi } from "../api/registry";
import { ajaxFetch, ajaxRequest } from '../core/ajax';
import { absolutePath } from "../shared";
import { processXuiValue } from "./processor";

/**
 * 解析xui:js属性引入的js代码，并把返回的函数集合注册到全局的页面函数集合对象中。
 * 为了避免名字冲突，每个xui:js都处在独立的scope空间中。所有以@action:为前缀的action链接都是在父scope中查找对应的action。
 * 
 * 例如 {
 *    "xui:js": "return {f1:function(){}}"
 *    "page": {
 *       dialog: {
 *          "xui:js": "return {f2: function(){}}"
 *          api: "@action:f1"
 *       }
 *    }
 * }
 * 
 * 上面的例子中@action:f1首先向上查找最近的xui:js，如果没有找到，则继续向上查找直到顶层的节点。
 * 具体实现方法是通过预处理为每个xui:js分配一个scope，然后把前缀为 @action:的字符串都替换为 @scoped-action:scope1/scope2|originalAction这种形式
 * 
 * @param json json schema
 * @param actions 页面action集合
 * @fnScope 为函数名字空间
 * @amisScope 为状态变量名字空间，对应于amis中store构成的store tree
 */
export async function collectActions(pageUrl: string, json: any, fnScope: string, amisScope: string,
  actions: Record<string, any>) {
  if (!json) return;

  const promises: Promise<any>[] = []

  function process(json: any, fnScope: string, amisScope: string) {
    if (hasScope(json.type)) {
      let name = json.name || json.id
      if (!name)
        name = json.name = uuid()
      amisScope = amisScope ? amisScope + '.' + name : name
    }

    let modulePaths = json['xui:import']
    let js = json['xui:js']
    if (js || modulePaths) {
      // 每次出现xui:import或者xui:js都会导致产生一个新的fnScope
      const localScope = json['xui:scope'] = json['xui:scope'] || uuid()
      // standalone表示不会向上查找action
      const standalone = json['xui:standalone']
      if (standalone) {
        fnScope = localScope
      } else {
        fnScope = fnScope ? fnScope + '/' + localScope : localScope
      }

      if (js) {
        buildActions(js, fnScope, actions)
      }

      if (modulePaths) {
        fetchApis(pageUrl, modulePaths, promises, fnScope, actions)
      }
    }

    for (let key in json) {
      const v = json[key]
      const processed = processValue(v, fnScope, amisScope)
      if (processed !== v) {
        if (isPromise(processed)) {
          processed.then(v => json[key] = v)
        } else {
          json[key] = processed
        }
      }
    }
  }

  function processValue(v: any, fnScope: string, amisScope: string) {
    if (isString(v)) {
      // 为每个action增加scope前缀
      if (v.startsWith("@action:")) {
        return "@temp-action:" + amisScope + ',' + fnScope + '|' + v.substring('@action:'.length)
      } else if (v.startsWith("@page:")) {
        // 为@page:path这种形式的链接增加scope信息
        return "@scoped-page:" + amisScope + ',' + fnScope + '|' + v.substring("@page:".length)
      } else if (v.startsWith("@invoke:")) {
        return "@scoped-invoke:" + amisScope + '|' + v.substring("@invoke:".length)
      } else if (v.startsWith("@fn:")) {
        return "@scoped-fn:" + fnScope + '|' + v.substring("@fn:".length)
      }
    } else if (isPlainObject(v)) {
      process(v, fnScope, amisScope)
    } else if (isArray(v)) {
      for (let i = 0, n = v.length; i < n; i++) {
        processValue(v[i], fnScope, amisScope)
      }
    }
    return v
  }

  process(json, fnScope, amisScope)

  await Promise.all(promises)

  processXuiValue(json, v => {
    if (v.startsWith("@temp-action:")) {
      const parts = v.substring("@temp-action:".length).split('|')
      const [amisScope, fnScope] = parts[0].split(',')
      let action = fnScope + '|' + parts[1]
      let found = findAction(action, actions)
      if (!found) {
        // 查找全局注册的api
        const api = getApi(parts[1])
        if (api) {
          found = actions[action] = api as any
        }
      }
      if (found) {
        return "@scoped-action:" + amisScope + ',' + found;
      } else {
        console.error("nop.unknown-action:" + action)
        return "@unknown-action:"+action
      }
    } else if (v.startsWith("@scoped-fn:")) {
      const [fnScope, fn] = v.substring("@scoped-fn:".length).split('|')
      const fnName = fn.split('(')[0]
      const args = fn.substring(fnName.length) || '(event,props)';
      let action = fnScope + '|' + fnName
      let found = findAction(action, actions)
      if (!found) {
        // 查找全局注册的api
        const api = getApi(fnName)
        if (api) {
          found = actions[action] = api as any
        }
      }
      if (found) {
        return "return props.env._page.actions['" + action + "']" + args;
      } else {
        console.error("nop.unknown-fn:" + action)
        return "@unknown-fn:"+fn
      }
    } else {
      return v;
    }
  })
}

function fetchApis(pageUrl: string, modulePaths: any, promises: Promise<any>[],
  fnScope: string,
  actions: Record<string, any>) {

  if (isString(modulePaths)) {
    modulePaths = modulePaths.split(',').reduce((m, p) => { m[getPathName(p)] = p;return m }, {})
  }

  for (const moduleName in modulePaths) {
    const path = absolutePath(modulePaths[moduleName], pageUrl)
    const promise = importModule(path).then(mod => {
      actions[fnScope + '|' + moduleName] = mod
    })
    promises.push(promise)
  }
}

function getPathName(path: string) {
  let pos = path.lastIndexOf('/');
  if (pos >= 0)
    path = path.substring(pos + 1)
  let pos2 = path.indexOf('.')
  if (pos2 > 0)
    return path.substring(0, pos2)
  return path
}

/**
 * 解析js代码，得到返回的函数集合，为每个返回的函数名增加scope前缀，然后注册到页面action集合中
 * 
 * @param js js代码
 * @param fnScope scope标识
 * @param actions 页面action集合
 */
function buildActions(js: string, fnScope: string, actions: Record<string, any>) {
  try {
    const fn = new Function("require", "ajaxFetch", "ajaxRequest",js);
    const map = fn(importModule, ajaxFetch, ajaxRequest);
    if (map) {
      for (let name in map) {
        let fullName = fnScope + '|' + name;
        const fn = map[name]
        actions[fullName] = fn
      }
    }
  } catch (e) {
    console.error(e);
  }
}

function findAction(url: string, actions: Record<string, any>) {
  let p = url.indexOf('?')
  if (p >= 0)
    url = url.substring(0, p)

  let pos = url.lastIndexOf('|')
  let scope = url.substring(0, pos)
  let name = url.substring(pos + 1)
  let names = name.split('.')

  // 如果未找到，则在上一级scope中查找
  do {
    if (actions[scope + '|' + name]) {
      return scope + '|' + name
    }
    // 对于模块加载，对应的格式为 scope|moduelName.actionName
    if (names[1] && actions[scope + '|' + names[0]] && actions[scope + '|' + names[0]][names[1]]) {
      return scope + '|' + name
    }
    let pos = scope.lastIndexOf('/')
    if (pos < 0)
      break
    scope = scope.substring(0, pos)
  } while (true)
}

/**
 * 只有少数组件具有独立的scope。`@Renderer`注解中设置了isolateScope:true
 * 另外参见store/index.ts中allowedStoreList
 * @param type 
 * @returns 
 */
function hasScope(type: string) {
  return ["page", "dialog", "drawer", "wizard", "service", "crud", "table", "table2", "form", "combo"].includes(type)
}

// crud, dialog, drawer, wizard, service, table, form
