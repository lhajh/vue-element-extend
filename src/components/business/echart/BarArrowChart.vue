<template>
  <div class="bar-arrow-chart">
    <el-row :gutter="20">
      <el-col :span="12" v-for="item in bars" :key="item.id">
        <bar-chart :options="item.bar"></bar-chart>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarChart from 'plugin/BarArrowChart'
export default {
  name: 'BarArrowChart',
  components: {
    BarChart
  },
  mixins: [],
  props: {},
  data () {
    return {
      bars: [
        {
          id: 1,
          bar: {
            text: '基础',
            xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            yAxis: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        },
        {
          id: 2,
          bar: {
            isGradient: true,
            color: ['#d075eb', '#bc15fa'],
            text: '渐变',
            xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            yAxis: [820, 932, 901, 934, 1290, 1330, 1320],
            minRange: function (value) {
              return value.min - 100
            }
          }
        },
        {
          id: 3,
          bar: {
            isGradient: true,
            reverse: true,
            text: '反转',
            xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            yAxis: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        },
        {
          id: 4,
          bar: {
            isGradient: true,
            text: '多例',
            legend: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
            xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            yAxis: [
              [120, 132, 101, 134, 90, 230, 210],
              [220, 182, 191, 234, 290, 330, 310],
              [150, 232, 201, 154, 190, 330, 410],
              [320, 332, 301, 334, 390, 330, 320],
              [820, 932, 901, 934, 1290, 1330, 1320]
            ],
            minRange: function (value) {
              return value.min - 100
            }
          }
        }
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>

<style lang="less">
  .bar-arrow-chart {
    padding: 10px;
    .el-col {
      height: 300px;
      margin-bottom: 50px;
    }
  }
</style>
