<template>
  <div class="body h100">
    <el-container class="h100">
      <el-aside class="h100" width="200px">
        <el-scrollbar>
        <el-menu
          router
          :default-active="activeIndex"
          class="el-menu-vertical-demo">
          <el-menu-item-group
            v-for="item in router" :key="item.name"
            :title="item.name">
            <el-menu-item
              v-for="ele in item.child" :key="ele"
              :index="`/${ele}`">{{ele}}</el-menu-item>
          </el-menu-item-group>
        </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main class="h100">
        <el-scrollbar>
          <router-view/>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Body',
  components: {},
  mixins: [],
  props: {},
  data () {
    let url = window.location.hash.substring(1).indexOf('?')
    return {
      router: [
        {
          name: 'Vue',
          child: [
            'Modifiers'
          ]
        },
        {
          name: 'ElementUI',
          child: [
            'TreeCheckboxs',
            'EditableTable',
            'Upload'
          ]
        },
        {
          name: 'Echart',
          child: [
            'BaseLineChart',
            'BaseBarChart',
            'BasePieChart',
            'ProgressBarChart',
            'ProgressPieChart',
            'BarArrowChart'
          ]
        }
      ],
      activeIndex: url === -1 ? window.location.hash.substring(1) : window.location.hash.substring(1, +url + 1)
    }
  },
  computed: {},
  watch: {
    $route (url) {
      this.activeIndex = url.path
    }
  },
  methods: {},
  created () {},
  mounted () {}
}
</script>

<style lang="less">
  .body {
    .el-aside {
      background-color: #D3DCE6;
      color: #fff;
      text-align: center;
      overflow: hidden;
      padding-right: 10px;
      .el-menu {
        background: transparent;
        border: none;
      }
    }
    .el-main {
      background-color: #33404c;
      color: #fff;
    }
  }
</style>
