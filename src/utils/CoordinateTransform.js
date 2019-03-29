const xPI = 3.14159265358979324 * 3000.0 / 180.0
const PI = 3.1415926535897932384626
const a = 6378245.0
const ee = 0.00669342162296594323

/**
* 判断是否在国内，不在国内则不做偏移
* @param lng
* @param lat
* @returns {boolean}
*/
const outOfChina = function (lng, lat) {
  return (
    lng < 72.004 || lng > 137.8347 || (lat < 0.8293 || lat > 55.8271 || false)
  )
}
const transformLat = function (lng, lat) {
  let ret =
    -100.0 +
    2.0 * lng +
    3.0 * lat +
    0.2 * lat * lat +
    0.1 * lng * lat +
    0.2 * Math.sqrt(Math.abs(lng))
  ret +=
    (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
    2.0 /
    3.0
  ret +=
    (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0
  ret +=
    (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) *
    2.0 /
    3.0
  return ret
}
const transformLng = function (lng, lat) {
  let ret =
    300.0 +
    lng +
    2.0 * lat +
    0.1 * lng * lng +
    0.1 * lng * lat +
    0.1 * Math.sqrt(Math.abs(lng))
  ret +=
    (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
    2.0 /
    3.0
  ret +=
    (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0
  ret +=
    (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) *
    2.0 /
    3.0
  return ret
}
/**
* 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
* 即 百度 转 谷歌、高德
* @param bdLon
* @param bdLat
* @returns {[]} GCJ-02 坐标：[经度，纬度]
*/
const transformBD09ToGCJ02 = function (bdLon, bdLat) {
  const x = bdLon - 0.0065
  const y = bdLat - 0.006
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xPI)
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * xPI)
  const ggLng = z * Math.cos(theta)
  const ggLat = z * Math.sin(theta)
  return [ggLng, ggLat]
}
/**
* GCJ02 转换为 WGS84
* @param lng
* @param lat
* @returns {[]} WGS84 坐标：[经度，纬度]
*/
export const transformGCJ02ToWGS84 = function (lng, lat) {
  if (outOfChina(lng, lat)) {
    return [lng, lat]
  }
  let dLat = transformLat(lng - 105.0, lat - 35.0)
  let dLng = transformLng(lng - 105.0, lat - 35.0)
  const radLat = lat / 180.0 * PI
  let magic = Math.sin(radLat)
  magic = 1 - ee * magic * magic
  const sqrtMagic = Math.sqrt(magic)
  dLat = dLat * 180.0 / (a * (1 - ee) / (magic * sqrtMagic) * PI)
  dLng = dLng * 180.0 / (a / sqrtMagic * Math.cos(radLat) * PI)
  const mgLat = lat + dLat
  const mgLng = lng + dLng
  return [lng * 2 - mgLng, lat * 2 - mgLat]
}
/**
* WGS84转GCj02
* @param lng
* @param lat
* @returns {[]} GCj02 坐标：[经度，纬度]
*/
export const transformWGS84ToGCJ02 = function (lng, lat) {
  if (outOfChina(lng, lat)) {
    return [lng, lat]
  }
  let dLat = transformLat(lng - 105.0, lat - 35.0)
  let dLng = transformLng(lng - 105.0, lat - 35.0)
  const radLat = lat / 180.0 * PI
  let magic = Math.sin(radLat)
  magic = 1 - ee * magic * magic
  const sqrtMagic = Math.sqrt(magic)
  dLat = dLat * 180.0 / (a * (1 - ee) / (magic * sqrtMagic) * PI)
  dLng = dLng * 180.0 / (a / sqrtMagic * Math.cos(radLat) * PI)
  const mgLat = lat + dLat
  const mgLng = lng + dLng
  return [mgLng, mgLat]
}
/**
* 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
* 即谷歌、高德 转 百度
* @param lng
* @param lat
* @returns {[]}  BD-09 坐标：[经度，纬度]
*/
const transformGCJ02ToBD09 = function (lng, lat) {
  const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * xPI)
  const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * xPI)
  const bdLng = z * Math.cos(theta) + 0.0065
  const bdLat = z * Math.sin(theta) + 0.006
  return [bdLng, bdLat]
}

export default {
  /**
  * 百度坐标BD09 转 WGS84
  *
  * @param lng 经度
  * @param lat 纬度
  * @return {[]} WGS84 坐标：[经度，纬度]
  */
  transformBD09ToWGS84: (lng, lat) => {
    const lngLat = transformBD09ToGCJ02(lng, lat)
    return transformGCJ02ToWGS84(lngLat[0], lngLat[1])
  },
  /**
  * WGS84 转 百度坐标BD09
  *
  * @param lng 经度
  * @param lat 纬度
  * @return {[]} BD09 坐标：[经度，纬度]
  */
  transformWGS84ToBD09: (lng, lat) => {
    const lngLat = transformWGS84ToGCJ02(lng, lat)
    return transformGCJ02ToBD09(lngLat[0], lngLat[1])
  },
  /**
  * 百度坐标BD09 转 火星坐标（国测局坐标）
  *
  * @param lng 经度
  * @param lat 纬度
  * @return {[]} WGS84 坐标：[经度，纬度]
  */
  transformBD09ToGCJ02: (lng, lat) => {
    const lngLat = transformBD09ToGCJ02(lng, lat)
    return lngLat
  },
  /**
  * 火星坐标（国测局坐标） 转 百度坐标BD09
  *
  * @param lng 经度
  * @param lat 纬度
  * @return {[]} BD09 坐标：[经度，纬度]
  */
  transformGCJ02ToBD09: (lng, lat) => {
    const lngLat = transformGCJ02ToBD09(lng, lat)
    return lngLat
  },
  /**
  * WGS84转GCj02
  * @param lng
  * @param lat
  * @returns {[]} GCj02 坐标：[经度，纬度]
  */
  transformWGS84ToGCJ02
}
