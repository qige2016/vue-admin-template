import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/v0/web/login',
    method: 'post',
    data
  })
}
export function verifyCode (data) {
  return request({
    url: '/v0/web/verifyCode',
    method: 'post',
    data
  })
}
export function logout () {
  return request({
    url: '/v0/web/logout',
    method: 'post'
  })
}
export function modifyPassword (data) {
  return request({
    url: '/v0/operators/modify-password',
    method: 'post',
    data
  })
}
// mock
export function getUserInfo (params) {
  return request({
    url: '/v0/operators/userinfo',
    method: 'get',
    params
  })
}
