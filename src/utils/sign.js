import { trim } from '@/utils/index'
import { Base64 } from 'js-base64'
import sha1 from 'sha1'

/**
 * sha1 获取sha1加密后生成的字符串,用于http安全验证
 * @param {object} obj
 * @return string
 */
export const shaPwd = (data, timer, securityKey) => {
  let tempArr = []
  let item = ''
  let str = ''
  for (let k in data) {
    item = k + '=' + data[k]
    tempArr.push(item)
  }
  tempArr.sort()
  str = `${tempArr.join('&')}${timer}${securityKey}`
  return str
}

/**
 * get请求参数的签名对象
 * @param timestamp 签名时间戳
 * @param {object} qryData 签名数据
 * @return {object} getParams 签名对象
 */
export const getSign = (timestamp, qryData, securityKey) => {
  let params = trim(qryData)
  let shaStr = sha1(shaPwd(params, timestamp, securityKey))
  let sign = {}
  sign['timestamp'] = timestamp
  sign['sign'] = shaStr

  let getParams = { ...params, ...sign }
  return getParams
}
/**
 * post请求参数生成签名对象
 * @param timestamp 签名时间戳
 * @param {object} qryData
 * @return {object} data 签名对象
 */
export const postSign = (timestamp, qryData, securityKey) => {
  let params = trim(qryData)
  let paramsStr = Base64.encode(JSON.stringify(params))
  let postStr = sha1(`${paramsStr}${timestamp}${securityKey}`)

  let data = {}
  data['data'] = paramsStr
  data['timestamp'] = timestamp
  data['sign'] = postStr
  return data
}
