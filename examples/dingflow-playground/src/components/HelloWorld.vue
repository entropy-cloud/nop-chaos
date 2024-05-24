<script setup lang="ts">

import { XuiSchemaPage } from '@nop-chaos/sdk';

import schema from './test.json'

defineProps<{ msg: string }>()

</script>

<template>
  <xui-schema-page :schema="schema" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
