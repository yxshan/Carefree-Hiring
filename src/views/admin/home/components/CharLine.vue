<script setup lang="ts">
  import {reactive,inject,onMounted} from 'vue'
  const echarts = inject('echarts') as any
  const props = defineProps({
    data: {
      type: Object,
      default: () => {}
    }
  })
  const state = reactive({
    option: {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        top: '10%',
        left: '3%',
        right: '3%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        // boundaryGap: false,
        data: [],
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: ''
          }
        },
      },
      series: [
        {
          name: '上周',
          type: 'line',
          data: [],
          symbol: 'circle',
          symbolSize: '8',
          itemStyle:{
            color: '#6DA6EA'
          }
        },
        {
          name: '下周',
          type: 'line',
          data: [],
          symbol: 'circle',
          symbolSize: '8',
          itemStyle:{
            color: '#FBC605'
          }
        }
      ]
    }
  })
  onMounted(() => {
    state.option.series[0].name=props.data.lastWeek.name
    state.option.series[0].data=props.data.lastWeek.data
    state.option.series[1].name=props.data.theWeek.name
    state.option.series[1].data=props.data.theWeek.data
    state.option.xAxis.data = props.data.title
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('chartLine'));
    // 绘制图表
    myChart.setOption(state.option);
    // 图表响应式
    window.addEventListener('resize',() => {
      myChart.resize()
    })
  })
</script>

<template>
  <div id="chartLine"></div>
</template>

<style scoped>
  #chartLine{
    height: 11.63rem;
    background: #FFFFFF;
    border-radius: 0.27rem;
    width: 100%;
  }
</style>