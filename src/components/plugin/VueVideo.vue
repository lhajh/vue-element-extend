<template>
  <div
    class="custom-video-container"
    :style="styleObject">
    <video
      v-if="videoShow"
      class="video-js vjs-default-skin"
      controls
      :id="videoId"
      preload="none"
      width="100%"
      height="100%"
      data-setup="{}"
      style="object-fit: fill;">
      <source src="" type="video/mp4">
    </video>
    <div v-else class="video-default-img" :style="styleObject">
      <div @click="showVideo" class="play-button"></div>
    </div>
  </div>
</template>
<script>
import 'static/plugin/video-js/video.js'
export default {
  name: 'custom-video-container',
  data () {
    return {
      videoJs: '',
      videoShow: false,
      styleObject: {
        width: this.videoWidth || '100%',
        height: this.videoHeight || '100%'
      }
    }
  },
  props: {
    // 视频路径
    videoSrc: {
      type: String,
      default: ''
    },
    videoIndex: {
      type: String,
      default: ''
    },
    // 配置项
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    // 视频高度
    videoHeight: {
      type: String,
      default: ''
    },
    // 视频宽度
    videoWidth: {
      type: String,
      default: ''
    },
    // 视频标签id
    videoId: {
      type: String,
      default: 'video_js'
    }
  },
  watch: {
    videoSrc (val) {
      this.videoShow = false
      this.videoJs && this.videoJs.dispose()
    }
  },
  methods: {
    showVideo () {
      this.videoShow = true
      this.$nextTick(() => {
        this.updateVideo(this.videoSrc)
      })
    },
    updateVideo (src) {
      let that = this
      this.videoJs = window.videojs(document.querySelector('#' + this.videoId), this.options).ready(function () {
        this.src(src)
        this.play()
        this.on('ended', () => {
          this.pause()
          that.$emit('videoFinished', that.videoIndex)
        })
      })
    }
  },
  mounted () {
    if (this.options.autoplay) {
      this.showVideo()
    }
  },
  beforeDestroy () {
    this.videoJs && this.videoJs.dispose()
  }
}
</script>
<style>
  .video-default-img{
    background-color: #000;
    position: relative;
    padding: 0;
    font-size: 10px;
    vertical-align: middle;
    font-weight: 400;
    font-style: normal;
    font-family: Arial,sans-serif;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .play-button:before{
    content: "\e001";
    font-family: VideoJS;
    line-height: 2.6em;
    text-shadow: 0.05em 0.05em 0.1em #000;
    text-align: center;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .play-button{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -2em;
    margin-top: -1.3em;
    font-size: 3em;
    display: block;
    z-index: 2;
    width: 4em;
    height: 2.6em;
    text-align: center;
    cursor: pointer;
    opacity: 1;
    background-color: rgba(7, 20, 30, .7);
    border: .1em solid #3b4249;
    -webkit-border-radius: .8em;
    -moz-border-radius: .8em;
    border-radius: .8em;
    -webkit-box-shadow: 0 0 1em rgba(255, 255, 255, .25);
    -moz-box-shadow: 0 0 1em rgba(255, 255, 255, .25);
    box-shadow: 0 0 1em rgba(255, 255, 255, .25);
    -webkit-transition: all .4s;
    -moz-transition: all .4s;
    -o-transition: all .4s;
    transition: all .4s;
  }
  .video-default-img:hover .play-button {
    outline: 0;
    border-color: #fff;
    background-color: rgba(50, 50, 50, .75);
    -webkit-box-shadow: 0 0 3em #fff;
    -moz-box-shadow: 0 0 3em #fff;
    box-shadow: 0 0 3em #fff;
    -webkit-transition: all 0s;
    -moz-transition: all 0s;
    -o-transition: all 0s;
    transition: all 0s;
  }
</style>
