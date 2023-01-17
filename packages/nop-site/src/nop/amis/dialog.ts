import { Schema } from "amis-core";
import { createApp, nextTick } from "vue";

import AmisPage from "./AmisPage.vue"
import { registerGlobComp } from "/@/components/registerGlobComp";

export type DialogOptions = {
    url?: string,
    schema?: Schema
    onOk?: (data?: any) => boolean|void,
    onCancel?: () => void,
    data?: any
    config?: any
}

export function showDialog({ url, schema,onOk, onCancel, data,config }: DialogOptions) {
    const div = document.createElement("div");
    const el = document.createElement("div");
    div.appendChild(el);
    document.body.appendChild(div);

    let options = {
        path: url,
        schema,
        data: data,
        handleOk: handleOk,
        handleCancel: cancel,
        config
    };

    let dialogInstance:any = createApp(AmisPage, options);
    registerGlobComp(dialogInstance)

    function update(newConfig) {
        if (dialogInstance) Object.assign(dialogInstance, newConfig || {});
    }

    function handleOk(...args) {
        if (onOk) {
            if (onOk.apply(null, args) === false) return false;
        }

        destroy();
    }

    function cancel() {
        if (onCancel) {
            onCancel()
        }
        destroy();
    }

    function destroy() {
        nextTick(() => {
            if (dialogInstance && div.parentNode) {
                dialogInstance.unmount()
                dialogInstance = null;
                div.parentNode.removeChild(div);
            }
        })
    }

    dialogInstance.mount(el);

    return {
        cancel,
        destroy,
        update,
    };
}