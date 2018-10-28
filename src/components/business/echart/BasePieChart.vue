<template>
  <div class="base-pie-chart">
    <el-row :gutter="20">
      <el-col :span="12" v-for="item in pies" :key="item.id">
        <pie-chart :options="item.pie"></pie-chart>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PieChart from 'plugin/PieChart'
export default {
  name: 'BasePieChart',
  components: {
    PieChart
  },
  mixins: [],
  props: {},
  data () {
    return {
      pies: [
        {
          id: 1,
          pie: {

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
  .base-pie-chart {
    padding: 10px;
    .el-col {
      height: 300px;
      margin-bottom: 20px;
    }
  }
</style>
