<template>
  <div class="echarts-container">
    <chart
      ref="bar"
      :options="polar"
      auto-resize
      v-if="options.xAxis && options.xAxis.length"
      @click="handleBarClick"></chart>
    <no-data :title="title" v-else></no-data>
  </div>
</template>

<script>
import NoData from './NoData'
import echarts from 'echarts'
import { checkParameter } from 'utils'
export default {
  name: 'BarChart',
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
        '#2e8a00',
        '#007fff',
        '#fe90bf',
        '#11feef',
        '#ff3890',
        '#ff644b',
        '#29c342',
        '#ff9600',
        '#a34be0',
        '#11b0ff'
      ],
      baseColors: [
        ['#4cc3ff', '#00aaff'],
        ['#d075eb', '#bc15fa'],
        ['#f8cf5c', '#fdba00'],
        ['#80ff94', '#1bb934'],
        ['#b8acfe', '#755ffc'],
        ['#ff9897', '#f650a0'],
        ['#ffa62e', '#ea5c0f'],
        ['#49fed4', '#04c792'],
        ['#7789f9', '#2a4ff3'],
        ['#fc557c', '#fe2457']
      ]
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
      let isZoom = this.options.xAxis && this.options.xAxis.length > 10
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
          right: checkParameter(this.options.gridRight, '4%'),
          bottom: checkParameter(this.options.gridBottom, '3%'),
          top: checkParameter(this.options.gridTop, '25%'),
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            show: !this.options.hidexAxis,
            data: this.options.xAxis,
            // 坐标轴轴线
            axisLine: {
              show: this.options.hidexAxisLine === undefined ? true : !this.options.hidexAxisLine,
              lineStyle: {
                color: this.options.xAxisColor || '#fff'
              }
            },
            // 坐标轴刻度
            axisTick: {
              show: this.options.hidexAxisTick === undefined ? true : !this.options.hidexAxisTick,
              alignWithLabel: true
            },
            // 坐标轴刻度标签
            axisLabel: {
              fontSize: this.options.xAxisFontSize || 12,
              // 坐标轴刻度标签的显示间隔，在类目轴中有效。可以设置成 0 强制显示所有标签。
              interval: 0,
              formatter (value) {
                let ret = '' // 拼接加\n返回的类目项
                let maxLength = that.options.xAxisMaxLength || 8 // 每项显示文字个数
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
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: checkParameter(this.options.minRange, null),
            max: checkParameter(this.options.maxRange, null),
            show: !this.options.hideyAxis,
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
            }
          }
        ]
      }
      // 多例
      if (this.options.legend && this.options.legend.length > 1) {
        this.polar.series = []
        this.options.legend.map((item, index) => {
          this.polar.series.push({
            name: item,
            type: 'bar',
            barMaxWidth: 25,
            data: this.options.yAxis[index],
            label: {
              show: this.options.showLabel,
              position: this.options.labelPosition || 'top',
              color: this.options.labelColor || '#fff',
              fontSize: this.options.labelFontSize || 12
            }
          })
        })
      // 单例
      } else {
        let color0 = ''
        let color1 = ''
        // 是否渐变
        if (this.options.isGradient) {
          if (this.options.color && this.options.color[0] && this.options.color[1]) {
            color0 = this.options.color[0]
            color1 = this.options.color[1]
          } else {
            color0 = this.baseColors[0][0]
            color1 = this.baseColors[0][1]
          }
        } else {
          if (this.options.color && this.options.color[0]) {
            color0 = this.options.color[0]
            color1 = this.options.color[0]
          } else {
            color0 = this.baseColor[0]
            color1 = this.baseColor[0]
          }
        }
        this.polar.series = [
          {
            name: this.options.legend ? this.options.legend[0] : this.options.text,
            type: 'bar',
            barMaxWidth: 25,
            data: this.options.yAxis,
            label: {
              show: this.options.showLabel,
              position: this.options.labelPosition || 'top',
              color: this.options.labelColor || '#fff',
              fontSize: this.options.labelFontSize || 12
            },
            itemStyle: {
              // 渐变
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 1, 0, 0, [{
                    offset: 0,
                    color: color0
                  }, {
                    offset: 1,
                    color: color1
                  }]
                ),
                barBorderRadius: 4
              }
            }
          }
        ]
      }
      // 开启缩放
      if (isZoom) {
        this.polar.dataZoom = [
          {
            type: 'inside',
            show: true,
            xAxisIndex: [0],
            start: 1,
            end: 35
          }
        ]
      }
      // 开启反转
      if (this.options.reverse) {
        ;[this.polar.xAxis, this.polar.yAxis] = [this.polar.yAxis, this.polar.xAxis]
        this.polar.yAxis[0].data = [...this.options.xAxis].reverse()
        this.polar.series = [
          {
            name: this.options.legend ? this.options.legend[0] : this.options.text,
            type: 'bar',
            barMaxWidth: 25,
            data: [...this.options.yAxis].reverse(),
            id: checkParameter(this.options.id, null),
            label: {
              show: this.options.showLabel,
              position: this.options.labelPosition || 'right',
              color: this.options.labelColor || '#fff',
              fontSize: this.options.labelFontSize || 12
            },
            itemStyle: this.options.isGradient ? {
              normal: {
                color (params) {
                  let index = that.options.color ? params.dataIndex % that.options.color.length : params.dataIndex % that.baseColors.length
                  return new echarts.graphic.LinearGradient(
                    1, 0, 0, 0, [{
                      offset: 0,
                      color: that.options.color ? that.options.color[index][0] : that.baseColors[index][0]
                    }, {
                      offset: 1,
                      color: that.options.color ? that.options.color[index][1] : that.baseColors[index][1]
                    }]
                  )
                },
                barBorderRadius: 40
              }
            } : {
              normal: {
                color (params) {
                  let index = that.options.color ? params.dataIndex % that.options.color.length : params.dataIndex % that.baseColors.length
                  return new echarts.graphic.LinearGradient(
                    1, 0, 0, 0, [{
                      offset: 0,
                      color: that.options.color ? that.options.color[index] : that.baseColor[index]
                    }, {
                      offset: 1,
                      color: that.options.color ? that.options.color[index] : that.baseColor[index]
                    }]
                  )
                },
                barBorderRadius: 40
              }
            }
          }
        ]
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
