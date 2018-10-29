<template>
  <div class="echarts-container">
    <chart
      ref="pie"
      :options="polar"
      auto-resize
      v-if="options.seriesData && options.seriesData.length"
      @click="handlePieClick"></chart>
    <no-data :title="title" v-else></no-data>
  </div>
</template>

<script>
import NoData from './NoData'
import { checkParameter } from 'utils/toggle'
export default {
  name: 'PieChart',
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    NoData
  },
  data () {
    return {
      polar: {},
      title: '',
      baseColor: [
        '#ffff00',
        '#007fff',
        '#fe90bf',
        '#11feef',
        '#ff3890',
        '#ff644b',
        '#29c342',
        '#ff9600',
        '#a34be0',
        '#11b0ff'
      ]
    }
  },
  watch: {
    options () {
      this.renderChart()
    }
  },
  methods: {
    renderChart () {
      this.title = this.options.text || this.options.toolboxName || ''
      this.polar = {
        color: this.options.color || this.baseColor,
        // 标题
        title: {
          text: this.options.text || '',
          textStyle: {
            color: this.options.textColor || '#fff'
          },
          subtext: this.options.subtext || '',
          left: this.options.titleLeft || 'center'
        },
        // 图例
        legend: {
          show: this.options.showLegend,
          data: this.options.legendData,
          orient: this.options.legendOrient || 'horizontal',
          left: checkParameter(this.options.legendLeft, 20),
          top: checkParameter(this.options.legendTop, 30),
          textStyle: {
            color: this.options.legendColor || '#fff'
          }
        },
        // 提示框
        tooltip: {
          show: !this.options.hideTooltip,
          trigger: 'item',
          formatter: this.options.formatTip || '{b}: {c} ({d}%)'
        },
        // 工具栏
        toolbox: {
          show: !this.options.hideToolBox,
          feature: {
            saveAsImage: {
              show: !this.options.hideImage,
              name: this.options.toolboxName || this.options.text,
              backgroundColor: 'rgba(0, 35, 55, 0.4)'
            }
          },
          right: checkParameter(this.options.toolboxRight, 25),
          top: checkParameter(this.options.toolboxTop, 30),
          iconStyle: {
            normal: {
              borderColor: '#fff'
            }
          }
        },
        series: [
          { // 内环
            name: this.options.text,
            type: 'pie',
            radius: this.options.inradius || ['50%', '70%'],
            // 是否展示成南丁格尔图
            roseType: this.options.roseType || false,
            selectedMode: 'single',
            label: {
              normal: {
                show: !this.options.outradius,
                formatter: this.options.formatter || '{b}：{c}'
              }
            },
            labelLine: {
              normal: {
                show: !this.options.outradius
              }
            },
            data: this.options.seriesData
          },
          { // 外环
            name: this.options.text,
            type: 'pie',
            radius: this.options.outradius,
            label: {
              normal: {
                show: !!this.options.outradius,
                formatter: this.options.formatter || '{b}: {c}'
              }
            },
            labelLine: {
              normal: {
                show: !!this.options.outradius
              }
            },
            data: this.options.seriesData
          }
        ]
      }
    },
    handlePieClick (event) {
      this.$emit('item-click', event)
    }
  },
  mounted () {
    this.renderChart()
  }
}
</script>

<style>
</style>
