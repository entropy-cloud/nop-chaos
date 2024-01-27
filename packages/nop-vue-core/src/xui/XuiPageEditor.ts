import { useAdapter, getSchemaProcessorType, EditorComponentProps } from '@nop-chaos/nop-core';
import { defineComponent,  h, shallowRef, watchEffect, markRaw, defineProps, defineEmits } from 'vue';
import XuiLoading from './XuiLoading.vue'

const { useI18n} = useAdapter()

export default defineComponent(
    (props: EditorComponentProps, { emit }) => {
        const vdomRef = shallowRef()

        function handleExit(){
            emit("exit")
        }

        watchEffect(() => {
            props.getPageSource(props.path, false).then(async schema => {
                if (!schema)
                    schema = {}
                vdomRef.value = markRaw(schema)

                const schemaTypeName = schema['xui:schema-type'] || 'default'

                const schemaType = getSchemaProcessorType(schemaTypeName)
                if (!schemaType) {
                    const { t } = useI18n()
                    useAdapter().notify("error", t("nop.err.unknown-schema-type"));
                    throw new Error("nop.err.unknown-schema-type")
                }
               
                vdomRef.value = await schemaType.renderEditor(props, handleExit)
            })
        })

        return ()=>{
            if (vdomRef.value) {
                return vdomRef.value
              } else {
                return h(XuiLoading)
              }
        }
    }
);
