import Vue from 'vue'
import Vuex from 'vuex'

import global from './modules/global'
import login from './modules/login'
import permission from './modules/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global, login, permission
  }
})
