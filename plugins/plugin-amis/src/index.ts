import AmisSchemaPage from "./AmisSchemaPage"
import AmisPageEditor from "./AmisPageEditor.vue"
import AmisToast from "./AmisToast.vue"

import { XuiPageEditorButton } from "./XuiPageEditorButton"

import AmisVueComponent from './AmisVueComponent'
import { registerAdapter, registerModule, registerSchemaProcessorType } from "@nop-chaos/sdk"
import { alert, confirm, toast, ToastLevel, ToastConf, dataMapping } from 'amis'

import { h } from 'vue'
import type { SchemaProcessorType } from "@nop-chaos/sdk"

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
        console.log("[notify]", type, msg);
    },
})

const AmisSchemaType: SchemaProcessorType = {
    renderPageSchema(props: SchemaComponentProps) {
        return h(AmisSchemaPage, {...props})
    },

    renderEditor(props: EditorComponentProps, onExit: () => void) {
        return h(AmisPageEditor, { ...props, "onExit": onExit })
    }
}

registerSchemaProcessorType("amis", AmisSchemaType)
registerSchemaProcessorType("default", AmisSchemaType)

export {
    AmisPageEditor,
    AmisSchemaPage,
    AmisToast,
    AmisVueComponent,
    XuiPageEditorButton
}