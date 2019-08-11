import { managerLogin, managerLogout, getManagers } from '@/api/manager'
import { setItem, removeItem, getItem } from '@/utils/auth'
import { resetRouter } from '@/router'

export default {
  namespaced: true,
  state: {
    managerToken: getItem('LG_TK'),
    operatorUUID: getItem('US_ID'),
    operatorBean: {}
  },
  mutations: {
    SET_OPERATORBEAN: (state, operatorBean) => {
      state.operatorBean = operatorBean
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, data) {
      return new Promise((resolve, reject) => {
        managerLogin(data).then((response = {}) => {
          setItem('LG_TK', response.managerToken)
          if (response.operatorBean) {
            setItem('US_ID', response.operatorBean.operatorUUID)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    handleLogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        managerLogout().then(() => {
          removeItem('LG_TK')
          removeItem('US_ID')
          commit('SET_OPERATORBEAN', {})
          resetRouter()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    fedLogOut ({ commit }) {
      return new Promise(resolve => {
        removeItem('LG_TK')
        removeItem('US_ID')
        commit('SET_OPERATORBEAN', {})
        resolve()
      })
    },
    // 获取用户信息
    getUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        const operatorUUID = getItem('US_ID')
        getManagers(operatorUUID).then((response = {}) => {
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
