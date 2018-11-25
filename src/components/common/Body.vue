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
          name: 'Readme',
          child: [
            'Readme'
          ]
        },
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
        },
        {
          name: 'Ueditor',
          child: [
            'Ue'
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
  h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  a {
    color: #fff;
  }
  h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  .el-aside {
    background-color: #d3dce6;
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
