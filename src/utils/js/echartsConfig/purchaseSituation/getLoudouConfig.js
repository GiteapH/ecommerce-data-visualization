import {
    get,
    post
} from '@/utils/axiosConfig/axios'

import actType from '@/utils/js/echartsConfig/Enum/actType'
import * as echarts from 'echarts'
function getColor(type) {
    var colors = {
        1: ["rgba(29,211,137,0.8)", "rgba(29,211,137,0)"],
        2: ["rgba(102,142,255,0.7)", "rgba(102,142,255,0)"],
        3: ["rgba(255,198,82,0.6)", "rgba(255,198,82,0)"],
        4: ["rgba(255,110,115,0.5)", "rgba(255,110,115,0)"],
        5: ["#8a88f180", "rgba(255,110,115,0)"],
        6: ["#9855ce80", "rgba(255,110,115,0)"],
        7: ["#e95a9d80", "rgba(255,110,115,0)"],
    }
    return colors[type]
}

export function setgetLoudouConfig(address) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        get({
            url: '/user-act-count/getCountByAddress?',
            params: {
                address: address
            }
        }).then(data => {
            data = data.sort((e1, e2) => {
                return e2.counts - e1.counts
            })
            let values = [],
                exchange = []
            let sum = 0
            let i = 0,
                pre = 0
            for (let info of data) {
                if (i != 0) {
                    exchange.push({
                        percent: parseFloat(info.counts / pre * 100).toFixed(2) + '%',
                        value: 140
                    })
                }
                values.push({
                    value: info.counts,
                    name: actType[`${info.actType}`].name,
                    type:info.actType,
                    itemStyle: {
                        normal: {
                            height: '68px'
                        }
                    }
                })
                sum += info.counts
                i++
                pre = info.counts
            }
            values = values.map(e => {
                e.percent = parseFloat(e.value / sum * 100).toFixed(2) + "%"
                return e
            })
            // data为可视化数据
            resolve({
                color: ['#1481E2', '#1F88E5', '#3594E8', '#4CA0EA', '#62ABED', '#79B8EF', '#8FC3F2'],
                xAxis: {
                    show: false,
                },
                yAxis: {
                    show: false,
                    type: 'category',
                    inverse: true,
                    min: 0,
                    max: 3,
                },
                series: [{
                    type: 'funnel',
                    minSize: 90,
                    maxSize: '70%',
                    left: '4%',
                    top: 50,
                    bottom: 50,
                    gap: 2,
                    label: {
                        position: 'inside',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 16,
                        color: '#fff',
                        formatter: '{b}{xx|}\n{c}',
                        rich: {
                            xx: {
                                padding: [6, 0]
                            }
                        }
                    },
                    data: values
                }, {
                    type: 'funnel',
                    minSize: 80,
                    maxSize: 80,
                    top: 50,
                    bottom: 50,
                    left: '-65%',
                    gap: 2,
                    label: {
                        position: 'insideLeft',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 14,
                        color: '#545454',

                        formatter: function (d) {
                            var ins = `{s|${d.data.name}}\n` + `{x|${d.data.percent}}`;
                            return ins
                        },
                        rich: {
                            s: {
                                fontSize: 14,
                                color: '#545454',
                                padding: [5, 0, 12, 0]
                            },
                            x: {
                                fontSize: 16,
                                color: '#545454',
                                fontWeight: 'bold'
                            }
                        }

                    },
                    itemStyle: {
                        color: 'transparent',
                        borderWidth: 0,
                    },
                    data:  values.map(e=>{
                        e.itemStyle = {
                            normal: {
                                height: '68px',
                                borderWidth: 0,
                                opacity: 1,
                                color:  getColor(e.type)[0],
                            },
                            
                        }

                        return e
                    })
                }, {
                    type: 'pictorialBar',
                    symbol: 'image://./img/drawio.png',
                    symbolSize: ['43.5%', 60],
                    z: 1,

                    symbolOffset: ['110%', 30],
                    label: {
                        show: true,
                        position: 'right',
                        offset: [15, 32],
                        align: 'center',
                        backgroundColor: 'rgba(249,249,249,1)',
                        width: 100,
                        height: 60,
                        distance: 5,
                        fontStyle: 'Microsoft YaHei',
                        formatter: function (d) {
                            var ins = '{s|转换率}\n' + `{x|${d.data.percent}}`;
                            return ins
                        },
                        rich: {
                            s: {
                                fontSize: 14,
                                color: '#545454',
                                padding: [5, 0, 12, 0]
                            },
                            x: {
                                fontSize: 16,
                                color: '#121212'
                            }
                        }
                    },
                    data: exchange
                }]
            })
        }).catch(err => {
            reject(err)
        })
    })
}

export default setgetLoudouConfig