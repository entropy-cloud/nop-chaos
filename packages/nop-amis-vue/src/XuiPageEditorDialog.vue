<template>
    <el-dialog :destroyOnClose="true" class="page-full-screen" :modelValue="modelValue" :maskClosable="false" :append-to-body="true"
        width="100%" height="100%" :align-center="true" :fullscreen="true" :footer="null" :closable="false"
        :keyboard="false" @update:modelValue="handleChange">
        <header></header>
        <XuiPageEditor @exit="handleEditorExit" :savePageSource="savePageSource" :rollbackPageSource="rollbackPageSource"
            :getPageSource="getPageSource" />
    </el-dialog>
</template>

<style>
.page-full-screen .el-dialog__body {
    height: 100%;
    margin: 0;
    padding: 0;
}

.page-full-screen .el-dialog__header {
    display: none
}
</style>

<script setup lang="ts">
import { ElDialog } from 'element-plus';
import XuiPageEditor  from './XuiPageEditor.vue';

defineProps({
    modelValue: Boolean,
    rollbackPageSource: Function,
    getPageSource: {
        type: Function,
        required: true
    },
    savePageSource: {
        type: Function,
        required: true
    }
})

const emit = defineEmits(["update:modelValue", "exit"])

function handleEditorExit() {
    emit("update:modelValue", false)
}

function handleChange(value: boolean) {
    emit("update:modelValue", value)
}
</script>