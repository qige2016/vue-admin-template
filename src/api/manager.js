import request from '@/utils/request'
// 管理员登录
export function managerLogin (data) {
  return request({
    url: '/v0/managers/login',
    method: 'post',
    data
  })
}
// 管理员登出
export function managerLogout (data) {
  return request({
    url: '/v0/managers/logout',
    method: 'post',
    data
  })
}
// 获取账号信息
export function getManagers (uuid, params) {
  return request({
    url: `/v0/managers/${uuid}`,
    params
  })
}
