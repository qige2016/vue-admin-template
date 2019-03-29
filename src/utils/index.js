/**
 * 用于生成uuid
 * @param{null}
 */

export const S4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
export const guid = () => {
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

/**
 * trim 去掉字符串前后空格
 * @param {string} str
 * @return object
 */
export const trim = (obj = {}) => {
  let temp = obj
  for (let i in temp) {
    if (typeof temp[i] === 'string') {
      temp[i] = temp[i].replace(/(^\s*)|(\s*$)/g, '')
    }
  }
  return temp
}

/**
 * isEmptyObj 判断对象是否为空对象
 * @param {object} obj
 * @return boolean
 */
export const isEmptyObj = (obj = {}) => {
  return (Object.keys(obj).length === 0 && obj.constructor === Object)
}

// 切换全屏
export const toggleFullScreen = () => {
  if (!isFullScreen()) {
    // 进入全屏状态
    const el = document.documentElement
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen()
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    }
  } else {
    // 退出全屏状态
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
}

// 判断是否处于全屏状态
export const isFullScreen = () => {
  return document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
}
