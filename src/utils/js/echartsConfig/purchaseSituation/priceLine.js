import {
    get,
    post
} from '@/utils/axiosConfig/axios'

import price from '@/utils/js/echartsConfig/Enum/priceEnum'
export function setgetPriceConfig(address, time) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        get({
            url: "/rule-user-tag/getActivePrice",
            params: {
                address: address,
                time: time
            }
        }).then(data => {
            //     // data为可视化数据
             
            let pricesSplit = ['<=10','10-100','100-500','500-2500','2500-7000','7000-18000','>18000']
            data = data.sort((e1,e2)=>{
                return price[e1.activePrice]-price[e2.activePrice]
            })
            let values = data.map(e=>{
                return e.counts
            })
            resolve(
                {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {},
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: { readOnly: false },
                            magicType: { type: ['line', 'bar'] },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: pricesSplit
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: (value)=>{
                                if (value >= 10000 && value < 10000000) {
                                    value = value / 10000 + "万";
                                } else if (value >= 10000000) {
                                    value = value / 10000000 + "千万";
                                }
                                return value; 
                            }
                        }
                    },
                    series: [
                        {
                            name: '用户购买价格段总量',
                            type: 'line',
                            data: values,
                            markPoint: {
                                data: [
                                    { type: 'max', name: 'Max' },
                                    { type: 'min', name: 'Min' }
                                ]
                            },
                            markLine: {
                                data: [{ type: 'average', name: 'Avg' }]
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