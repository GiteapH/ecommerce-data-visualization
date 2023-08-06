import {
    get,
    post
} from '@/utils/axiosConfig/axios'


import price from '@/utils/js/echartsConfig/Enum/priceEnum'

import timeEnum from '@/utils/js/echartsConfig/Enum/timeLine'

export function setgetPriceConfig(address, time) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        get({
            url: "/rule-user-tag/getTimePrice",
            params: {
                address: address,
                time: time
            }
        }).then(info => {
            //     // data为可视化数据
            info = info.map(e => {
                return [price[e.priceLike].idx, timeEnum[e.activeTime].idx, e.timePriceCount]
            })

            let timeSplit = ['凌晨', '早上', '上午', '中午', '下午', '晚上']
            let pricesSplit = ['<=10', '10-100', '100-500', '500-2500', '2500-7000', '7000-18000', '>18000']
            
            resolve(
                {
                    backgroundColor: '#f7f8fa',
                    legend: {
                        right: '10%',
                        top: '3%',
                        data: ['价格段-时间段的购买总量']
                    },
                    grid: {
                        left: '8%',
                        top: '30%'
                    },
                    xAxis: {
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
                        show: true,
                        axisLabel: {
                            formatter: (value, index) => {
                                return pricesSplit[value]
                            },
                        }
                    },
                    yAxis: {
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
                        scale: true,
                        axisLabel: {
                            formatter: (value, index) => {
                                return timeSplit[value]
                            },
                        }
                    },
                    series: [
                        {
                            name: '价格段-时间段的购买总量',
                            data: info,
                            type: 'scatter',
                            symbolSize: function (data) {
                                return Math.sqrt(data[2]) / 7.5;
                            },
                            emphasis: {
                                focus: 'series',
                                label: {
                                    show: true,
                                    formatter: function (param) {
                                        return param.data[2];
                                    },
                                    position: 'bottom'
                                }
                            },
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(120, 36, 50, 0.5)',
                                // shadowOffsetY: 5,
                                color: 'rgb(251, 118, 123)'
                            }
                        }
                    ]
                }
            )
        }).catch(err => {
            reject(err)
        })
    })
}

export default setgetPriceConfig