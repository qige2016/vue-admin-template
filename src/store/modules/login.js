import { login, logout, getUserInfo } from '@/api/login'
import { setToken, getToken, removeToken } from '@/utils/auth'
import router from '@/router'

export default {
  state: {
    operatorBean: {},
    token: getToken()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_OPERATORBEAN: (state, operatorBean) => {
      state.operatorBean = operatorBean
    }
  },
  getters: {
    operatorBean: state => state.operatorBean,
    token: state => state.token
  },
  actions: {
    // 登录
    handleLogin ({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(response => {
          commit('SET_TOKEN', response.token)
          setToken(response.token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    handleLogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          removeToken()
          commit('SET_TOKEN', '')
          // 先转跳再清空角色和用户名
          router.push('/login')
          commit('SET_OPERATORBEAN', {})
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    fedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // 获取用户信息
    getUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          /** 存储用户信息 */
          commit('SET_OPERATORBEAN', response.operatorBean)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
