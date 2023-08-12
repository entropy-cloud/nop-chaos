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

// xui:component实际上对应于一个转换函数，它负责根据json数据动态生成新的json数据。允许异步生成
export type XuiComponent = (json: any) => any|Promise<any>

const g_components: Record<string,XuiComponent> = {

}

export function registerXuiComponent(type: string, component: XuiComponent) {
  g_components[type] = component
}

export function unregisterXuiComponent(type: string) {
  delete g_components[type]
}

export function resolveXuiComponent(type: string, json: any) :any{
  const comp = g_components[type];
  if (!comp)
    throw new Error("nop.err.xui.unknown-component:" + type);
  return comp(json);
}