import axios from 'axios'
import store from '../store'
import router from '../router'
import config from '../config'

const io = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? config.baseURL.pro : config.baseURL.dev,
  timeout: 10000
})
// 请求过滤器
io.interceptors.request.use(config => {
  if (config.method !== 'get') {
    let user = store.state.globalStore.user
    if (user && Object.keys(user).length > 0) {
      let ctoken = user.csrfToken
      if (config.method === 'post' || config.method === 'put' || config.method === 'patch') {
        // 判断参数是否经过stringify转换
        if (typeof config.data === 'object') {
          config.data.ctoken = ctoken
        } else {
          if (config.data) {
            config.data += '&ctoken=' + ctoken
          } else {
            config.data = 'ctoken=' + ctoken
          }
        }
      } else if (config.method === 'delete') {
        if (config.url.indexOf('?') === -1) {
          config.url += '?ctoken=' + ctoken
        } else {
          config.url += '&ctoken=' + ctoken
        }
      }
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应过滤器
io.interceptors.response.use(res => {
  try {
    if (res) {
      switch (res.status) {
        case 200:
          if (res.data.success && !res.data.success) {
            router.push({ name: 'Error403' })
            return res.data
          } else {
            return res.data
          }
      }
    }
  } catch (e) {
    return Promise.reject(e)
  }
}, err => {
  try {
    if (err.response) {
      switch (err.response.status) {
        case 404:
          console.log('404 error')
          break
        case 500:
          console.log('500 err')
          break
        default:
          console.log('unknow err')
      }
    }
    return Promise.reject(err)
  } catch (e) {
    return Promise.reject(e)
  }
})

export default io
