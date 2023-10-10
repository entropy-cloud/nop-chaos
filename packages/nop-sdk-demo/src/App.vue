<template>
   <ConfigProvider>
    <!-- 需要放置一个全局的toast组件用于显示提示信息 -->
    <AmisToast theme="cxd"/>

    <RouterView />
  </ConfigProvider>
</template>

<script lang="ts" setup>
import {ConfigProvider} from 'ant-design-vue'
import {AmisToast} from '@nop-chaos/sdk'
</script>