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
import { useAdapter } from '../adapter';
import { processXuiDirective } from './processor';
import { resolveXuiComponent } from './registry';

export async function transformPageJson(pageUrl: string, json: any) {
  json.__baseUrl = pageUrl;
  //fixPage(json)
  json = await processXuiDirective(json, "xui:roles", filterByAuth);
  json = await processXuiDirective(json, "xui:component", resolveXuiComponent);
  return json;
}

function filterByAuth(roles: string, json: any) {
  const { isUserInRole } = useAdapter()

  if (!isUserInRole(roles)) return;
  return json;
}

/*
function fixPage(json:any){
  if(isArray(json)){
    for(let i=0,n=json.length;i<n;i++){
      fixPage(json[i])
    }
  }else if(isObject(json)){
    // 为dialog和drawer增加amis类，从而限制css作用范围
    const dlg = json['dialog']
    if(isObject(dlg)){
      addClassName(dlg,"bodyClassName","nop-page")
    }

    const drawer = json['drawer']
    if(isObject(drawer)){
      addClassName(drawer,"className","nop-page")
    }

    if(json['type'] == 'group'){
      const body = json['body']
      // group的body必须是Array类型。如果是Map，则不显示
      if(isObject(body)){
        json['body'] = [body]
      }
    }

    for(let key in json){
      fixPage(json[key])
    }
  }
}

function addClassName(map:any, classNameKey:string, className:string) {
  let value =  map[classNameKey];
  if (!value) {
      value = className;
  } else if(value.indexOf(className) < 0) {
      value = className + " " + value;
  }
  map[classNameKey] = value;
}*/