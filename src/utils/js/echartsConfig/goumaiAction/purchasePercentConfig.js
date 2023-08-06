/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-03 12:23:10
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-04 15:49:39
 * @FilePath: \vue-web\src\utils\js\echartsConfig\goumaiAction\purchasePercentConfig.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import {
    get,
    post
} from '@/utils/axiosConfig/axios'

import { formatDateTime } from '@/utils/utils'
export function setPurchasePercentConfig(address, repurchase) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        get({
            url: '/getAllUserTrade',
            params: {
                address: address,
                repurchase: repurchase
            }
        }).then((data = []) => {
            
            var dateSet = [], noRepurchaseNumSumSet = [], repurchaseShopNumSet = [], skuNumSet = [], percentChangeSet = []
            data.forEach((v, idx) => {
                dateSet.push(v.lastActDate)
                noRepurchaseNumSumSet.push([v.lastActDate, v.noRepurchaseNumSum])
                repurchaseShopNumSet.push([v.lastActDate, v.repurchaseShopNum])
                skuNumSet.push([v.lastActDate, v.skuNum])
                percentChangeSet.push([v.lastActDate, v.repurchaseShopNum / (v.repurchaseShopNum + v.noRepurchaseNumSum) * 100])
            })

            var chartsData = {
                noRepurchaseNumSumSet: noRepurchaseNumSumSet,
                repurchaseShopNumSet: repurchaseShopNumSet,
                skuNumSet: skuNumSet,
                percentChangeSet: percentChangeSet
            }, series = []

            var map = {
                dataSet: '日期',
                noRepurchaseNumSumSet: '非复购用户购买数',
                repurchaseShopNumSet: '复购用户购买数',
                skuNumSet: "用户购买商品数",
                percentChangeSet: "用户复购率变化"
            }


            for (let key in chartsData) {
                
                series.push({
                    yAxisIndex: key == 'percentChangeSet' ? 1 : 0,
                    name: map[key],
                    type: 'line',
                    smooth: true,
                    areaStyle: {},
                    lineStyle: {
                        width: 1
                    },
                    // markArea: {
                    //     silent: true,
                    //     itemStyle: {
                    //         opacity: 0.3
                    //     },
                    //     data: [
                    //         [
                    //             {
                    //                 xAxis: '2009/9/12\n7:00'
                    //             },
                    //             {
                    //                 xAxis: '2009/9/22\n7:00'
                    //             }
                    //         ]
                    //     ]
                    // },
                    data: chartsData[key]
                },)
            }

            let option = {
                grid: {
                    bottom: 80
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        animation: false,
                        label: {
                            backgroundColor: '#505765'
                        }
                    }
                },
                legend: {
                    data: ['非复购用户购买数', '复购用户购买数', '用户购买商品数', '用户复购率变化'],
                    left: 10,
                    selected: {
                        '用户购买商品数': false
                    }
                },
                dataZoom: [
                    {
                        show: true,
                        realtime: true,
                        start: 0,
                        end: 100
                    },
                    {
                        type: 'inside',
                        realtime: true,
                        start: 0,
                        end: 100
                    }
                ],
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        axisLine: { onZero: false },
                        // prettier-ignore
                        data: dateSet
                    }
                ],
                yAxis: [
                    {
                        name: '购买数',
                        type: 'value',
                    },
                    {
                        name: '复购率(%)',
                        nameLocation: 'start',
                        alignTicks: true,
                        type: 'value',
                        inverse: true,
                        max: 50,
                        min: 0,
                        axisLabel: {
                            formatter: function (value) {
                                return parseFloat(value).toFixed(2)
                            }
                        }
                    }
                ],
                series: series
            };

            resolve(option)
        })
    })
}
export default setPurchasePercentConfig