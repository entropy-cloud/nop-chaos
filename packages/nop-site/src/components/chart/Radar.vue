<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, Ref, reactive, watchEffect } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';

  export default defineComponent({
    name: 'Radar',
    props: {
      chartData: {
        type: Array,
        default: () => [],
      },
      option: {
        type: Object,
        default: () => ({}),
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
    setup(props) {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);
      const option = reactive({
        title: {
          text: '基础雷达图',
        },
        legend: {
          data: ['文综', '理综'],
        },
        radar: {
          indicator: [
            { name: '历史', max: 100 },
            { name: '地理', max: 110 },
            { name: '生物', max: 120 },
            { name: '化学', max: 130 },
            { name: '物理', max: 140 },
            { name: '政治', max: 150 },
          ],
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: [82, 70, 60, 55, 90, 66],
                name: '文综',
              },
            ],
          },
        ],
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
        //雷达数据
        let indicator = Array.from(
          new Set(
            props.chartData.map((item) => {
              let { name, max } = item;
              return { name, max };
            })
          )
        );

        let data = [];
        typeArr.forEach((type) => {
          let obj = { name: type };
          let chartArr = props.chartData.filter((item) => type === item.type);
          obj['value'] = chartArr.map((item) => item.value);
          //data数据
          data.push(obj);
        });
        option.radar.indicator = indicator;
        option.series[0]['data'] = data;
        setOptions(option);
      }
      return { chartRef };
    },
  });
</script>
