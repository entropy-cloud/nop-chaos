<template>
  <Tooltip :title="t('layout.header.tooltipLock')" placement="bottom" :mouseEnterDelay="0.5" @click="handleLock">
    <LockOutlined />
  </Tooltip>
  <LockModal @register="register" />
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  import { Tooltip } from 'ant-design-vue';
  import { LockOutlined } from '@ant-design/icons-vue';
  import Icon from '/@/components/Icon';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useModal } from '/@/components/Modal';

  export default defineComponent({
    name: 'LockScreen',
    inheritAttrs: false,
    components: {
      Icon,
      Tooltip,
      LockOutlined,
      LockModal: createAsyncComponent(() => import('./lock/LockModal.vue')),
    },
    setup() {
      const { t } = useI18n();
      const [register, { openModal }] = useModal();

      function handleLock() {
        openModal(true);
      }

      return {
        t,
        register,
        handleLock,
      };
    },
  });
</script>
