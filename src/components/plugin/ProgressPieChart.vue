<template>
  <div class="echarts-container">
    <chart
      ref="progress-pie"
      :options="polar"
      auto-resize
      v-if="options.data !== undefined"
      @click="handlePieClick"></chart>
    <no-data :title="title" v-else></no-data>
  </div>
</template>

<script>
import NoData from './NoData'
import echarts from 'echarts'
import { checkParameter } from 'utils/toggle'
export default {
  name: 'ProgressPieChart',
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
      baseColor: ['#e53030', '#e7aa27', '#79cd36', '#0fb3f2', '#bd20d4', '#2073d9', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42']
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
            color: this.options.textColor || '#fff',
            fontSize: 14
          },
          subtext: this.options.subtext || '',
          top: checkParameter(this.options.titleTop, '85%'),
          left: checkParameter(this.options.titleLeft, 'center')
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
          formatter: '{b}: {c} ({d}%)'
        },
        // 工具栏
        toolbox: {
          show: this.options.showToolBox,
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
          {
            name: this.options.text,
            type: 'pie',
            radius: this.options.radius || ['75%', '95%'],
            // 图形是否不响应和触发鼠标事件
            silent: checkParameter(this.options.silent, true),
            color: [
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: this.options.colors[0] || '#00a2ff'
                },
                {
                  offset: 1,
                  color: this.options.colors[1] || '#70ffac'
                }
              ]),
              this.options.seriesBg || 'rgba(104, 151, 175, .32)'
            ],
            label: {
              normal: {
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: this.options.data,
                name: this.options.hideName ? '' : this.options.data + '',
                label: {
                  normal: {
                    textStyle: {
                      color: this.options.colors[1],
                      fontSize: this.options.dataSize || 30
                    }
                  }
                }
              },
              {
                value: 100 - this.options.data,
                name: this.options.hideName ? '' : this.options.status,
                label: {
                  normal: {
                    textStyle: {
                      color: this.options.colors[0],
                      fontSize: this.options.statusSize || 14
                    }
                  }
                }
              }
            ]
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
