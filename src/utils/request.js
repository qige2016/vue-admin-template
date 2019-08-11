import axios from 'axios'
import { Message } from 'element-ui'
import { guid, rebuildObj, legitimacy, isFormData } from '@/utils/index'
import { getItem } from '@/utils/auth'
import { getSign, postSign } from '@/utils/sign'
import store from '@/store'
import router from '@/router/index'

const isSign = true // 开启关闭sign签名验证
const securityKey = 'U6#bs7$s'// 后端提供安全码
const uuid = 'cms' + guid()

// 错误提示信息
const tipText = {
  400: {
    90002: '登录超时，请重登',
    SYS_405: '签名验证未通过'
  },
  404: '请求不存在',
  500: '服务器内部错误',
  502: '网关错误',
  504: '网关超时'
}

const showMessage = (message, type = 'error', showClose = true, duration = 3000) => {
  Message({ type, showClose, duration, message })
}

// create an axios instance
const service = axios.create({
  baseURL: '/api',
  timeout: 30000, // request timeout
  headers: { msgId: uuid, from: 'PORTAL', 'Content-Type': 'application/json;charset=UTF-8' }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // get 方法先判断是否包含 & 字符
    if (config.method === 'get') {
      // 不包含 & 字符
      if (legitimacy(config.params)) {
        // 去除前后空格 和 空属性
        config.params = rebuildObj(config.params)
        store.commit('SET_LOADING', true)
      } else {
        // 包含 & 字符取消请求
        showMessage('&为非法字符,请重新输入')
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        config.cancelToken = source.token
        // 取消请求
        source.cancel()
        return config
      }
    } else {
      // 去除前后空格 和 空属性
      config.data = rebuildObj(config.data)
      // 上传文件
      if (isFormData(config.data)) {
        config.headers['Content-Type'] = 'multipart/form-data'
      }
    }
    // token
    if (getItem('LG_TK')) {
      config.headers['managerToken'] = getItem('LG_TK')
    }
    // 签名
    if (isSign && !isFormData(config.data)) {
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
    // console.log(error) // for debug
    store.commit('SET_LOADING', false)
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
    // console.log('error：' + error.response.data.errorMsg, error.response.status) // for debug
    if (error && error.response) {
      const data = error.response.data
      const status = error.response.status + '' // number转为string
      // 在tipText中有定义
      if (tipText[status]) {
        if (status === '400') {
          // 未在tipText['400']中定义，使用默认tip
          const msg = tipText['400'][data.errorCode]
          msg ? showMessage(msg) : showMessage(data.errorMsg)
          // 如果登录超时，前端退出后转跳登录页重新登录
          data.errorCode === '90002' && store.dispatch('manager/fedLogOut').then(() => router.push('/login'))
        } else {
          // 404、500、502
          showMessage(tipText[status])
        }
      } else {
        // 未在tipText中定义，使用默认tip
        showMessage(data.errorMsg)
      }
    }
    return Promise.reject(error)
  }
)

export default service
