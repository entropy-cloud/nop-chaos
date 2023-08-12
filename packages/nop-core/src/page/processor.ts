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
import { isObject, isArray,isString } from "@vue/shared"
import {isPromise} from '@vue/shared'

/**
 * 如果返回undefined，表示该节点需要被删除
 */
export type XuiDirectiveProcessor = (
  type: string, // 类型信息
  json: any, // 节点数据
  processProps: (json: any) => any // 递归处理子节点时可以使用的帮助函数
) => any; 

/**
 * 查找所有具有typeProp指定的属性的节点，并调用processor进行处理，返回结果将会替换原节点。
 * 例如识别xui:roles属性，自动删除没有对应权限的节点
 * 
 * @param json json对象
 * @param typeProp 类型字段名
 * @param processor 处理器
 * @returns 经过处理替换后得到的节点
 */
export async function processXuiDirective(
  json: any,
  typeProp: string,
  processor: XuiDirectiveProcessor) {
  let futures: Promise<any>[] = []
  let ret = _processXuiDirective(json, typeProp, processor, futures)
  await Promise.all(futures)
  return ret
}

function _processXuiDirective(
  json: any,
  typeProp: string,
  processor: XuiDirectiveProcessor,
  futures: Promise<any>[]
) {
  if (!json) return json;

  
  function processProps(json: any) {
    for (let key in json) {
      let v = json[key];
      v = _processXuiDirective(v, typeProp, processor,futures);
      if (v === undefined) {
        delete json[key];
      } else if (v != json[key]) {
        json[key] = v

        // 更新异步返回的结果
        if (isPromise(v)) {
          v.then(ret => {
            if (ret === undefined) {
              delete json[key]
            }else{
              json[key] = ret
            }
          })
          json[key] = v
          futures.push(v as Promise<any>)
        }
      }
    }
    return json;
  }

  if (isObject(json)) {
    // 转换组件
    let type = json[typeProp];
    if (type) {
      return processor(type, json, processProps);
    }

    processProps(json);
  } else if (isArray(json)) {
    for (let i = 0, n = json.length; i < n; i++) {
      let child = _processXuiDirective(json[i], typeProp, processor,futures);
      if (child === undefined) {
        delete json[i];
        i--;
        n--;
      } else if (child != json[i]) {
        json[i] = child;

        // 更新异步返回的结果
        if (isPromise(child)) {
          child.then(ret => {
            let idx = json.indexOf(child)
            if(idx < 0)
              return
            if (ret == undefined) {
              delete json[idx]
            } else {
              json[idx] = ret
            }
          })
        }
      }
    }
  }
  return json;
}


export type XuiValueProcessor = (value:string, key:any,o:any) => any

/**
 * 对json对象中的字符串值调用processor来处理
 * @param json 待处理的对象
 * @param processor 处理器
 * @returns 
 */
export function processXuiValue(json: any, processor: XuiValueProcessor) {
  if (!json) return json;

  
  function processProps(json: any) {
    for (let key in json) {
      let v = json[key];
      
      if (isString(v)) {
        v = processor(v, key, json);
        if (v === undefined) {
          delete json[key];
        } else if (v != json[key]) {
          json[key] = v
        }
      }else{
        processXuiValue(v,processor)
      }
    }
    return json;
  }

  if (isObject(json)) {
    processProps(json);
  } else if (isArray(json)) {
    for (let i = 0, n = json.length; i < n; i++) {
      let child = json[i];
      if (isString(child)) {
        let v = processor(child,i,json)
        if (v === undefined) {
          delete json[i];
          i--;
          n--;
        } else if (v != json[i]) {
          json[i] = v;
        }
      }else{
        processXuiValue(child,processor)
      }
    }
  }
  return json;
}