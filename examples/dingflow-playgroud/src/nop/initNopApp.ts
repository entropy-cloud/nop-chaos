// 调试器使用了element的组件
//import 'element-plus/dist/index.css';

// Amis内置的调试器需要这里的css
import 'amis/lib/helper.css';

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
import 'amis/lib/themes/cxd.css';

//import 'amis/sdk/iconfont.css';
import 'amis-ui/lib/locale/en-US';
import 'amis-ui/lib/locale/zh-CN';

import '@nop-chaos/sdk/dist/style.css';

import { useDebug } from '@nop-chaos/sdk';

import type { App } from 'vue';

import {
  clearLocalCache,
  importModule,
  registerAdapter,
  registerModule,
  XuiPage,
  useAdapter,
  ajaxRequest
} from '@nop-chaos/sdk';

import { install as install_amis } from '@nop-chaos/plugin-amis'

const { getPage } = useAdapter();

function initAdapter(app: App) {
  registerAdapter({
    /**
     * 返回当前的locale
     */
    useLocale(): string {
      return 'zh-CN'
    },

    useI18n() {
      return {
        t: (msg)=> msg
      };
    },

    useDebug() {
      return useDebug;
    },

    getPage(path: string) {
      if (import.meta.env.VITE_USE_MOCK)
        return ajaxRequest({ method: 'get', url: `/mock${path}`, config: { rawResponse: true } });
      return getPage(path);
    },


    useSettings() {
      return {
        apiUrl: ''
      };
    },

    /**
     * 返回当前的认证token
     */
    useAuthToken(): string {
      return ""
    },

    setAuthToken(token?: string) {
      
    },

    useTenantId(): string {
      return ''; //getTenantId()
    },

    useAppId(): string {
      return 'nop-chaos';
    },


    /**
     * 根据组件名加载Vue组件
     */
    resolveVueComponent(name: string): any {
      return app.component(name);
    }
  });
}

export async function initNopApp(app: App) {
  install_amis();

  initAdapter(app);

  app.component('XuiPage', XuiPage);
  app.component('XUI', XuiPage);
  app.component('AMIS', XuiPage);
}
