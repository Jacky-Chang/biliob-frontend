function drawGraph (data) {
  let fansRate = []
  fansRate.push([data.data[data.data.length - 1]['datetime'], data.data[data.data.length - 2]['fans'] - data.data[data.data.length - 1]['fans']])
  var lastDate = data.data[data.data.length - 1]['datetime']
  let f = 0
  for (let i = data.data.length - 2; i >= 0; i--) {
    if ((new Date(data.data[i]['datetime'])) > (new Date(lastDate)) || i === 0) {
      f += data.data[i]['fans'] - data.data[i + 1]['fans']
      fansRate.push([data.data[i]['datetime'], f])
      lastDate = (new Date(lastDate)).setDate((new Date(lastDate)).getDate() + 1)
      f = 0
    } else {
      f += data.data[i]['fans'] - data.data[i + 1]['fans']
    }
  }

  let graph = {
    title: {
      left: 'center',
      subtext: '粉丝数变化趋势',
      text: data.name
    },
    legend: {
      data: ['粉丝数'],
      bottom: '5px'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: true
      },
      axisPointer: {
        label: {
          formatter: function (params) {
            let date = new Date(params.value)
            return '日期：' + (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + date.getUTCDate() + ' ' +
              date.getHours() + ':' + date.getMinutes()
          }
        }
      }
    },
    yAxis: [{
      type: 'value',
      min: 'dataMin',
      splitLine: {
        show: true
      }
    }],
    series: [ {
      name: '粉丝增量',
      data: fansRate,
      smooth: true,
      showSymbol: false,
      yAxisIndex: 1,
      type: 'line',
      areaStyle: {}
    }]
  }
  return graph
}
export default drawGraph