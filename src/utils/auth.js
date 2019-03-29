/**
 * 设置token
 */
export const setToken = (token) => {
  localStorage.setItem('LG_TK', token)
}
/**
 * 获得token
 */
export const getToken = () => {
  return localStorage.getItem('LG_TK')
}
/**
 * 移除token
 */
export const removeToken = () => {
  localStorage.removeItem('LG_TK')
}

/**
 * 判断浏览器是否支持vue
 */
const getVersion = (RegStr) => {
  return parseInt((navigator.userAgent.toLowerCase().match(RegStr) + '').replace(/[^0-9.]/ig, ''))
}
export const supportVue = () => {
  let agent = navigator.userAgent.toLowerCase()
  let regStrIE = /msie [\d.]+;/gi
  let regStrFF = /firefox\/[\d.]+/gi
  let regStrChrome = /chrome\/[\d.]+/gi
  let regStrSAF = /safari\/[\d.]+/gi
  let regStrOpera = /opr\/[\d.]+/gi
  let regStrEdge = /edge\/[\d.]+/gi
  let supportVue = true
  if (agent.indexOf('msie') > 0 && getVersion(regStrIE) < 10) {
    supportVue = false
  }
  if (agent.indexOf('firefox') > 0 && getVersion(regStrFF) < 21) {
    supportVue = false
  }
  if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0 && getVersion(regStrSAF) < 6) {
    supportVue = false
  }
  if (agent.indexOf('chrome') > 0 && agent.indexOf('opr') < 0 && getVersion(regStrChrome) < 23) {
    supportVue = false
  }
  if (agent.indexOf('opr') > 0 && getVersion(regStrOpera) < 15) {
    supportVue = false
  }
  if (agent.indexOf('edge') > 0 && getVersion(regStrEdge) < 12) {
    supportVue = false
  }
  return supportVue
}
