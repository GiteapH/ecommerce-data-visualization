/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-03 12:23:10
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-03 16:01:17
 * @FilePath: \vue-web\src\utils\js\echartsConfig\goumaiAction\timeChangeConfig.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import {
    get,
    post
} from '@/utils/axiosConfig/axios'

import {formatDateTime} from '@/utils/utils'
export function setTimeChangeConfig(userIdList=[]) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        get({
            url: '/getUsersRepur',
            params: {
                'userIdList' : encodeURIComponent(userIdList)
            }
        }).then(data => {
            var chartDatas = []
            var dateSet = new Set()
            userIdList.forEach((e,index)=>{
                chartDatas[index] = data.filter(e2=>{
                    return e2.id == e
                })
            })
            
            data = chartDatas.map((value,index)=>{
                
                return {
                    name: userIdList[index],
                    type: 'line',
                    smooth: true,
                    stack: 'Total',
                    data: value.length==0?[]: value.map(v2=>{
                        dateSet.add(formatDateTime(new Date(v2.lastActDate +" "+v2.lastActTime)))
                        return [formatDateTime(new Date(v2.lastActDate +" "+v2.lastActTime)),v2.purchaseNum]
                    })
                }
            })
            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: [...dateSet]
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data:  [...dateSet]
                },
                yAxis: {
                    type: 'value'
                },
                series:data
            }

            resolve(option)
        })
    })
}
export default setTimeChangeConfig