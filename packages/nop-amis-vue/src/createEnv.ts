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

import type { RenderOptions } from "amis-core/lib/factory";
import type { Action } from "amis/lib/types"
import { alert, confirm, IScopedContext, toast } from 'amis'
import copy from 'copy-to-clipboard'
import type { PageObject } from "./page"
import { isPageUrl } from './page'
import { isCancel, useI18n, ajaxFetch, fetcherOk } from "../core"
import type { FetcherRequest, FetcherResult } from '../core'
import qs from "qs"
import { match } from 'path-to-regexp';

import { isPromise } from 'vue'

import { useGo } from '/@/hooks/web/usePage';
import { openWindow } from '/@/utils';
import { RouteLocationRaw, Router } from 'vue-router';

import { fetchPageAndTransform } from './page'
import { collectActions } from './action';
import { fetchDict } from "../api";

import {useDebug} from '../core'

const {debug} = useDebug()

export function createEnv(page: PageObject): RenderOptions {
  let env: RenderOptions = {
    session: page.id,
    affixOffsetTop: 0,

    fetcher(options: FetcherRequest): Promise<FetcherResult> {
      const result = handleSpecialUrl(options, page)
      if (result)
        return result

      const actions = page.actions;

      // 识别@scoped-action:method
      const parsed = parseScoped(options.url, "@scoped-action:", page);
      if (parsed) {
        const names = parsed.name.split('.')
        const fn = actions[parsed.fnScope + '|' + parsed.name]
            || actions[parsed.fnScope + '|' + names[0]]?.[names[1]]
        if (fn) {
          try {
            const ret = fn(options, page, parsed.scoped);
            if (!isPromise(ret))
              return Promise.resolve(fetcherOk(ret))
            return ret
          } catch (err) {
            return Promise.resolve({
              status: 300,
              headers: {},
              data: {
                status: -1,
                msg: (err as any).toString(),
                data: {}
              }
            })
          }
        } else {
          return Promise.resolve({
            status:300,
            headers:{},
            data:{
              status:-1,
              msg: 'invalid-action:'+options.url,
              data: {}
            }
          })
        }
      }

      if (!options.config)
        options.config = {}

      // ajax请求内部不需要弹出错误提示，外部的amis框架会负责处理  
      if (options.config.silent == null)
        options.config.silent = true
      return ajaxFetch(options);
    },

    jumpTo(to: string, action?: Action, ctx?: object) {
      return pageJumpTo(page.router, to)
    },

    isCancel: isCancel,

    isCurrentUrl: default_isCurrentUrl,

    updateLocation: (to, replace) => {
      if (to === 'goBack') {
        return page.router.go(-1)
      }
      // 调用go将会导致页面组件重新加载
      //const go = useGo(page.router)
      //go(normalizeLink(to), replace)
    },

    notify: (type, msg, conf) => {
      if (msg.startsWith("_")) return;
      conf = {closeButton:true,...conf}
      toast[type] ?
        toast[type](msg, conf)
        : console.warn("[notify]", type, msg);
      // toast[type]
      //   ? toast[type](
      //     msg,
      //     conf
      //   )
      //   : console.warn("[notify]", type, msg);
      console.log("[notify]", type, msg);
    },

    enableAMISDebug: debug.value,

    alert,
    confirm,
    copy: (contents, options) => {
      if (options === void 0) {
        options = {};
      }
      const { t } = useI18n()
      const ret = copy(contents, options);
      ret &&
        (!options || options.shutup !== true) &&
        toast.info(t("Copy To Clipboard"));
      return ret;
    }
  };

  (env as any)._page = page
  page.env = env
  return env;
}

/**
 * 识别具有特殊前缀的url
 */
function handleSpecialUrl(options: FetcherRequest, page: PageObject): Promise<FetcherResult> | undefined {
  if (options.url == 'call://ok') {
    // 弹出窗口中点击确定按钮
    let ret = Promise.resolve(page.handleOk?.(options.data));
    return ret.then(fetcherOk);
  } else if (options.url == 'call://cancel') {
    // 弹出窗口中点击取消按钮
    page.handleCancel?.();
    return Promise.resolve(fetcherOk(null));
  } else if (options.url == 'call://change') {
    let ret = Promise.resolve(page.handleChange?.(options.data));
    return ret.then(fetcherOk);
  } else if (options.url.startsWith('scoped-invoke://')) {
    const parsed = parseScoped(options.url, "scoped-invoke://", page)!
    if (page.handleInvoke){
      let ret = Promise.resolve(page.handleInvoke(parsed.name, options, page, parsed.scoped))
      return ret.then(fetcherOk)
    }

    console.error("nop.page.invoke-no-handler:action=" + options.url)
    return Promise.resolve(fetcherOk(null))
  } else if (options.url.startsWith("scoped-page://")) {
    // 动态获取页面
    const parsed = parseScoped(options.url, "scoped-page://", page)!
    return fetchPageAndTransform(parsed.name)
      .then((res: any) => {
        return collectActions(parsed.name, res, parsed.fnScope, parsed.amisScope, page.actions).then(v => fetcherOk(res))
      })
  } else if(options.url.startsWith('dict://')){
    let dictName = options.url.substring('dict://'.length)
    return fetchDict(dictName,true).then(dict=>{
      return fetcherOk(dict)
    })
  }
}

function parseScoped(url: string, prefix: string, page: PageObject) {
  if (!url || !url.startsWith(prefix))
    return

  let str = url.substring(prefix.length)
  const pos = str.indexOf('|')
  const [amisScope, fnScope] = str.substring(0, pos).split(',')
  return {
    amisScope,
    fnScope,
    scoped: page.getComponent(amisScope)?.context as IScopedContext,
    name: str.substring(pos + 1)
  }
}

function pageJumpTo(router: Router, to: string) {
  if (to.startsWith("open://")) {
    openWindow(to.substring("open://".length))
  } else {
    const go = useGo(router)
    const replace = to.startsWith('replace://')
    if (replace) {
      to = to.substring("replace://".length)
    }
    if (isPageUrl(to)) {
      const page: RouteLocationRaw = { name: 'jsonPage', params: { url: to } }
      go(page as any, replace)
    } else {
      go(to, replace)
    }
  }
}

function normalizeLink(to) {
  if (/^\/api\//.test(to)) {
    return to
  }
  to = to || ''
  const location = window.location
  if (to && to[0] === '#') {
    to = location.pathname + location.search + to
  } else if (to && to[0] === '?') {
    to = location.pathname + to
  }
  const idx = to.indexOf('?')
  const idx2 = to.indexOf('#')
  let pathname = ~idx
    ? to.substring(0, idx)
    : ~idx2
      ? to.substring(0, idx2)
      : to
  const search = ~idx ? to.substring(idx, ~idx2 ? idx2 : undefined) : ''
  const hash = ~idx2 ? to.substring(idx2) : ''
  if (!pathname) {
    pathname = location.pathname
  } else if (pathname[0] != '/' && !/^https?:\/\//.test(pathname)) {
    const relativeBase = location.pathname
    const paths = relativeBase.split('/')
    paths.pop()
    let m
    while ((m = /^\.\.?\//.exec(pathname))) {
      if (m[0] === '../') {
        paths.pop()
      }
      pathname = pathname.substring(m[0].length)
    }
    pathname = paths.concat(pathname).join('/')
  }
  return pathname + search + hash
}

function default_updateLocation(to: any, replace: boolean) {
  if (to === 'goBack') {
    return window.history.back();
  }

  if (replace && window.history.replaceState) {
    window.history.replaceState('', document.title, to);
    return;
  }

  location.href = normalizeLink(to);
}

function default_isCurrentUrl(to: string, ctx?: any) {
  const link = normalizeLink(to);
  const location = window.location;
  let pathname = link;
  let search = '';
  const idx = link.indexOf('?');
  if (~idx) {
    pathname = link.substring(0, idx);
    search = link.substring(idx);
  }

  if (search) {
    if (pathname !== location.pathname || !location.search) {
      return false;
    }

    const query = qs.parse(search.substring(1));
    const currentQuery = qs.parse(location.search.substring(1));

    return Object.keys(query).every(
      key => query[key] === currentQuery[key]
    );
  } else if (pathname === location.pathname) {
    return true;
  } else if (!~pathname.indexOf('http') && ~pathname.indexOf(':')) {
    return match(link, {
      decode: decodeURIComponent,
      strict: ctx?.strict ?? true
    })(location.pathname);
  }

  return false;
}

function ref_jumpTo(to: string, action?: any) {
  if (to === 'goBack') {
    return window.history.back();
  }

  to = normalizeLink(to);

  if (action && action.actionType === 'url') {
    action.blank === false ? (window.location.href = to) : window.open(to);
    return;
  }

  // 主要是支持 nav 中的跳转
  if (action && to && action.target) {
    window.open(to, action.target);
    return;
  }

  if (/^https?:\/\//.test(to)) {
    window.location.replace(to);
  } else {
    location.href = to;
  }
}