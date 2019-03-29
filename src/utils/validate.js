export const RULE = {
  idNumber15: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/,
  idNumber18: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
  macAddress: /^([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}$/,
  password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,10}$/,
  number: /^\d+$/,
  gtNumber: /^((?!0)\d{1,4}|0)$/,
  telephone: /^1[3|4|5|7|8][0-9]{9}$/,
  username: /^[0-9A-Za-z]{8}$/,
  name: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/,
  email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
  time: /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/,
  vin: /^(?![0-9]+$)(?![A-Z]+$)[0-9A-Z]{17}$/,
  // systemUserValidate
  SUname: /^[0-9A-Za-z_]{5,17}$/, // 只允许数字和大小写字母
  SUpassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[\\s\\S]{8,16}$/, // 必须且同时有且只有数字和大小写字母
  SUAllpassword: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/, // 必须有且有至少包含数字、大小写字母和下划线的任意组合的3位字符
  SUnickname: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{1,20}$/, // 允许数字字母下划线汉字且下划线不在首尾
  SUphone: /^[1][3,4,5,7,8][0-9]{9}$/, // 纯数字表达式
  SUdescription: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{1,100}$/, // 允许数字字母下划线汉字且下划线不在首尾
  SUAlldescription: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{1,500}$/, // 允许数字字母下划线汉字且下划线不在首尾
  // organisation
  orgPhone: /^\d{6,20}$/,
  // version code
  versionCode: /^v\d{1,2}\.\d{1,2}\.\d{1,2}$/,
  miniVersionCode: /^\d{1,2}(\.\d{1,2}){1,2}$/,
  snNumber: /^(?![^A-Z]+$)(?!\D+$).{16}$/,
  rescueNumber: /^[0-9]{6,20}$/, // 救援电话
  realName: /^[\u4e00-\u9fa5]{1,7}$/,
  tboxSN: /^[0-9A-Za-z]{1,30}$/,
  tboxIMEI: /^\d{15}$/,
  oldPlate: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
  // plate: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/, // 新能源
  plate: /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})|([A-Z]{1}[A-HJ-NP-Z0-9]{5}[A-HJ-NP-Z0-9挂学警港澳]{1})|([临A-Z]{1}[A-Z]{1}[A-Z0-9]{6})|([吉]{1}[A-Z0-9]{6})$/,
  excel: /\.xls$|\.xlsx$/i
}

export default {
  IDnumberPass: (rule, value, callback) => {
    if (!value) return callback()

    if (value.length !== 15 && value.length !== 18) {
      callback(new Error('请输入15位或18位身份证号'))
    } else {
      RULE.idNumber15.test(value) || RULE.idNumber18.test(value)
        ? callback()
        : callback(new Error('请输入正确的身份证号'))
    }
  },
  passwordPass: (rule, value, callback) => {
    if (!value) {
      return callback()
    } else if (value.length < 8 || value.length > 18) {
      return callback(new Error('请输入8到18位密码'))
    } else {
      !RULE.password.test(value)
        ? callback(new Error('密码是由字母数字组合'))
        : callback()
    }
  },
  telephonePass: (rule, value, callback) => {
    if (!value) {
      return callback()
    } else if (value.length !== 11) {
      return callback(new Error('请输入11位手机号'))
    } else if (!RULE.telephone.test(value)) {
      return callback(new Error('请输入正确手机号码'))
    } else {
      callback()
    }
  },
  usernamePass: (rule, value, callback) => {
    if (!value) {
      return callback()
    } else if (value.length !== 8) {
      return callback(new Error('请输入8位用户名'))
    } else if (!RULE.username.test(value)) {
      return callback(new Error('用户名只包含字母和数字'))
    } else {
      callback()
    }
  },
  numberPass: (rule, value, callback) => {
    if (!value) return callback(new Error('请输入延迟时间'))

    !RULE.number.test(value)
      ? callback(new Error('请输入数字'))
      : callback()
  },
  namePass: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.name.test(value)
      ? callback(new Error('请输入中英文或数字'))
      : callback()
  },
  macAddressPass: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.macAddress.test(value)
      ? callback(new Error('请输入正确格式的mac地址'))
      : callback()
  },
  dateCheckPass: (arr) => {
    let isPass = true
    let begin = null
    let end = null
    let months = 0

    if (!arr || arr.length !== 2) isPass = false

    begin = new Date(arr[0])
    end = new Date(arr[1])

    if ((end.getTime() - begin.getTime()) / (3600 * 24 * 1000) > 92) isPass = false

    months = end.getMonth() < begin.getMonth()
      ? end.getMonth() + 11 - begin.getMonth()
      : end.getMonth() - begin.getMonth()

    if (months > 3) isPass = false

    return isPass
  },
  emailPass: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.email.test(value)
      ? callback(new Error('邮箱格式错误'))
      : callback()
  },
  timePass: (rule, value, callback) => {
    if (!value) return callback()
    let msg = `时间格式错误${value}`
    !RULE.time.test(value)
      ? callback(new Error(msg))
      : callback()
  },
  checkVIN: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.vin.test(value)
      ? callback(new Error('VIN码是17位大写英文字母加数字'))
      : callback()
  },
  // systemUser validate
  checkSystemUserName: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.SUname.test(value)
      ? callback(new Error('用户名为5-17位字符，只包含数字、大小写字母以及下划线'))
      : callback()
  },
  checkShortName: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.SUname.test(value)
      ? callback(new Error('简称为5-17位字符，只包含数字、大小写字母以及下划线'))
      : callback()
  },
  checkSystemUserNickname: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.SUnickname.test(value)
      ? callback(new Error('系统名称为1-20位字符，只包含数字、大小写字母、汉字以及下划线'))
      : callback()
  },
  checkDescription: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.SUdescription.test(value)
      ? callback(new Error('名称为1-100位字符，只包含数字、大小写字母、汉字以及下划线'))
      : callback()
  },
  checkSystemDescription: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.SUAlldescription.test(value)
      ? callback(new Error('名称为1-500位字符，只包含数字、大小写字母、汉字以及下划线'))
      : callback()
  },
  checkSystemUserPass: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.SUpassword.test(value)
      ? callback(new Error('密码由8-16位大小写字母与数字组成'))
      : callback()
  },
  checkOTAPass: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.SUAllpassword.test(value)
      ? callback(new Error('密码8-16位，数字、大、小写字母以及下划线中的任意三种'))
      : callback()
  },
  checkSystemUserPhone: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.SUphone.test(value)
      ? callback(new Error('请输入11位手机号'))
      : callback()
  },
  orgPhone: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.orgPhone.test(value)
      ? callback(new Error('电话为6-20位数字'))
      : callback()
  },
  versionCode: (rule, value, callback) => {
    if (!value) return callback()
    !RULE.versionCode.test(value)
      ? callback(new Error('版本号格式为vx.x.x，x为1-2位数字'))
      : callback()
  },
  miniVersionCode: (rule, value, callback) => {
    if (!value) return callback()
    !RULE.miniVersionCode.test(value)
      ? callback(new Error('最低系统支持的格式为 x.x.x 或 x.x， x为1-2位数字'))
      : callback()
  },
  availableTime: (rule, value, callback) => {
    if (!value) return callback()
    let currentTime = new Date().getTime()
    let pickTime = new Date(value).getTime()
    if (pickTime < currentTime) {
      callback(new Error('所选时间应晚于当前时间'))
    } else {
      callback()
    }
  },
  fileName: (rule, value, callback) => {
    if (!value) return callback()
    let RN = value.length
    if (value[ RN - 1 ] !== 'k' || value[ RN - 2 ] !== 'p' || value[ RN - 3 ] !== 'a' || value[ RN ] !== '.') {
      callback(new Error('升级包的文件类型为 .apk'))
    } else {
      let start = value.length - 4
      let str = value.slice(0, start)
      if (str.length > 25) {
        callback(new Error('升级包的文件名称不超过25个字符'))
      } else {
        callback()
      }
    }
  },
  checkSuffix: (rule, value, callback) => {
    if (!value) {
      return callback()
    } else {
      const suffix = localStorage.getItem('SUFFIX')
      if (suffix !== 'null' && suffix !== 'undefined' && suffix !== '' && value.lastIndexOf(`.${suffix}`) < 0) {
        callback(new Error(`该模块不支持该格式的文件，支持.${suffix}格式的文件`))
      } else {
        callback()
      }
    }
  },
  checkExcel: (rule, value, callback) => {
    if (!value) {
      return callback()
    } else {
      if (!RULE.excel.test(value)) {
        callback(new Error(`该文件格式不正确，请选择excel文件！`))
      } else {
        callback()
      }
    }
  },
  suffix: (rule, value, callback) => {
    if (!value) {
      return callback()
    } else {
      if (/^\./.test(value)) {
        callback(new Error(`升级包后缀名不能以 . 开头！`))
      } else {
        callback()
      }
    }
  },
  snNumber: (rule, value, callback) => {
    if (!value) {
      return callback()
    } else if (value.length !== 16) {
      return callback(new Error('请输入16位终端SN号'))
    } else {
      !RULE.snNumber.test(value)
        ? callback(new Error('终端SN号是数字和大写字母的组合'))
        : callback()
    }
  },
  rescueNumber: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.rescueNumber.test(value)
      ? callback(new Error('该电话必须为6-20位纯数字'))
      : callback()
  },
  realNameCheck: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.realName.test(value)
      ? callback(new Error('姓名为不超过7位的汉字'))
      : callback()
  },
  tboxIMEICheck: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.tboxIMEI.test(value)
      ? callback(new Error('T-BOX终端IMEI为15位数字'))
      : callback()
  },
  tboxSNCheck: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.tboxSN.test(value)
      ? callback(new Error('T-BOX终端SN号为最多30位的数字、字母或两者组合'))
      : callback()
  },
  plateCheck: (rule, value, callback) => {
    if (!value) return callback()
    console.log(RULE.plate.test(value))
    !RULE.plate.test(value)
      ? callback(new Error('请输入正确的车牌号码'))
      : callback()
  },
  milleageNum: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.number.test(value)
      ? callback(new Error('请输入≥0的整数'))
      : callback()
  },
  gtNum: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.gtNumber.test(value)
      ? callback(new Error('必须为整数,范围0-9999'))
      : callback()
  },
  beginSocValid: (rule, value, callback, value2) => {
    console.log(rule, value, callback, value2)
    if (!value) return callback()
  },
  endSocValid: (rule, value, callback) => {
    console.log(rule, value, callback)
    if (!value) return callback()
  }
}
