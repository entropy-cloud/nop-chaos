<template>
    <component :is="componentType" v-bind="props" :schema="schemaRef"
        @exit="handleExit" v-if="componentType"/>

    <xui-loading v-if="!componentType" />    
</template>
  
<script lang="ts" setup>
import { useAdapter, getSchemaProcessorType } from '@nop-chaos/nop-core';
import { defineComponent, shallowRef, watchEffect, markRaw } from 'vue';
import AmisPageEditor from './AmisPageEditor.vue';
import XuiLoading from './XuiLoading.vue'

const props = defineProps({
    rollbackPageSource: Function,
    getPageSource: {
        type: Function,
        required: true
    },
    savePageSource: {
        type: Function,
        required: true
    }
});

const { getPageSource} = props;

const {useI18n} = useAdapter()

const emit = defineEmits(['exit']);

function handleExit() {
    emit("exit")
}

const componentType = shallowRef()
const schemaRef = shallowRef()

watchEffect(() => {
    getPageSource(false).then(schema => {
        if(!schema)
          schema = {}
        schemaRef.value = markRaw(schema)

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