<template>
  <div class="progress-bar-chart">
    <el-row :gutter="20">
      <el-col :span="12" v-for="item in bars" :key="item.id">
        <bar-chart :options="item.bar"></bar-chart>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarChart from 'plugin/ProgressBarChart'
export default {
  name: 'ProgressBarChart',
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
            inside: [1758, 830, 509, 384.4],
            name: [
              '基建总投资额(万元)',
              '已完成投资额(万元)',
              '已签约合同额(万元)',
              '已支出金额(万元)'
            ],
            yAxisMaxLength: 100,
            hideyAxisLabel: true,
            hideyAxisLine: true,
            hideyAxisTick: true,
            insidePosition: 'right',
            hideToolBox: true,
            hideTooltip: true,
            gridLeft: 10,
            gridRight: 30,
            gridTop: 20,
            gridBottom: 0,
            colors: ['#9966ff', '#00c0ef', '#feb74a', '#ff6699'],
            outsideBarBack: 'transparent'
          }
        },
        {
          id: 2,
          bar: {
            text: '带背景条',
            name: ['全部任务', '设计协调', '工程协调', '合约洽商', '变更洽商'],
            // 实际总数
            yAxisLabel: [22, 9, 6, 1, 6],
            // 占比百分数
            inside: [82, 89, 83, 100, 67],
            // 百分数底数
            outside: [100, 100, 100, 100, 100],
            // 实际数
            insideFormat: function (params) {
              return [
                parseInt(82 * 22 / 100, 10),
                parseInt(89 * 9 / 100, 10),
                parseInt(83 * 6 / 100, 10),
                parseInt(100 * 1 / 100, 10),
                parseInt(67 * 6 / 100, 10)
              ][params.dataIndex]
            },
            hideToolBox: true,
            hideTooltip: true,
            hideyAxisLine: true,
            hideyAxisTick: true,
            gridRight: 10,
            gridTop: 20,
            gridBottom: -20
          }
        },
        {
          id: 3,
          bar: {
            isGradient: true,
            text: '渐变',
            name: ['全部任务', '设计协调', '工程协调', '合约洽商', '变更洽商'],
            // 实际总数
            yAxisLabel: [22, 9, 6, 1, 6],
            // 占比百分数
            inside: [82, 89, 83, 100, 67],
            // 百分数底数
            outside: [100, 100, 100, 100, 100],
            // 实际数
            insideFormat: function (params) {
              return [
                parseInt(82 * 22 / 100, 10),
                parseInt(89 * 9 / 100, 10),
                parseInt(83 * 6 / 100, 10),
                parseInt(100 * 1 / 100, 10),
                parseInt(67 * 6 / 100, 10)
              ][params.dataIndex]
            },
            hideToolBox: true,
            hideTooltip: true,
            hideyAxisLine: true,
            hideyAxisTick: true,
            gridRight: 10,
            gridTop: 20,
            gridBottom: -20
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
  .progress-bar-chart {
    padding: 10px;
    .el-col {
      height: 300px;
      margin-bottom: 50px;
    }
  }
</style>
