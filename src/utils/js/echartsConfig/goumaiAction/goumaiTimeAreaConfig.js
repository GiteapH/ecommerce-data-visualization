/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-07-09 20:29:10
 * @FilePath: \vue-web\src\utils\js\echartsConfig\goumaiAction\goumaiTimeAreaConfig.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import {
    get,
    post
} from '@/utils/axiosConfig/axios'

import * as echarts from 'echarts'
export function setTimeAreaConfig(address, repurchase) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        var option;
        get({
            url: '/getListByWeek',
            params: {
                address: address,
                repurchase: repurchase
            }
        }).then(data => {
            let sum = {
                0: [],
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                6: []
            }
            let max = 0, xData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],dateL =[
                '星期一', '星期二', '星期三',
                '星期四', '星期五', '星期六', '星期日'
            ]

            for (let i of data) {
                sum[i.week].push({
                    time: i.timePoint,
                    value: i.sumPurchase
                })
            }

            let option = {
                baseOption: {
                    tooltip: {},
                    timeline: {
                        axisType: 'category',
                        // realtime: false,
                        // loop: false,
                        autoPlay: true,
                        // currentIndex: 2,
                        playInterval: 1000,
                        // controlStyle: {
                        //     position: 'left'
                        // },
                        left: '1%',
                        right: '1%',
                        data: dateL,
                        label: {
                            formatter: function (s) {
                                return s
                            }
                        }
                    },
                    xAxis: {
                        data: xData.map(e=>e+"点"),
                        z: 10
                    },
                    yAxis: {
                        axisLabel: {
                            color: '#999'
                        }
                    },
                    dataZoom: [
                        {
                            type: 'inside'
                        }
                    ],
                },
                options: []
            };



            for (let date in sum) {
                option.options.push({
                    series: [{
                    name:dateL[date-1]+`${repurchase?'复购用户交易数量':'非复购用户交易数量'}`,
                    type: 'bar',
                    showBackground: true,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#83bff6' },
                            { offset: 0.5, color: '#188df0' },
                            { offset: 1, color: '#188df0' }
                        ])
                    },
                    emphasis: {
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#2378f7' },
                                { offset: 0.7, color: '#2378f7' },
                                { offset: 1, color: '#83bff6' }
                            ])
                        }
                    },
                    data: sum[date].map((e, i) => { return [e.time+1+"点", e.value] })
                }]
            })
            }

            // option = {

            //     tooltip: {
            //         position: 'top',
            //         formatter: (data)=>{
            //             return `时刻:${data.data[0]}点\n购物数量:${data.data[1]}`
            //         }
            //     },

            //     title: title,
            //     singleAxis: singleAxis,
            //     series: series
            // };

            // data为可视化数据
            resolve(option)
        }).catch(err => {
            reject(err)
        })
    })
}

export default setTimeAreaConfig