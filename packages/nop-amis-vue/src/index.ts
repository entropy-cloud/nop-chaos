import AmisPageEditor from "./AmisPageEditor.vue"

import AmisSchemaPage from "./AmisSchemaPage"

import AmisToast from "./AmisToast.vue"

import XuiPage from './XuiPage.vue'
import XuiPageEditor from './XuiPageEditor.vue'
import XuiSchemaPage from './XuiSchemaPage.vue'

import XuiLoading  from './XuiLoading.vue'

export * from './react-adapter'

import './AmisVueComponent'
import './XuiPageEditorButton'

import AmisVueComponent from './AmisVueComponent'
import { registerAdapter, registerModule } from "@nop-chaos/nop-core"
import { alert, confirm, toast, ToastLevel, ToastConf, dataMapping } from 'amis'

import * as Vue from 'vue'
import * as React from 'react'
import * as ReactDom from 'react-dom'

registerAdapter({
    dataMapping,
    alert,
    confirm,
    notify(type: ToastLevel, msg: any, conf?: ToastConf): void {
        if (msg.startsWith("_")) return;
        conf = { closeButton: true, ...conf }
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
})

registerModule("vue", Vue)
registerModule('react',React)
registerModule('react-dom',ReactDom)

export {
    AmisPageEditor,
    AmisSchemaPage,
    AmisToast,
    AmisVueComponent,
    XuiPage,
    XuiPageEditor,
    XuiSchemaPage,
    XuiLoading
}