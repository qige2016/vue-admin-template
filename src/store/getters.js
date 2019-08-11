const getters = {
  loading: state => state.global.loading,
  isCollapse: state => state.global.isCollapse,
  operatorBean: state => state.manager.operatorBean,
  routes: state => state.permission.routes
}
export default getters
