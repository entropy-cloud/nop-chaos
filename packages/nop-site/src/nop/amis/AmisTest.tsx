import { defineComponent, ref,h } from '@vue/runtime-core';
import AmisSchemaPage from './AmisSchemaPage.vue';

/**
 * 在AmisSchemaPage的基础上增加AmisDebugger调试功能，以及根据path动态加载schema的功能
 */
export default defineComponent({
    setup() {

        const pageSchema = {
            type: 'form',
            submitOnChange: true,
            api: '@ok',
            body: [
                { type: 'input-text', name: 'a' },
                { type: 'input-text', name: 'b' }
            ]
        }

        const data = {
            a: "123"
        }

        function handleOk(v: any) {
            alert("ok="+JSON.stringify(v))
        }

        function handleCancel() {
            alert('cancel')
        }

        function handleChange(v: any) {
            alert("change="+JSON.stringify(v))
        }

        return ()=>{
            return h(AmisSchemaPage,{schema:pageSchema,data:data,handleOk,handleChange,handleCancel})
        }
    },
});
  