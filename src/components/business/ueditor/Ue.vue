<template>
<div class="ue">
  <el-row :gutter="20">
    <el-col :span="24">
      <h2>编辑 - 默认配置</h2>
      <u-editor v-model="value"></u-editor>
    </el-col>
    <el-col :span="24">
      <h2>编辑 - 自定义 toolbars</h2>
      <u-editor
        v-model="value"
        :config="config"></u-editor>
    </el-col>
    <el-col :span="12">
      <h2>展示 - 固定高度</h2>
      <u-editor
        v-model="value"
        disabled
        height="300px"></u-editor>
    </el-col>
    <el-col :span="12">
      <h2>展示 - 高度被内容撑开</h2>
      <u-editor
        v-model="value"
        disabled></u-editor>
    </el-col>
  </el-row>
</div>
</template>

<script>
import UEditor from 'plugin/UEditor'
export default {
  name: 'Ue',
  components: {UEditor},
  mixins: [],
  props: {},
  data () {
    return {
      value: '',
      config: {
        toolbars: [
          [
            'undo', // 撤销
            'redo', // 重做
            '|',
            'fontfamily', // 字体
            'fontsize', // 字号
            'forecolor', // 字体颜色
            'backcolor', // 背景色
            'bold', // 加粗
            'indent', // 首行缩进
            'italic', // 斜体
            'underline', // 下划线
            'strikethrough', // 删除线
            '|',
            'paragraph', // 段落格式
            'customstyle', // 自定义标题
            'justifyleft', // 居左对齐
            'justifyright', // 居右对齐
            'justifycenter', // 居中对齐
            'justifyjustify', // 两端对齐
            '|',
            'rowspacingtop', // 段前距
            'rowspacingbottom', // 段后距
            'pagebreak', // 分页
            'lineheight', // 行间距
            '|',
            'insertorderedlist', // 有序列表
            'insertunorderedlist', // 无序列表
            'subscript', // 下标
            'superscript', // 上标
            '|',
            'horizontal', // 分隔线
            'time', // 时间
            'date', // 日期
            'removeformat', // 清除格式
            'cleardoc', // 清空文档
            '|',
            'inserttable', // 插入表格
            'insertrow', // 前插入行
            'insertcol', // 前插入列
            'mergeright', // 右合并单元格
            'mergedown', // 下合并单元格
            'deleterow', // 删除行
            'deletecol', // 删除列
            'splittorows', // 拆分成行
            'splittocols', // 拆分成列
            'splittocells', // 完全拆分单元格
            'deletecaption', // 删除表格标题
            'inserttitle', // 插入标题
            'mergecells', // 合并多个单元格
            'deletetable' // 删除表格
          ]
        ]
      }
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
.ue {
  .u-editor {
    color: #000;
    .edui-default .edui-editor {
      // width: 100%!important;
    }
  }
}
</style>
