// Amis内置的调试器需要这里的css
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
import 'amis/lib/themes/cxd.css';
// import 'amis/lib/helper.css';
//import 'amis/sdk/iconfont.css';
import 'amis-ui/lib/locale/en-US';
import 'amis-ui/lib/locale/zh-CN';

// 为amis的helper.css增加命名空间，避免和jeecg的css冲突
//import './css/helper.less'

import type { App } from 'vue';
import { useRouter } from '../router';
import {useStore} from '../store'

import { registerAdapter, XuiPage } from '@nop-chaos/sdk';

import './fix.css'

function initAdapter(app: App) {
    registerAdapter({
        /**
         * 返回当前的locale
         */
        useLocale(): string {
            return "zh-CN"
        },

        useI18n() {
            return {
                t: (msg:string)=>msg
            }
        },

        /**
         * 返回当前的全局store
         */
        useStore,

        useRouter,

        useSettings() {
            return {
                apiUrl: ''
            }
        },

        /**
         * 返回当前的认证token
         */
        useAuthToken(): string {
            return localStorage.getItem("nop-token") || ''
        },

        setAuthToken(token?: string) {
            localStorage.setItem("nop-token",token || '')
        },

        isUserInRole(role: string): boolean {
            return false;
        },

        useTenantId(): string {
            return ""
        },

        useAppId(): string {
            return "nop-sdk-demo"
        },

        /**
         * 自动退出时执行的回调
         */
        logout(): void {
            localStorage.removeItem("nop-token")
        },

        /**
         * 根据组件名加载Vue组件
         */
        resolveVueComponent(name: string): any {
            return app.component(name)
        }
    })
}

export function initNopApp(app: App) {
    initAdapter(app)

    app.component("XuiPage", XuiPage)
    app.component("XUI", XuiPage)
    app.component("AMIS", XuiPage)
}