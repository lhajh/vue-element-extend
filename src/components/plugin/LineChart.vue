<template>
  <div class="echarts-container">
    <chart
      ref="line"
      :options="polar"
      auto-resize
      v-if="options.xAxis && options.xAxis.length"
      @click="handleLineClick"></chart>
    <no-data :title="title" v-else></no-data>
  </div>
</template>

<script>
import NoData from './NoData'
import { checkParameter } from 'utils/toggle'
export default {
  name: 'LineChart',
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
      let that = this
      this.title = this.options.text || this.options.toolboxName || ''
      let isZoom = this.options.xAxis && this.options.xAxis.length > 10
      let markData = []
      // 当开启缩放后，不能使用气球样式
      if (!isZoom && !this.options.hideMark) {
        if (this.options.yAxis && Object.prototype.toString.call(this.options.yAxis) === '[object Array]') {
          markData = this.options.yAxis.map((item, index) => ({coord: [index, item], value: item}))
        }
      }
      this.polar = {
        color: this.options.color || this.baseColor,
        // 标题
        title: {
          text: this.options.text || '',
          textStyle: {
            color: this.options.textColor || '#fff'
          },
          subtext: this.options.subtext || (isZoom ? '当前数据较多，请滚动鼠标或缩放屏幕查看完整数据' : ''),
          subtextStyle: {
            color: this.options.subtextColor || '#f49800',
            fontSize: this.options.subtextFontSize || 12
          },
          left: this.options.titleLeft || 'center'
        },
        // 图例
        legend: {
          type: 'scroll', // 只有容器放不下图例, scroll 才会生效
          show: this.options.showLegend || (this.options.legend && this.options.legend.length > 1),
          data: this.options.legend || [this.options.text],
          right: !this.options.hideTooltip ? 50 : 20,
          top: checkParameter(this.options.legendTop, 35),
          itemWidth: 40,
          itemHeight: 20,
          textStyle: {
            color: this.options.legendColor || '#fff'
          }
        },
        // 提示框
        tooltip: {
          show: !this.options.hideTooltip,
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: this.options.tooltipType || 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // 工具栏
        toolbox: {
          show: !this.options.hideToolBox,
          feature: {
            saveAsImage: {
              show: !this.options.hideImage,
              name: this.options.toolboxName || this.options.text,
              backgroundColor: 'rgba(0, 35, 55, 1)'
            }
          },
          right: checkParameter(this.options.toolboxRight, 25),
          top: checkParameter(this.options.toolboxTop, 20),
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
            // boundaryGap: false, // 坐标轴两边留白策略 默认 true
            show: !this.options.hidexAxis,
            data: this.options.xAxis,
            // 坐标轴轴线
            axisLine: {
              show: !this.options.hideAxisLine,
              lineStyle: {
                color: this.options.xAxisColor || '#fff'
              }
            },
            // 坐标轴在 grid 区域中的分隔线
            splitLine: {
              show: this.options.showxAxisSplitLine,
              lineStyle: {
                opacity: checkParameter(this.options.xAxisLineOpacity, 1)
              }
            },
            // 坐标轴刻度
            axisTick: {
              length: checkParameter(this.options.xAxisTickLength, 5),
              alignWithLabel: true
            },
            // 坐标轴刻度标签
            axisLabel: {
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
            splitNumber: checkParameter(this.options.yAxisSplitNumber, 5),
            show: !this.options.hideyAxis,
            // 坐标轴轴线
            axisLine: {
              show: !this.options.hideAxisLine,
              lineStyle: {
                color: this.options.yAxisColor || '#fff'
              }
            },
            // 坐标轴在 grid 区域中的分隔线
            splitLine: {
              show: !this.options.hideyAxisSplitLine,
              lineStyle: {
                color: this.options.yAxisSplitLineColor || '#ccc',
                opacity: this.options.yAxisSplitLineOpacity || 1
              }
            },
            // 坐标轴刻度
            axisTick: {
              length: checkParameter(this.options.yAxisTickLength, 5),
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
            type: 'line',
            id: this.options.id && this.options.id[index],
            lineStyle: {
              normal: {
                width: 3
              }
            },
            symbolSize: 10,
            data: this.options.yAxis[index]
          })
        })
      // 单例
      } else {
        this.polar.series = [
          {
            name: this.options.text,
            type: 'line',
            data: this.options.yAxis,
            // 文字在圆圈中显示
            label: {
              normal: {
                show: this.options.showLabel || isZoom,
                fontSize: this.options.labelFontSize || 12,
                fontWeight: this.options.labelFontWeight || 'normal',
                formatter: this.options.labelFormat || '{c}',
                offset: this.options.labelOffset || [0, 25]
              }
            },
            symbolSize: checkParameter(this.options.symbolSize, isZoom ? 30 : 5),
            // 气球显示
            markPoint: {
              data: markData
            },
            // 设置区域颜色渐变
            areaStyle: {
              normal: {
                opacity: this.options.areaOpacity || 0,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: (this.options.color && this.options.color[0]) || this.baseColor[0] // 0% 处的颜色
                  },
                  {
                    offset: 1, color: (this.options.color && this.options.color[1]) || this.baseColor[1] // 100% 处的颜色
                  }],
                  globalCoord: true // 缺省为 false
                }
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
    },
    handleLineClick (event) {
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
