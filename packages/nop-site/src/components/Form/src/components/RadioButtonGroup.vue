<!--
 * @Description:It is troublesome to implement radio button group in the form. So it is extracted independently as a separate component
-->
<template>
  <RadioGroup v-bind="attrs" v-model:value="state" button-style="solid">
    <template v-for="item in getOptions" :key="`${item.value}`">
      <RadioButton :value="item.value" :disabled="item.disabled">
        <Icon v-if="item.icon" :icon="item.icon" />
        {{ item.label ? item.label : '' }}
      </RadioButton>
    </template>
  </RadioGroup>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed } from 'vue';
  import { Radio } from 'ant-design-vue';
  import { isString } from '/@/utils/is';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  import { Icon } from '/@/components/Icon';
  type OptionsItem = {
    icon?: string;
    label?: string;
    value: string | number | boolean;
    disabled?: boolean;
  };
  type RadioItem = string | OptionsItem;

  export default defineComponent({
    name: 'RadioButtonGroup',
    components: {
      RadioGroup: Radio.Group,
      RadioButton: Radio.Button,
      Icon,
    },
    props: {
      value: {
        type: [String, Number, Boolean] as PropType<string | number | boolean>,
      },
      options: {
        type: Array as PropType<RadioItem[]>,
        default: () => [],
      },
    },
    setup(props) {
      const attrs = useAttrs();
      // Embedded in the form, just use the hook binding to perform form verification
      const [state] = useRuleFormItem(props);

      // Processing options value
      const getOptions = computed((): OptionsItem[] => {
        const { options } = props;
        if (!options || options?.length === 0) return [];

        const isStringArr = options.some((item) => isString(item));
        if (!isStringArr) return options as OptionsItem[];

        return options.map((item) => ({ label: item, value: item })) as OptionsItem[];
      });

      return { state, getOptions, attrs };
    },
  });
</script>
