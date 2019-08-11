/**
 * 获得localStorage
 */
export const getItem = (key) => {
  return localStorage.getItem(key)
}

/**
 * 设置localStorage
 */
export const setItem = (key, value) => {
  localStorage.setItem(key, value)
}

/**
 * 移除localStorage
 */
export const removeItem = (key) => {
  localStorage.removeItem(key)
}
