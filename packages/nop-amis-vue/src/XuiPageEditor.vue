<template>
    <component :is="componentType" :path="path" @exit="handleExit" />
</template>
  
<script lang="ts" setup>
import { useAdapter,getSchemaProcessorType } from '@nop-chaos/nop-core';
import { defineComponent, ref, watchEffect,markRaw } from 'vue';
import AmisPageEditor from './AmisPageEditor.vue';

const props = defineProps({
    path: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(['exit']);

function handleExit() {
    emit("exit")
}

const componentType = ref(markRaw(AmisPageEditor))

const {useI18n} = useAdapter()

watchEffect(() => {
    useAdapter().getPage(props.path).then(schema => {
        const schemaTypeName = schema['xui:schema-type']
        if (!schemaTypeName) {
            componentType.value = markRaw(AmisPageEditor)
        } else {
            const schemaType = getSchemaProcessorType(schemaTypeName)
            if (!schemaType) {
                const { t } = useI18n()
                useAdapter().notify("error", t("nop.err.unknown-schema-type"));
                throw new Error("nop.err.unknown-schema-type")
            }
            componentType.value = markRaw(schemaType.editorComponentType as ReturnType<typeof defineComponent>)
        }
    })
})
</script>