import { defineComponent, watchEffect, ref, markRaw, defineProps, h } from 'vue'
import { getSchemaProcessorType, useAdapter, RegisterPage, SchemaComponentProps } from '@nop-chaos/nop-core'

import XuiLoading from './XuiLoading.vue'

const { useI18n } = useAdapter()

export default defineComponent(
  (props: SchemaComponentProps) => {
    let vdomRef = ref()
    watchEffect(async () => {
      const schemaTypeName = props.schema?.['xui:schema-type'] || 'default'

      const schemaType = getSchemaProcessorType(schemaTypeName)
      if (!schemaType) {
        const { t } = useI18n()
        useAdapter().notify("error", t("nop.err.unknown-schema-type"));
        throw new Error("nop.err.unknown-schema-type")
      }
      vdomRef.value = await schemaType.renderSchema(props)
    })

    return () => {
      if (vdomRef.value) {
        return vdomRef.value
      } else {
        return h(XuiLoading)
      }
    }
  },

  {
    props: ["schema", "data", "registerPage", "actions"]
  }
)





