export default {
  state: {
    loading: false,
    // 菜单折叠
    isCollapse: false,
    // 大屏展示
    isBigScreen: false
  },
  mutations: {
    SET_LOADING: (state, value) => {
      state.loading = value
    },
    // 切换菜单折叠展开
    TOGGLE_MENU: (state, value) => {
      state.isCollapse = value
    },
    // 切换大屏显示
    TOGGLE_BIG_SCREEN: (state) => {
      state.isBigScreen = !state.isBigScreen
    }
  },
  getters: {
    loading: state => state.loading,
    isCollapse: state => state.isCollapse,
    isBigScreen: state => state.isBigScreen
  },
  actions: {
  }
}
