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
import { toast,ActionObject } from 'amis'
import copy from 'copy-to-clipboard'
import type { PageObject, FetcherRequest, FetcherResult } from "@nop-chaos/nop-core"
import { useDebug,  default_jumpTo, isCancel, useAdapter,default_isCurrentUrl ,ajaxFetch, default_updateLocation, providePage} from "@nop-chaos/nop-core";


export function createEnv(page: PageObject): RenderOptions {
  const {debug} = useDebug()
  const adapter = useAdapter()

  let env: RenderOptions = {
    session: page.id,
    affixOffsetTop: 0,

    fetcher(options: FetcherRequest): Promise<FetcherResult> {
      providePage(page)
      options._page = page
      return ajaxFetch(options)
    },

    jumpTo(to: string, action?:ActionObject, ctx?: object) {
      const router = adapter.useRouter()
      return default_jumpTo(router, to)
    },

    isCancel: isCancel,

    isCurrentUrl: default_isCurrentUrl,

    updateLocation(to, replace){
      // 调用go将会导致页面组件重新加载
      //const go = useGo(page.router)
      //go(normalizeLink(to), replace)
      default_updateLocation(to,!!replace)
    },

    notify: adapter.notify,

    enableAMISDebug: debug.value,

    alert: adapter.alert,
    confirm: adapter.confirm,

    copy: (contents, options) => {
      if (options === void 0) {
        options = {};
      }
      const { t } = adapter.useI18n()
      const ret = copy(contents, options);
      ret &&
        (!options || options.shutup !== true) &&
        toast.info(t("Copy To Clipboard"));
      return ret;
    }
  };

  (env as any)._page = page;
  (page as any).env = env
  return env;
}