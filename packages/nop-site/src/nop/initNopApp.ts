// Amis内置的调试器需要这里的css
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
import 'amis/lib/themes/cxd.css';
// import 'amis/lib/helper.css';
//import 'amis/sdk/iconfont.css';
import 'amis-ui/lib/locale/en-US';
import 'amis-ui/lib/locale/zh-CN';

// 为amis的helper.css增加命名空间，避免和jeecg的css冲突
import './css/helper.less'

import type { App } from 'vue';

import { clearLocalCache, registerAdapter, XuiPage } from '@nop-chaos/sdk';
import { useUserStoreWithOut } from '../store/modules/user';
import { isArray } from '../utils/is';

import {IconPicker,Icon} from '/@/components/Icon'
import './registerLibs'

import './fix.css'

function initAdapter(){
    registerAdapter({
            /**
     * 返回当前的locale
     */
    useLocale(): string {
        throw new Error("not-impl")
    },

    useI18n(): I18nOperation {
        throw new Error("not-impl")
    },

    /**
     * 返回当前的全局store
     */
    useStore(): Store {
        throw new Error("not-impl")
    },

    useRouter(): Router {
        throw new Error("not-impl")
    },

    useSettings(): Settings {
        return {
            apiUrl: ''
        }
    },

    /**
     * 返回当前的认证token
     */
    useAuthToken(): string {
        throw new Error("not-impl")
    },

    setAuthToken(token?: string) {

    },

    isUserInRole(role: string): boolean {
        throw new Error("not-impl")
    },

    useTenantId(): string {
        throw new Error("not-impl")
    },

    useAppId(): string {
        return "nop-chaos"
    },

    /**
     * 自动退出时执行的回调
     */
    logout(reason: string): void {
        throw new Error("not-impl")
    },

    /**
     * 根据组件名加载Vue组件
     */
    resolveVueComponent(name: string): any {
        throw new Error("not-impl")
    },

    processRequest(request: any) {
        return request
    },

    processResponse(response: any) {
        return response
    },

    compileFunction(code: string,page:any): Function {
        return new Function("page", "return " + code).call(null,page)
    },
    
    jumpTo(to: string, action?: any, ctx?: object){
        const router = adapter.useRouter()
        return default_jumpTo(router,to)
    },

    isCurrentUrl: default_isCurrentUrl,

    updateLocation: default_updateLocation,

    notify(type: ToastLevel, msg: any, conf?: ToastConf){
        throw new Error("not-impl")
    },

    alert(msg: string, title?: string){
        throw new Error("not-impl")
    },

    confirm(msg: string, title?: string): Promise<boolean>{
        throw new Error("not-impl")
    },

    dataMapping(
        to: any,
        from: Record<string,any> = {},
        ignoreFunction: boolean | ((key: string, value: any) => boolean) = false,
        convertKeyToPath?: boolean,
        ignoreIfNotMatch = false
      ){
        throw new Error("not-impl")
    },

    fetchDict(dictName:string, options:FetcherRequest): Promise<FetcherResult>{
        throw new Error("not-impl")
    },

    fetchPageAndTransform(pageName:string, options:FetcherRequest): Promise<FetcherResult>{
        throw new Error("not-impl")
    },

    getPage(pageUrl:string): Promise<any>{
        throw new Error("not-impl")
    }
    })
}

export function initNopApp(app:App){
   app.component("XuiPage", XuiPage)
   app.component("XUI", XuiPage)
   app.component("AMIS", XuiPage)
   app.component("icon-picker",IconPicker)
   app.component("icon",Icon)

   useUserStoreWithOut().$subscribe((mutation)=>{
      // 登录信息变化的时候清空页面缓存和字典缓存
      if(mutation.events && mutation.events){
         if(isArray(mutation.events)){
            for(const event of mutation.events){
               if(event.key == 'userInfo'){
                  clearLocalCache()
               }
            }
         }else if(mutation.events.key == 'userInfo'){
            clearLocalCache()
         }
      }
   })
}