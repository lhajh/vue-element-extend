<template>
  <div class="echarts-container">
    <chart
      ref="bar"
      :options="polar"
      auto-resize
      v-if="options.name && options.name.length"
      @click="handleBarClick"></chart>
    <no-data :title="title" v-else></no-data>
  </div>
</template>

<script>
import NoData from './NoData'
import { checkParameter } from 'utils/toggle'
export default {
  name: 'ProgressBarChart',
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
      baseColor: ['#45a1f8', '#e7aa27', '#79cd36', '#0fb3f2', '#bd20d4', '#2073d9', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42']
    }
  },
  watch: {
    options: {
      handler: function (val, oldVal) {
        this.renderChart()
      },
      deep: true
    }
  },
  methods: {
    renderChart () {
      let that = this
      this.title = this.options.text || this.options.toolboxName || ''
      let isZoom = this.options.name && this.options.name.length > 10
      this.polar = {
        color: this.options.color || this.baseColor,
        // 标题
        title: {
          text: this.options.text || '',
          textStyle: {
            color: this.options.textColor || '#fff',
            fontSize: this.options.textFontSize || 18
          },
          subtext: this.options.subtext || (isZoom ? '当前数据较多，请滚动鼠标或缩放屏幕查看完整数据' : ''),
          subtextStyle: {
            color: this.options.subtextColor || '#f49800',
            fontSize: this.options.subtextFontSize || 12
          },
          top: checkParameter(this.options.titleTop, 'auto'),
          left: checkParameter(this.options.titleLeft, 'center'),
          backgroundColor: this.options.backgroundColor || 'transparent'
        },
        // 图例
        legend: {
          type: 'scroll', // 只有容器放不下图例, scroll 才会生效
          show: this.options.showLegend === false ? false : (this.options.showLegend || (this.options.legend && this.options.legend.length > 1)),
          data: this.options.legend || [this.options.text],
          right: !this.options.hideTooltip ? 60 : 0,
          top: this.options.legendTop || 25,
          textStyle: {
            color: this.options.legendColor || '#fff',
            fontSize: this.options.legendFontSize || 12
          }
        },
        // 提示框
        tooltip: {
          show: !this.options.hideTooltip,
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: this.options.tooltipType || 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
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
          right: this.options.toolboxRight || 25,
          top: this.options.toolboxTop || 25,
          iconStyle: {
            normal: {
              borderColor: '#fff'
            }
          }
        },
        // 直角坐标系内绘图网格
        grid: {
          left: checkParameter(this.options.gridLeft, '3%'),
          right: checkParameter(this.options.gridRight, '3%'),
          bottom: checkParameter(this.options.gridBottom, '3%'),
          top: checkParameter(this.options.gridTop, '3%'),
          containLabel: true
        },
        xAxis: {
          show: false
        },
        yAxis: [
          {
            show: !this.options.hideyAxis,
            inverse: true,
            data: this.options.name,
            // 坐标轴轴线
            axisLine: {
              show: this.options.hideyAxisLine === undefined ? true : !this.options.hideyAxisLine,
              lineStyle: {
                color: this.options.yAxisColor || '#fff'
              }
            },
            // 坐标轴刻度
            axisTick: {
              show: this.options.hideyAxisTick === undefined ? true : !this.options.hideyAxisTick,
              alignWithLabel: true
            },
            // 坐标轴刻度标签
            axisLabel: {
              fontSize: this.options.yAxisFontSize || 12,
              color: this.options.yAxisColor || '#fff',
              // 坐标轴刻度标签的显示间隔，在类目轴中有效。可以设置成 0 强制显示所有标签。
              interval: 0,
              formatter (value) {
                let ret = '' // 拼接加\n返回的类目项
                let maxLength = that.options.yAxisMaxLength || 8 // 每项显示文字个数
                let valLength = value.length // X轴类目项的文字个数
                let rowN = Math.ceil(valLength / maxLength) // 类目项需要换行的行数
                if (rowN > 1) { // 如果类目项的文字大于8,
                  for (let i = 0; i < rowN; i++) {
                    let temp = '' // 每次截取的字符串
                    let start = i * maxLength // 开始截取的位置
                    let end = start + maxLength // 结束截取的位置
                    // 这里加一个是否是最后一行的判断
                    temp = value.substring(start, end) + (i === rowN - 1 ? '' : '\n')
                    ret += temp // 拼接最终的字符串
                  }
                  return ret
                } else {
                  return value
                }
              }
            }
          },
          {
            show: !this.options.hideyAxisLabel,
            inverse: true,
            data: this.options.yAxisLabel,
            // 坐标轴轴线
            axisLine: {
              show: this.options.hideyAxisLine === undefined ? true : !this.options.hideyAxisLine,
              lineStyle: {
                color: this.options.yAxisColor || '#fff'
              }
            },
            // 坐标轴刻度
            axisTick: {
              show: this.options.hideyAxisTick === undefined ? true : !this.options.hideyAxisTick,
              alignWithLabel: true
            },
            // 坐标轴刻度标签
            axisLabel: {
              fontSize: this.options.yAxisFontSize || 12,
              color: this.options.yAxisColor || '#fff'
            }
          }
        ],
        series: [
          {
            name: '内条',
            type: 'bar',
            barGap: '-100%',
            data: this.options.inside,
            barWidth: checkParameter(this.options.insideWidth, 25),
            itemStyle: {
              normal: {
                barBorderRadius: checkParameter(this.options.insideRadius, 25),
                color: function (params) {
                  let color = that.options.color || that.baseColor
                  let num = color.length
                  return color[params.dataIndex % num]
                }
              }
            },
            label: {
              normal: {
                show: true,
                position: this.options.insidePosition || 'inside',
                formatter: this.options.insideFormat || '{c}'
              }
            },
            z: 2
          },
          {
            name: '外条',
            type: 'bar',
            barGap: '-100%',
            data: this.options.outside,
            barWidth: checkParameter(this.options.outsideWidth, 25),
            itemStyle: {
              normal: {
                barBorderRadius: checkParameter(this.options.outsideRadius, 25),
                color: this.options.outsideBarBack || 'rgba(102, 102, 102, 0.5)'
              }
            },
            z: 1
          }
        ]
      }
      // 开启缩放
      if (isZoom) {
        this.polar.dataZoom = [
          {
            type: 'inside',
            show: true,
            yAxisIndex: [0],
            start: 1,
            end: 35
          }
        ]
      }
    },
    handleBarClick (event) {
      this.$emit('item-click', event, this.options.xAxis)
    }
  },
  mounted () {
    this.renderChart()
  }
}
</script>

<style>
</style>
