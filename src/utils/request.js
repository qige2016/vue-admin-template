import axios from 'axios'
import { Message } from 'element-ui'
import { guid, trim } from '@/utils/index'
import { getToken } from '@/utils/auth'
import { getSign, postSign } from '@/utils/sign'
import store from '@/store'
import router from '@/router/index'

const isSign = false // 开启关闭sign签名验证
const securityKey = ''// 后端提供安全码
let uuid = 'cms' + guid()

// create an axios instance
const service = axios.create({
  baseURL: '/mock',
  timeout: 30000, // request timeout
  headers: {msgId: uuid, from: 'PORTAL', 'Content-Type': 'application/json;charset=UTF-8'}
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['operatorToken'] = getToken()
    } else {
      config.headers['operatorToken'] = ''
    }
    // 去除前后空格
    if (config.method === 'get') {
      config.params = trim(config.params)
      // loading
      store.commit('SET_LOADING', true)
    } else {
      config.data = trim(config.data)
    }
    if (isSign) {
      if (config.method === 'get') {
        let timestamp = new Date().getTime()
        config.params = getSign(timestamp, config.params, securityKey)
      } else {
        let timestamp = new Date().getTime()
        config.data = postSign(timestamp, config.data, securityKey)
      }
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // loading
    store.commit('SET_LOADING', false)
    return response.data
  },
  error => {
    /**
     * 通过 xmlhttprequest 来状态码标识error
     */
    // loading
    store.commit('SET_LOADING', false)
    console.log('error：' + error.response.data.errorMsg, error.response.status) // for debug
    const data = error.response.data
    const status = error.response.status
    if (error && error.response) {
      switch (status) {
        case 400:
          // 捕获中心点错误信息不显示
          if (data.errorCode === '40013') {
          } else if (data.errorCode === '40002') {
            Message({ type: 'error', showClose: true, duration: 3000, message: '登录超时，请重登' })
            router.push('/login')
          } else if (data.errorCode === 'SYS_405') {
            Message({ type: 'error', showClose: true, duration: 3000, message: '签名验证未通过' })
          } else {
            Message({ type: 'error', showClose: true, duration: 3000, message: data.errorMsg })
          }
          break
        case 404:
          Message({ type: 'error', showClose: true, duration: 3000, message: '请求不存在' })
          break
        case 500:
          Message({ type: 'error', showClose: true, duration: 3000, message: '服务器内部错误，请刷新' })
          break
        case 502:
          Message({ type: 'error', showClose: true, duration: 3000, message: '网关错误，请刷新' })
          break
        default:
          Message({ type: 'error', showClose: true, duration: 3000, message: data.errorMsg })
      }
    }
    return Promise.reject(error)
  }
)

export default service
