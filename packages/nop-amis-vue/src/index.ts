import AmisSchemaPage from "./AmisSchemaPage"
import AmisPageEditor from "./AmisPageEditor.vue"
import AmisToast from "./AmisToast.vue"

import { XuiPageEditorButton } from "./XuiPageEditorButton"

import AmisVueComponent from './AmisVueComponent'
import { registerAdapter, registerModule } from "@nop-chaos/nop-core"
import { alert, confirm, toast, ToastLevel, ToastConf, dataMapping } from 'amis'

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

export {
    AmisPageEditor,
    AmisSchemaPage,
    AmisToast,
    AmisVueComponent,
    XuiPageEditorButton
}