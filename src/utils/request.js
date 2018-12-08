import Axios from 'axios'
import qs from 'qs'
import { Message, Loading } from 'element-ui'
// import Cookies from 'js-cookie'

const pathname = window.location.pathname

// const token = Cookies.get('token')

// 设置公共请求头
// Axios.defaults.headers.common['token'] = token

/**
 * get
 * @param  {String} url -必选   [地址]
 * @param  {Object} params -可选 [参数]
 * @param  { Boolean } isLoading -可选 [是否显示加载状态, 默认显示]
 * @return {Object}        [Promise]
 */
export const $get = (url, params, isLoading = true) => {
  // if (token !== Cookies.get('token')) {
  //   window.location.reload()
  //   return
  // }
  // 遮罩层
  if (isLoading) {
    var loadingInstance = Loading.service({ text: '正在加载中' })
  }
  return new Promise((resolve, reject) => {
    Axios.get(url, {
      params: {
        ...params,
        _t: Date.now()
      }
    })
      .then(res => {
        if (isLoading) {
          loadingInstance.close()
        }
        if (res.status === 200) {
          if (res.data.code === 0) {
            resolve(res.data)
          } else if (res.data.code === 401) {
            failMessage(res.data.message)
            setTimeout(() => {
              window.location.href = `${pathname}static/login.html`
            }, 2000)
          } else {
            failMessage(res.data.message)
            reject(res)
          }
        } else {
          failMessage()
          reject(res)
        }
      })
      .catch(mes => {
        if (isLoading) {
          loadingInstance.close()
        }
        if (mes.response.status === 306) {
          failMessage('您身份已过期，3秒后返回登录页面')
          // Cookies.remove('token')
          setTimeout(() => {
            window.location.href = `${pathname}static/login.html`
          }, 3000)
        } else if (mes.response.status === 403) {
          failMessage('无访问权限')
          reject(mes.response.data)
        } else {
          failMessage(mes.response.data.message)
          reject(mes.response.data)
        }
      })
  })
}
/**
 * post
 * @param  {String} url -必选   [地址]
 * @param  {Object || Array} params -必选 [参数]
 * @param  {String} type -可选  [设定为 form 为 formdata 提交]
 * @param  { Boolean } isLoading -可选 [是否显示加载状态, 默认显示]
 * @return {Object}        [Promise]
 */
export const $post = (url, params, type, isLoading = true) => {
  // if (token !== Cookies.get('token')) {
  //   window.location.reload()
  //   return
  // }
  if (isLoading) {
    var loadingInstance = Loading.service({ text: '正在加载中' })
  }
  if (type === 'form') {
    return new Promise((resolve, reject) => {
      Axios.post(url, qs.stringify(params), {})
        .then(res => {
          if (isLoading) {
            loadingInstance.close()
          }
          if (res.status === 200) {
            if (res.data.code === 0) {
              resolve(res.data)
            } else if (res.data.code === 401) {
              failMessage(res.data.message)
              setTimeout(() => {
                window.location.href = `${pathname}static/login.html`
              }, 2000)
            } else {
              failMessage(res.data.message)
              reject(res)
            }
          } else {
            failMessage()
            reject(res)
          }
        })
        .catch(mes => {
          if (isLoading) {
            loadingInstance.close()
          }
          failMessage(mes.response.data.message)
          reject(mes.response.data)
        })
    })
  } else {
    return new Promise((resolve, reject) => {
      Axios.post(url, params, {})
        .then(res => {
          if (isLoading) {
            loadingInstance.close()
          }
          if (res.status === 200) {
            if (res.data.code === 0) {
              resolve(res.data)
            } else if (res.data.code === 401) {
              failMessage(res.data.message)
              setTimeout(() => {
                window.location.href = `${pathname}static/login.html`
              }, 2000)
            } else {
              failMessage(res.data.message)
              reject(res)
            }
          } else {
            failMessage()
            reject(res)
          }
        })
        .catch(mes => {
          if (isLoading) {
            loadingInstance.close()
          }
          if (mes.response.status === 306) {
            failMessage('您身份已过期，3秒后返回登录页面')
            setTimeout(() => {
              window.location.href = `${pathname}static/login.html`
            }, 3000)
          } else if (mes.response.status === 403) {
            failMessage('无访问权限')
            reject(mes.response.data)
          } else {
            failMessage()
            reject(mes.response.data)
          }
        })
    })
  }
}

function failMessage (mes = '数据获取失败') {
  Message({
    showClose: true,
    message: mes,
    type: 'warning'
  })
}
