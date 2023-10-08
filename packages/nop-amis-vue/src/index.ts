import AmisPageEditor  from "./AmisPageEditor.vue"

import AmisSchemaPage from "./AmisSchemaPage.vue"

import AmisToast from "./AmisToast.vue"

import XuiPage from './XuiPage.vue'
import XuiPageEditor from './XuiPageEditor.vue'
import XuiSchemaPage from './XuiSchemaPage.vue'

import './AmisVueComponent'

import AmisVueComponent from './AmisVueComponent'
import { registerAdapter } from "@nop-chaos/nop-core"
import { dataMapping } from "amis-core"

registerAdapter({
    dataMapping: dataMapping
})

export {
    AmisPageEditor,
    AmisSchemaPage,
    AmisToast,
    AmisVueComponent,
    XuiPage,
    XuiPageEditor,
    XuiSchemaPage
}