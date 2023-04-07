<template>
    <suspense>
        <template #defaul>
            <FlowDesignerImpl :modelLibUrl="modelLibUrl" :loadPanelConfigUrl="loadPanelConfigUrl"
                :loadDataUrl="loadDataUrl" :saveDataUrl="saveDataUrl" />
        </template>
        <template #fallback>
            <h1>Loading ...</h1>
        </template>
    </suspense>
</template>
  
<script lang="ts" setup>

import FlowDesignerImpl from './FlowDesignerImpl.vue'

defineProps({
    modelLibUrl: {
        type: String,
        required: true,
    },

    loadPanelConfigUrl: String,

    loadDataUrl: {
        type: String,
        required: true,
    },

    saveDataUrl: String
});

</script>