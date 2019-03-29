import { login, logout, getUserInfo } from '@/api/login'
import { setToken, getToken, removeToken } from '@/utils/auth'
import router from '@/router'

export default {
  state: {
    operatorBean: {},
    operatorToken: getToken()
  },
  mutations: {
    SET_TOKEN: (state, operatorToken) => {
      state.operatorToken = operatorToken
    },
    SET_OPERATORBEAN: (state, operatorBean) => {
      state.operatorBean = operatorBean
    }
  },
  getters: {
    operatorBean: state => state.operatorBean,
    operatorToken: state => state.operatorToken
  },
  actions: {
    // 登录
    handleLogin ({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(response => {
          commit('SET_TOKEN', response.operatorToken)
          setToken(response.operatorToken)
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
    getUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        const operatorToken = {operatorToken: state.operatorToken}
        getUserInfo(operatorToken).then(response => {
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
