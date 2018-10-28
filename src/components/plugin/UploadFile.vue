<template>
  <div class="upload-file">
    <el-upload
      ref="upload"
      :class="[
        'upload',
        { 'is-picture': picture }
      ]"
      :multiple="multiple"
      :drag="drag"
      :accept="accept"
      :action="action"
      :data="uploadParams"
      :disabled="disabled"
      :show-file-list="showList"
      :file-list="fileList"
      :on-preview="handlePreview"
      :on-remove="uploadRemove"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-progress="progress"
      :before-upload="beforeUpload">
      <div v-if="picture">
        <img v-if="imageUrl" :src="imageUrl" class="avatar"
          :style="{width, height}">
        <vue-video v-else-if="videoSrc" :videoSrc="videoSrc" :videoHeight="height" :videoWidth="width"></vue-video>
        <i v-else class="el-icon-plus avatar-uploader-icon"
          :style="{width, height, lineHeight}"></i>
      </div>
      <div v-else>
        <el-button
          :size="btnSize"
          :type="btnType"
          :plain="btnPlain"
          :round="btnRound"
          :circle="btnCircle"
          :disabled="disabled"
          :class="btnClass">
          <i v-if="icon" class="el-icon-upload"></i>
          <span>{{text}}</span>
        </el-button>
      </div>
      <div v-if="tip" slot="tip" class="el-upload__tip">{{tip}}</div>
    </el-upload>
    <el-dialog
      class="upload-dialog"
      title="上传列表"
      append-to-body
      :visible.sync="!showList && files.length > 0"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="close">
      <transition-group
        tag="ul"
        :class="[
          'el-upload-list',
          'el-upload-list--text',
          { 'is-disabled': disabled }
        ]"
        name="el-list">
        <li
          v-for="(file, index) in files"
          :class="['el-upload-list__item2', 'is-' + file.status]"
          :key="index">
          <a class="el-upload-list__item-name" @click="handleClick(file)">
            <i class="el-icon-document"></i>{{file.name}}
          </a>
          <i @click="file.status !== 'success' ? remove(file) : handleClick(file)"
            :class="{
              'el-icon-upload-success': file.status === 'success',
              'el-icon-close': file.status !== 'success',
              'circle-check': true
            }">
          </i>
          <el-progress
            v-if="file.status === 'uploading'"
            type="line"
            :stroke-width="2"
            :percentage="parsePercentage(file.percentage)">
          </el-progress>
        </li>
      </transition-group>
    </el-dialog>
  </div>
</template>

<script>
import api from 'api'
import GetUserInfo from 'mixins/getUserInfo'
import VueVideo from 'plugin/VueVideo'
export default {
  that: this,
  name: 'UploadFile',
  components: {
    VueVideo
  },
  mixins: [GetUserInfo],
  props: {
    // 上传路径
    actionUrl: {
      type: String,
      default: ''
    },
    // 提示按钮文字
    text: {
      type: String,
      default: '上传文件'
    },
    // button
    // 尺寸
    btnSize: {
      type: String,
      default: 'mini'
    },
    // 类型
    btnType: {
      type: String,
      default: 'primary'
    },
    // 朴素
    btnPlain: {
      type: Boolean,
      default: false
    },
    // 圆角
    btnRound: {
      type: Boolean,
      default: false
    },
    // 圆形
    btnCircle: {
      type: Boolean,
      default: false
    },
    btnClass: {
      type: String,
      default: ''
    },
    // 上传类型限制，默认不限制
    accept: {
      type: String,
      default: ''
    },
    // 上传文件类型
    fileType: {
      type: String,
      default: ''
    },
    // 提示
    tip: {
      type: String,
      default: ''
    },
    // 图片上传回显路径，上传成功回调里设置
    imageUrl: {
      type: String,
      default: ''
    },
    videoSrc: {
      type: String,
      default: ''
    },
    // 图片宽度
    width: {
      type: String,
      default: '200px'
    },
    // 图片高度
    height: {
      type: String,
      default: '100px'
    },
    // 图片行高
    lineHeight: {
      type: String,
      default: '100px'
    },
    // admin 上传需要该参数
    adminParkId: {
      type: String,
      default: ''
    },
    // 参数
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    // 上传列表
    fileList: {
      type: Array,
      default () {
        return []
      }
    },
    // 是否显示图标，默认不显示
    icon: {
      type: Boolean,
      default: false
    },
    // 上传类型是否是图片，默认按钮上传
    picture: {
      type: Boolean,
      default: false
    },
    // 是否启用拖拽，默认不启用
    drag: {
      type: Boolean,
      default: false
    },
    // 是否多选，默认单选
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否禁用，默认否
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否显示上传列表，默认否
    showList: {
      type: Boolean,
      default: false
    },
    // 移除
    uploadRemove: Function,
    // 成功回调
    uploadSuccess: {
      type: Function,
      required: true
    },
    // 上传前自定义校验
    regUpload: Function,
    handlePreview: Function
  },
  data () {
    return {
      uploadParams: {},
      action: '',
      files: []
    }
  },
  computed: {},
  watch: {
    files: {
      handler: function (val, oldVal) {
        if (!this.showList) {
          if (this.files.length && this.files.every(item => item.status === 'success')) {
            setTimeout(() => {
              this.files.splice(0)
            }, 1000)
          }
        }
      },
      deep: true
    },
    adminParkId (data) {
      if (data) {
        this.action = this.actionUrl || api.uploadFile(data)
      }
    },
    data (data) {
      this.uploadParams = {
        ...this.uploadParams,
        ...data
      }
    }
  },
  methods: {
    // 计算上传进度
    parsePercentage (val) {
      if (val >= 99) {
        return 99
      } else {
        return parseInt(val, 10)
      }
    },
    // 获取上传策略
    fetchPolicy () {
      this.$get(api.fetchPolicy(this.adminParkId || this.parkId)).then(res => {
        for (const key in res.data) {
          if (res.data.hasOwnProperty(key)) {
            this.uploadParams[key] = res.data[key]
          }
        }
      }).catch(mes => {
        console.log(mes)
      })
    },
    getSuffix (filename) {
      let pos = filename.lastIndexOf('.')
      let suffix = ''
      if (pos !== -1) {
        suffix = filename.substring(pos)
      }
      return suffix
    },
    // 上传前
    beforeUpload (file) {
      const isLt500M = file.size / 1024 / 1024 < 500
      if (!isLt500M) {
        this.$mes.warning('上传文件大小不能超过 500MB!')
      } else {
        // let now = Date.parse(new Date()) / 1000
        // if (this.uploadParams.expire && this.uploadParams.expire < now + 3) {
        //   this.fetchGetPolicy()
        // }
        this.uploadParams.key = this.$moment(new Date().getTime()).format('YYYYMMDDHHmmss') + this.getSuffix(file.name)
      }
      return isLt500M && (this.regUpload ? this.regUpload(file) : true)
    },
    // 上传进度条
    progress (event, file, fileList) {
      this.files = fileList
    },
    // 上传失败
    uploadError () {
      this.$mes.warning('上传失败，请重新上传')
    },
    // 取消上传
    remove (file) {
      this.$confirm(`确定要取消上传该文件吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs['upload'].abort(file)
        this.files.splice(this.files.indexOf(file), 1)
      }).catch(() => {})
    },
    // 关闭进度条
    close () {
      if (this.files.every(item => item.status === 'success')) {
        this.files.splice(0)
      } else {
        let filesArr = []
        this.files.forEach(item => {
          if (item.status !== 'success') {
            filesArr.push(item)
          }
        })
        this.$confirm(`有 ${filesArr.length} 项上传任务正在进行。确定要取消上传吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          filesArr.forEach(item => {
            this.$refs['upload'].abort(item)
          })
          this.files.splice(0)
        }).catch(() => {})
      }
    },
    handleClick (file) {
      this.handlePreview && this.handlePreview(file)
    },
    init () {
      // this.fetchPolicy()
      this.uploadParams = {
        ...this.data,
        fileType: this.fileType
      }
      this.action = this.actionUrl || api.uploadFile(this.adminParkId || this.parkId)
    }
  },
  created () {},
  mounted () {}
}
</script>

<style lang="less">
  .upload-file {
    display: inline-block;
    .is-picture {
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        text-align: center;
      }
      .avatar {
        display: block;
      }
    }
  }
  .upload-dialog {
    .el-dialog__body {
      padding: 15px!important;
      .el-upload-list__item2 {
        transition: all .5s cubic-bezier(.55,0,.1,1);
        font-size: 14px;
        color: #48576a;
        line-height: 1.8;
        margin-top: 5px;
        box-sizing: border-box;
        border-radius: 4px;
        width: 100%;
        position: relative;
        .circle-check {
          position: absolute;
          top: 2px;
          right: 2px;
          font-size: 20px;
        }
        .el-icon-upload-success {
          color: #13ce66;
          &:before {
            content: "\E639";
          }
        }
        .el-icon-close {
          cursor: pointer;
          opacity: .75;
          color: #48576a;
          -ms-transform: scale(.7);
          transform: scale(.7);
        }
      }
    }
  }
</style>
