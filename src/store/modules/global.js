export default {
  state: {
    loading: false,
    // 菜单折叠
    isCollapse: false
  },
  mutations: {
    SET_LOADING: (state, value) => {
      state.loading = value
    },
    TOGGLE_MENU: (state, value) => {
      state.isCollapse = value
    }
  }
}
