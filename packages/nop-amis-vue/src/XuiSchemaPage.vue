<template>
  <component :is="componentType" v-bind="$props"></component>
</template>


<script lang="ts">
import { PropType, defineComponent, watchEffect, ref,markRaw } from 'vue'
import AmisSchemaPage from './AmisSchemaPage';

import { getSchemaProcessorType, useAdapter, RegisterPage } from '@nop-chaos/nop-core'

/**
 * 嵌入到vue中的amis页面。每个AmisSchemaPage都对应一个ReactRooot。schema发生变化时会重新创建react组件
 */
export default defineComponent({
  props: {
    schema: Object,
    data: Object,
    registerPage: Function as PropType<RegisterPage>,
    actions: Object as PropType<Record<string, Function>>
  },

  setup(props) {

    const { useI18n } = useAdapter()

    let componentType = ref(markRaw(AmisSchemaPage))
    watchEffect(() => {
      const schemaTypeName = props.schema?.['xui:schema-type']
      if (!schemaTypeName) {
        componentType.value = markRaw(AmisSchemaPage)
      } else {
        const schemaType = getSchemaProcessorType(schemaTypeName)
        if (!schemaType) {
          const { t } = useI18n()
          useAdapter().notify("error", t("nop.err.unknown-schema-type"));
          throw new Error("nop.err.unknown-schema-type")
        }
        componentType.value = markRaw(schemaType.componentType as ReturnType<typeof defineComponent>)
      }
    })

    return {
      componentType
    }
  },
});
</script>