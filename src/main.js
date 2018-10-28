// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Echarts from 'vue-echarts'

// reset css
import 'assets/css/reset.css'
// 自定义样式
import 'assets/css/custom.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.component('chart', Echarts)

// 解决在 IE 下，当手动修改 url 的 hash 的时候浏览器没有做出相应
if (
  '-ms-scroll-limit' in document.documentElement.style &&
  '-ms-ime-align' in document.documentElement.style
) {
  // detect it's IE11
  window.addEventListener(
    'hashchange',
    function (event) {
      let currentPath = window.location.hash.slice(1)
      router.push(currentPath)
    },
    false
  )
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
