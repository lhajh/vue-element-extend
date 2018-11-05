<template>
  <div class="upload">
    <el-row :gutter="20">
      <el-col :span="12">
        <h1>基础 - button</h1>
        <upload-file
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-success="handleSuccess"
          multiple
          icon>
        </upload-file>
      </el-col>
      <el-col :span="12">
        <h1>基础 - picture</h1>
        <upload-file
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-success="handleSuccess"
          multiple
          picture
          accept="image/*">
        </upload-file>
      </el-col>
      <el-col :span="12">
        <h1>拖拽</h1>
        <upload-file
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-success="handleSuccess"
          multiple
          drag>
        </upload-file>
      </el-col>
      <el-col :span="12">
        <h1>列表</h1>
        <upload-file
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-success="handleSuccess"
          multiple
          text="点击上传"
          tip="只能上传视频文件，且不超过500M"
          accept="video/*"
          :showList="true"
          :file-list="fileList">
        </upload-file>
      </el-col>
      <el-col :span="12">
        <h1>图片列表</h1>
        <upload-file
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-success="handleSuccess"
          multiple
          list-type="picture"
          text="点击上传"
          :showList="true"
          :file-list="fileList">
        </upload-file>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UploadFile from 'plugin/UploadFile'
export default {
  name: 'Upload',
  components: {
    UploadFile
  },
  mixins: [],
  props: {},
  data () {
    return {
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleSuccess () {}
  },
  created () {},
  mounted () {}
}
</script>

<style lang="less">
  .upload {
    h1 {
      font-size: 20px;
      margin-bottom: 20px;
    }
    .el-col {
      height: 200px;
      margin-bottom: 50px;
    }
    .upload-file {
      width: 100%;
    }
  }
</style>
