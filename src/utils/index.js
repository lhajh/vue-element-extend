/**
 * 获取后缀名
 * @param  {String} name [源字符串]
 * @param  {String} separator [分隔符，默认是 '.']
 * @return {String}      [后缀名]
 */
export const subName = (name, separator) => {
  let start = name.lastIndexOf(separator || '.')
  let pos = start > -1 ? start : name.length
  return {
    name: name.substring(0, pos),
    suffix: name.substring(pos + 1)
  }
}

/**
 * 生成tree数据格式
 * @param  {Array} data [数据源]
 * @param  {String} monthMapList [月份对象的key]
 * @return {Object}      [tree数据格式]
 */
export const getTree = function (data, monthMapList) {
  let historyYear = []
  let allHistoryPhotoData = []
  data.map((item, index) => {
    historyYear.push(item.year)
    let yearData = []
    ;(item[monthMapList] || item.monthMapList).map((item, index) => {
      for (var key in item) {
        if (item.hasOwnProperty(key)) {
          let children = []
          item[key].map((item, index) => {
            children.push({ label: item })
          })
          yearData.push({
            label: key,
            children
          })
        }
      }
    })
    allHistoryPhotoData.push(yearData)
  })
  return { historyYear, allHistoryPhotoData }
}

/**
 * 检测传入参数是否为 undefined
 * @param  {all} target [数据源]
 * @return {all}      [默认值]
 */
export const checkParameter = (target, defaultVal) => (target === undefined ? defaultVal : target)

/**
 * 将英文字符串首字母大写
 * @param {str} String 需要转换的字符串
 * @return {srt} String 转换后的字符串
 */
export const firstUpperCase = ([first, ...rest]) => first.toUpperCase() + rest.join('')

/**
 * 验证 props
 */
export const PROP = {
  string: { type: String, 'default': '' },
  strDef (def = '', required = false) {
    if (typeof def !== 'string' && typeof def !== 'function') {
      console.error('props 属性默认值类型要求为 string/function, 得到的为' + typeof def)
    }
    return { type: String, required, 'default': def }
  },
  boolean: { type: Boolean, 'default': false },
  boolDef (def = false, required = false) {
    if (typeof def !== 'boolean' && typeof def !== 'function') {
      console.error('props 属性默认值类型要求为 boolean, 得到的为' + typeof def)
    }
    return { type: Boolean, required, 'default': def }
  },
  numDef (def = null, required = false) {
    return { type: Number, required, 'default': def }
  },
  anyDef (def = '', required = false) {
    return { required, 'default': def }
  },
  objDef (def = {}, required = false) {
    return {
      type: Object,
      required,
      'default': typeof def === 'function' ? def : () => def
    }
  },
  arrDef (def = [], required = false) {
    return {
      type: Array,
      required,
      'default': typeof def === 'function' ? def : () => def
    }
  }
}

/**
 * 格式化时间
 * @param  {String || Date} time [日期 参数类型string(yyyymmdd)或date对象]
 * @param  {String} type [格式化后的分隔符，默认为空]
 * @param  {Boolean} flag [日期是否有 时分秒，默认没有]
 * @return {String}      [格式化后的时间]
 */
export const initTime = (time, type, flag) => {
  if (typeof time === 'string') {
    if (flag) {
      if (type) {
        return `${formatTime(time, type)} 00:00:00`
      } else {
        return `${time} 00:00:00`
      }
    } else {
      if (type) {
        return formatTime(time, type)
      } else {
        return time
      }
    }
  } else {
    let year, month, day
    if (time) {
      if (typeof time === 'number') {
        time = new Date(time)
      }
      year = time.getFullYear()
      month = time.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      day = time.getDate()
      if (day < 10) {
        day = '0' + day
      }
      if (flag) {
        if (type) {
          return `${year}${type}${month}${type}${day} 00:00:00`
        } else {
          return `${year}${month}${day} 00:00:00`
        }
      } else {
        if (type) {
          return `${year}${type}${month}${type}${day}`
        } else {
          return `${year}${month}${day}`
        }
      }
    }
  }
}

/**
 * 格式化时间 参数格式 yyyymmdd 返回 yyyy-mm-dd
 * @param {any} time yyyymmdd 数字字符串
 * @param {any} type 分隔符字符串
 * @returns yyyy-mm-dd格式的字符串
 */
export const formatTime = (time, type) => {
  return `${time.substring(0, 4)}${type || '-'}${time.substring(4, 6)}${type ||
    '-'}${time.substring(6, 8)}`
}

/**
 * 返回一周开始时间和结束时间
 * @param  {Date} date [日期]
 * @return {Object}    [一周开始时间和结束时间]
 */
export const weekDay = date => {
  date = date || new Date()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  let dateTime = date.getTime()
  let week = date.getDay()
  let toTime
  if (week === 1) {
    toTime = dateTime - 1 * 24 * 60 * 60 * 1000
  } else if (week === 2) {
    toTime = dateTime - 2 * 24 * 60 * 60 * 1000
  } else if (week === 3) {
    toTime = dateTime - 3 * 24 * 60 * 60 * 1000
  } else if (week === 4) {
    toTime = dateTime - 4 * 24 * 60 * 60 * 1000
  } else if (week === 5) {
    toTime = dateTime - 5 * 24 * 60 * 60 * 1000
  } else if (week === 6) {
    toTime = dateTime - 6 * 24 * 60 * 60 * 1000
  } else if (week === 0) {
    toTime = dateTime - 7 * 24 * 60 * 60 * 1000
  }
  return {
    toTime,
    fromTime: toTime - 6 * 24 * 60 * 60 * 1000
  }
}
/**
 * 根据指定日期往前或往后推多少月
 * @param  {Number || String} num [往前或往后推多少月]
 * @param  {Boolean} isFirstDay [日是否是第一天，默认跟随时间推]
 * @param  {Date} date [日期，默认今天]
 * @return {Object}    [指定年月的开始时间和结束时间]
 */
export const scheduledMonth = (num, isFirstDay, date) => {
  if (isFirstDay && isFirstDay.constructor !== Boolean && date === undefined) {
    date = isFirstDay
    isFirstDay = false
  }
  if (date) {
    if (typeof date === 'number') {
      date = new Date(date)
    } else if (typeof date === 'string') {
      if (isNaN(new Date(date).getTime())) {
        return
      } else {
        date = new Date(date)
      }
    }
  }
  if (typeof num === 'number') {
    return previous(num, isFirstDay, date)
  } else if (typeof num === 'string') {
    num = +num
    if (isNaN(num)) {
      return false
    } else {
      return previous(num, isFirstDay, date)
    }
  } else {
    return false
  }
}
const previous = (num, isFirstDay, date) => {
  date = date || new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let quotient = parseInt(num / 12)
  let remainder = num % 12
  let previousYear = year + quotient
  let previousMonth = month + remainder
  let previousDay = day
  if (previousMonth > 12) {
    previousYear++
    previousMonth -= 12
  } else if (previousMonth <= 0) {
    previousYear--
    previousMonth += 12
  }
  if (isFirstDay) {
    previousDay = day = 1
  } else {
    // 获取当前日期中月的天数
    let lastDate = new Date(previousYear, previousMonth, 0).getDate()
    previousDay = lastDate < previousDay ? lastDate : previousDay
    // if (day >= 29) {
    //   if (previousMonth === 2) {
    //     if (isLeapYear(previousYear)) {
    //       previousDay = 29
    //     } else {
    //       previousDay = 28
    //     }
    //   }
    // }
    // if (day === 31) {
    //   if (/[4,6,9,11]/.test(previousMonth)) {
    //     previousDay = 30
    //   }
    // }
  }
  day = ltTen(day)
  previousDay = ltTen(previousDay)
  month = ltTen(month)
  previousMonth = ltTen(previousMonth)
  if (num < 0) {
    return {
      fromTime: `${previousYear}${previousMonth}${previousDay}`,
      toTime: `${year}${month}${day}`
    }
  } else {
    return {
      fromTime: `${year}${month}${day}`,
      toTime: `${previousYear}${previousMonth}${previousDay}`
    }
  }
}
// 满足闰年的条件：四年一闰，百年不闰，四百年再闰
// 条件 1：年份必须要能被4整除
// 条件 2：年份不能是整百数
// 条件 3：年份是400的倍数
// 当条件 1 和条件 2 同时成立时，就肯定是闰年，所以条件 1 和条件 2 之间为“与”的关系。
// 如果条件 1 和条件 2 不能同时成立，但如果条件 3 能成立，则仍然是闰年。所以条件 3 与前 2 项为“或”的关系。
export const isLeapYear = year => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
const ltTen = num => {
  return num < 10 ? '0' + num : num
}
