<template>
  <div class="bar-arrow-chart h100">
    <span v-if="arrow"
      :class="['nav-arrow', 'nav-prev', {disabled: prev}]"
      @click="prevData()">
      <i class="el-icon-arrow-left"></i>
    </span>
    <span v-if="arrow"
      :class="['nav-arrow', 'nav-next', {disabled: next}]"
      @click="nextData()">
      <i class="el-icon-arrow-right"></i>
    </span>
    <bar-chart :options="options" @item-click="itemClick"></bar-chart>
  </div>
</template>

<script>
import BarChart from 'plugin/BarChart'
export default {
  name: 'BarArrowChart',
  components: { BarChart },
  mixins: [],
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      arrow: false,
      prev: false,
      next: false,
      space: 4,
      num: 0,
      options: {}
    }
  },
  computed: {},
  watch: {
    data: {
      handler: function () {
        this.arrow = false
        this.prev = false
        this.next = false
        this.num = 0
        this.space = this.data.space || this.space
        if (this.data.xAxis) {
          this.nextData()
        } else {
          this.options = {}
        }
      },
      deep: true
    }
  },
  methods: {
    prevData () {
      if (!this.prev) {
        let len = this.data.xAxis.length
        this.num--
        this.options = {}
        this.$nextTick(() => {
          this.options = { ...this.data }
          this.options.xAxis = this.data.xAxis.slice(
            this.space * (this.num - 1),
            this.space * this.num
          )
          if (this.multiarr(this.data.yAxis)) {
            this.options.yAxis = this.data.yAxis.map(item =>
              item.slice(this.space * (this.num - 1), this.space * this.num)
            )
          } else {
            this.options.yAxis = this.data.yAxis.slice(
              this.space * (this.num - 1),
              this.space * this.num
            )
          }
          if (this.data.reverse) {
            this.options.xAxis = this.options.xAxis.reverse()
            this.options.yAxis = this.options.yAxis.reverse()
          }
        })
        this.arrow = len > this.space
        this.prev = !(this.num - 1)
        this.next = !(len > this.space * this.num)
      }
    },
    nextData () {
      if (!this.next) {
        let len = this.data.xAxis.length
        this.num++
        this.options = {}
        this.$nextTick(() => {
          this.options = { ...this.data }
          this.options.xAxis = this.data.xAxis.slice(
            this.space * (this.num - 1),
            this.space * this.num
          )
          if (this.multiarr(this.data.yAxis)) {
            this.options.yAxis = this.data.yAxis.map(item =>
              item.slice(this.space * (this.num - 1), this.space * this.num)
            )
          } else {
            this.options.yAxis = this.data.yAxis.slice(
              this.space * (this.num - 1),
              this.space * this.num
            )
          }
          if (this.data.reverse) {
            this.options.xAxis = this.options.xAxis.reverse()
            this.options.yAxis = this.options.yAxis.reverse()
          }
        })
        this.arrow = len > this.space
        this.prev = !(this.num - 1)
        this.next = !(len > this.space * this.num)
      }
    },
    multiarr (arr) {
      for (let i = 0, len = arr.length; i < len; i++) if (arr[i] instanceof Array) return true
      return false
    },
    itemClick (ev, xAxis) {
      this.$emit('item-click', ev, xAxis)
    }
  },
  created () {},
  mounted () {
    this.space = this.data.space || this.space
    if (this.data.xAxis) {
      this.nextData()
    } else {
      this.options = {}
    }
  }
}
</script>

<style lang="less">
.bar-arrow-chart {
  position: relative;
  .nav-arrow {
    position: absolute;
    top: 50%;
    margin-top: -20px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    &.disabled {
      cursor: not-allowed;
    }
  }
  .nav-prev {
    left: -10px;
  }
  .nav-next {
    right: -10px;
  }
}
</style>
