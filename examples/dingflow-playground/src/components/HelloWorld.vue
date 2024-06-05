<script setup lang="ts">

import { XuiSchemaPage ,registerModule} from '@nop-chaos/sdk';

import schema from './test.json'

import flowLib from './FlowEditorMaterial'

defineProps<{ msg: string }>()

registerModule("/public/flow.lib.js", flowLib)

</script>

<template>
  <xui-schema-page :schema="schema" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
