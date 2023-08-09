import type { App } from 'vue';

//import AmisPage from './amis/AmisPage.vue'



import './amis/AmisVueComponent'

import { clearLocalCache } from './api';
import { useUserStoreWithOut } from '../store/modules/user';
import { isArray } from '../utils/is';
import AmisPage from './amis/AmisPage.vue'

import {IconPicker,Icon} from '/@/components/Icon'
import { registerVueComponentResolver } from './core';
import './registerLibs'

import './fix.css'

export function initNopApp(app:App){
   app.component("AmisPage", AmisPage)
   app.component("AMIS", AmisPage)
   app.component("icon-picker",IconPicker)
   app.component("icon",Icon)

   registerVueComponentResolver(app.component)

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