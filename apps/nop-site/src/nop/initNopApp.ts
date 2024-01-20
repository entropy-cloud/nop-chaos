// 调试器使用了element的组件
import 'element-plus/dist/index.css'

// Amis内置的调试器需要这里的css
import 'amis/lib/helper.css';

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
import 'amis/lib/themes/cxd.css';

//import 'amis/sdk/iconfont.css';
import 'amis-ui/lib/locale/en-US';
import 'amis-ui/lib/locale/zh-CN';

import '@nop-chaos/sdk/lib/style.css'

import type { App } from 'vue';

import { clearLocalCache, importModule, registerAdapter, registerModule, XuiPage,useAdapter,ajaxRequest } from '@nop-chaos/sdk';
import { useUserStoreWithOut } from '../store/modules/user';
import { isArray } from '../utils/is';

import { IconPicker, Icon } from '/@/components/Icon'

import { useLocale } from '/@/locales/useLocale'
import { useI18n } from '/@/hooks/web/useI18n'
import { router } from '/@/router'
import { store } from '/@/store'
import { useUserStore } from '/@/store/modules/user'
import { intersection } from 'lodash-es';
import type { RoleEnum } from '/@/enums/roleEnum';
import { getToken, getTenantId } from '/@/utils/auth';
import { SessionTimeoutProcessingEnum } from '/@/enums/appEnum';
import projectSetting from '/@/settings/projectSetting';
import {Store} from 'pinia'

const currentLocale = useLocale().getLocale
const i18n = useI18n()

const {getPage} = useAdapter()

function initAdapter(app: App) {
    registerAdapter({
        /**
         * 返回当前的locale
         */
        useLocale(): string {
            return currentLocale.value
        },

        useI18n() {
            return {
                t: i18n.t
            }
        },

        usePinia(){
            return store
        },

        getPage(path:string){
             if (import.meta.env.VITE_USE_MOCK)
                return ajaxRequest({ method: 'get', url: `/mock${path}`, config: { rawResponse: true } })
            return getPage(path)
        },

        /**
         * 返回当前的全局store
         */
        useStore(name:string):Store {
            if(name == 'app-user')
                return useUserStore(store)
            throw new Error("invalid-store:"+name)
        },

        useRouter() {
            return router
        },

        useSettings() {
            return {
                apiUrl: ''
            }
        },

        /**
         * 返回当前的认证token
         */
        useAuthToken(): string {
            return getToken()
        },

        setAuthToken(token?: string) {
            useUserStore().setToken(token)
        },

        isUserInRole(role: string): boolean {
            const userStore = useUserStore()
            let roles = role.split(',')
            if (roles.length == 1) {
                return userStore.getRoleList?.includes(role as RoleEnum);
            }
            return (intersection(roles, userStore.getRoleList) as RoleEnum[]).length > 0;
        },

        useTenantId(): string {
            return getTenantId()
        },

        useAppId(): string {
            return "nop-chaos"
        },

        /**
         * 自动退出时执行的回调
         */
        logout(): void {
            const userStore = useUserStoreWithOut();
            userStore.setToken(undefined);
            if (projectSetting.sessionTimeoutProcessing === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
                userStore.setSessionTimeout(true);
            } else {
                userStore.logout(true);
            }
        },

        /**
         * 根据组件名加载Vue组件
         */
        resolveVueComponent(name: string): any {
            return app.component(name)
        }
    })
}

export async function initNopApp(app: App) {
    initAdapter(app)

    app.component("XuiPage", XuiPage)
    app.component("XUI", XuiPage)
    app.component("AMIS", XuiPage)
    app.component("icon-picker", IconPicker)
    app.component("icon", Icon)

    useUserStoreWithOut().$subscribe((mutation) => {
        // 登录信息变化的时候清空页面缓存和字典缓存
        if (mutation.events && mutation.events) {
            if (isArray(mutation.events)) {
                for (const event of mutation.events) {
                    if (event.key == 'userInfo') {
                        clearLocalCache()
                    }
                }
            } else if (mutation.events.key == 'userInfo') {
                clearLocalCache()
            }
        }
    })

    await importModule('./nop/app-starter.js')
}