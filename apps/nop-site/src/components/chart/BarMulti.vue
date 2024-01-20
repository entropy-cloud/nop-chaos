<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, Ref, reactive, watchEffect } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';

  export default defineComponent({
    name: 'barMulti',
    props: {
      chartData: {
        type: Array,
        default: () => [],
        required: true,
      },
      option: {
        type: Object,
        default: () => ({}),
      },
      type: {
        type: String as PropType<string>,
        default: 'bar',
      },
      width: {
        type: String as PropType<string>,
        default: '100%',
      },
      height: {
        type: String as PropType<string>,
        default: 'calc(100vh - 78px)',
      },
    },
    emits: ['click'],
    setup(props, { emit }) {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>);
      const option = reactive({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#333',
            },
          },
        },
        legend: {
          top: 30,
        },
        grid: {
          top: 60,
        },
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          type: 'value',
        },
        series: [],
      });

      watchEffect(() => {
        props.chartData && initCharts();
      });

      function initCharts() {
        if (props.option) {
          Object.assign(option, props.option);
        }
        //图例类型
        let typeArr = Array.from(new Set(props.chartData.map((item) => item.type)));
        //轴数据
        let xAxisData = Array.from(new Set(props.chartData.map((item) => item.name)));
        let seriesData = [];
        typeArr.forEach((type) => {
          let obj = { name: type, type: props.type };
          let chartArr = props.chartData.filter((item) => type === item.type);
          //data数据
          obj['data'] = chartArr.map((item) => item.value);
          seriesData.push(obj);
        });
        option.series = seriesData;
        option.xAxis.data = xAxisData;
        setOptions(option);
        getInstance()?.off('click', onClick);
        getInstance()?.on('click', onClick);
      }

      function onClick(params) {
        emit('click', params);
      }

      return { chartRef };
    },
  });
</script>
