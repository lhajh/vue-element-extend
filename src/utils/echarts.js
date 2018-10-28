import echarts from 'echarts' // 这里需要修改
let util = {}

/**
 * 生成单例Echart柱状图和折线图数据格式
 * @param  {Array} data [数据源]
 * @param  {String} result [数据源x轴]
 * @param  {String} resultCount [数据源y轴]
 * @return {Object}      [Echart数据格式]
 */
util.initLineData = function (data, result, resultCount) {
  let xAxis = []
  let yAxis = []
  data.map((item, index) => {
    xAxis.push(item[result] || item.result)
    yAxis.push(item[resultCount] || item.resultCount)
  })
  return { xAxis, yAxis }
}
/**
 * 生成多例Echart柱状图和折线图数据格式
 * @param  {Array} data [数据源]
 * @return {Object}      [Echart数据格式]
 */
util.initLinesData = function (data) {
  let xAxis = []
  let yAxis = []
  let value1 = []
  let value2 = []
  let value3 = []
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      xAxis.push(key)
      value1.push(data[key].split('-')[0])
      value2.push(data[key].split('-')[1])
      value3.push(data[key].split('-')[2])
    }
  }
  yAxis.push(value1, value2, value3)
  return { xAxis, yAxis }
}
/**
 * 生成多例Echart折线图数据格式
 * @param  {Object} data [数据源]
 * @param  {String} result [数据源legend]
 * @param  {String} resultCount [数据源y轴]
 * @return {Object}      [Echart数据格式]
 */
util.initBarsData = function (data, result, resultCount) {
  let xAxis = Object.keys(data)
  let yAxisObj = {}
  let legend = []
  let yAxis = []
  // 先将所有工种放到 yAxisObj 中，并赋默认值为 [0, 0, 0, 0, 0, 0, 0]
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      data[key].map((item, index) => {
        let flag = true // 判断 yAxisObj 是否是空数组
        for (const key in yAxisObj) {
          flag = false
          if (key !== (item[result] || item.result)) {
            yAxisObj[(item[result] || item.result)] = [0, 0, 0, 0, 0, 0, 0]
          }
        }
        if (flag) {
          yAxisObj[(item[result] || item.result)] = [0, 0, 0, 0, 0, 0, 0]
        }
      })
    }
  }
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      data[key].map((item, index) => {
        for (const key1 in yAxisObj) {
          if (yAxisObj.hasOwnProperty(key1)) {
            if (key1 === (item[result] || item.result)) {
              yAxisObj[key1][xAxis.indexOf(key)] = (item[resultCount] || item.resultCount)
              break
            }
          }
        }
      })
    }
    legend = Object.keys(yAxisObj)
    yAxis = Object.values(yAxisObj)
  }
  return { xAxis, yAxis, legend }
}
/**
 * 生成Echart饼图数据格式
 * @param  {Array} data [数据源]
 * @param  {String} result [图例名称]
 * @param  {String} resultCount [数据]
 * @return {Object}      [Echart数据格式]
 */
util.initPieData = function (data, result, resultCount) {
  let seriesData = []
  let legendData = []
  data.map((item, index) => {
    seriesData.push({ value: item[resultCount] || item.resultCount, name: item[result] || item.result })
    legendData.push(item[result] || item.result)
  })
  return { seriesData, legendData }
}
/**
 * 根据字典生成Echart饼图数据格式
 * @param  {Object} data [数据源]
 * @param  {Boolean} isGM [是否是广梦]
 * @return {Object}      [Echart数据格式]
 */
util.initIssuesPieData = function (data, isGM) {
  let subcategory = {
    qua1: '材料',
    qua2: '现场作业',
    qua9: '其他',
    sec1: '安全教育',
    sec2: '违章行为',
    sec3: '防护措施',
    sec4: '动火证',
    sec5: '设备',
    sec9: '其他'
  }
  let status = {
    0: '无需整改',
    1: '待整改',
    2: '待复查',
    3: '合格',
    4: '不合格'
  }
  let priority = {
    1: '一般',
    2: '严重',
    3: '紧要'
  }
  if (typeof data === 'object') {
    let seriesData = []
    let legendData = []
    let yAxis = []
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        if (isGM) {
          if (priority[key]) {
            legendData.push(priority[key])
            seriesData.push({value: data[key], name: priority[key], priority: key})
          }
        } else {
          if (subcategory[key]) {
            legendData.push(subcategory[key])
            seriesData.push({value: data[key], name: subcategory[key], subcategory: key})
          } else {
            legendData.push(key)
            seriesData.push({value: data[key], name: key})
            yAxis.push(data[key])
          }
        }
      }
    }
    return {seriesData, legendData, yAxis}
  } else {
    if (isGM) {
      for (const key in status) {
        if (status.hasOwnProperty(key)) {
          if (key === data.toString()) {
            return status[key]
          }
        }
      }
    } else {
      for (var key2 in subcategory) {
        if (subcategory.hasOwnProperty(key2)) {
          if (key2 === data.toString()) {
            return subcategory[key2]
          }
        }
      }
    }
  }
}
/**
 * 生成Echarts柱图配置
 * @param  {Array} a [数据源，需要特定格式]
 * @param  {Object} o [series公共配置]
 * @param  {Array} c [颜色配置数组，生成线图时传入]
 * @return {Object}       [图表图例和主体]
 */
util.columnEchart = function (a, o = {}, c) {
  if (a instanceof Array) {
  } else {
    return
  }
  let legend = []
  let series = []
  // 生成线图时才传入c,调用渐变
  if (c) {
    a.map((item, index) => {
      if (item.type !== 'scatter') {
        let colorStyle = {
          symbolSize: 8,
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: c[index]
              }, {
                offset: 1,
                color: '#1c223a'
              }])
            }
          }
        }
        item = Object.assign(colorStyle, item, o)
      }
      series.push(item)
      legend.push(item.name)
    })
  } else {
    a.map((item, index) => {
      let obj = Object.assign({}, item, o)
      series.push(obj)
      legend.push(item.name)
    })
  }
  return { legend, series }
}

export default util
