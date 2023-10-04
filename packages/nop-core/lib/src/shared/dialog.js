import { createApp, nextTick } from "vue";
export function showDialog({ component, props, onOk, onCancel }) {
    const div = document.createElement("div");
    const el = document.createElement("div");
    div.appendChild(el);
    document.body.appendChild(div);
    let dialogInstance = createApp(component, Object.assign(Object.assign({}, props), { handleOk, handleCancel }));
    function update(newConfig) {
        if (dialogInstance)
            Object.assign(dialogInstance, newConfig || {});
    }
    function handleOk(...args) {
        if (onOk) {
            if (onOk.apply(null, args) === false)
                return false;
        }
        destroy();
        return true;
    }
    function handleCancel() {
        if (onCancel) {
            onCancel();
        }
        destroy();
    }
    function destroy() {
        nextTick(() => {
            if (dialogInstance && div.parentNode) {
                dialogInstance.unmount();
                dialogInstance = null;
                div.parentNode.removeChild(div);
            }
        });
    }
    dialogInstance.mount(el);
    return {
        cancel: handleCancel,
        destroy,
        update,
    };
}
