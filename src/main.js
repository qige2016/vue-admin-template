// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import 'babel-runtime/core-js/promise'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import '../theme/index.css'
import './assets/iconfont/iconfont.css'
import 'v-charts/lib/style.css'
import App from './App'
import AMap from 'vue-amap'
import VCharts from 'v-charts'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(AMap)
AMap.initAMapApiLoader({
  key: '',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Heatmap'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
Vue.use(VCharts)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
