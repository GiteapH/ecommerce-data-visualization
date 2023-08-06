/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-08 16:05:22
 * @FilePath: \vue-web\src\utils\js\echartsConfig\frmValue\frmCompareConfig.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import {
    get,
    post
} from '@/utils/axiosConfig/axios'

export function setcompareConfig(address, rfmTag, time) {
    let rfmTagParam = ''
    for (let rt of rfmTag) {
        rfmTagParam += `rfmTag=${rt}&`
    }
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {

        get({
            url: '/getRFMScore?' + rfmTagParam.substring(0, rfmTagParam.length - 1),
            params: {
                address: address,
                time: time
            }
        }).then(data => {
            
            data = data.map(e => {
                return {
                    value: [e.consumptionAvg, e.frequencyAvg, e.recencyAvg],
                    name: e.rfmTag
                }
            })
            // 配置雷达图参数
            const option = {
                tooltip: {},
                legend: {
                    data: data.map(e => {
                        return e.name
                    }),
                    bottom:'1%'
                },
                radar: {
                    indicator: [{
                        name: 'Monetary',
                    },
                    {
                        name: 'Frequency',
                    },
                    {
                        name: 'Recency',
                    },
                    ],
                },
                series: [{
                    type: 'radar',
                    data: data,
                },],
            };
            // data为可视化数据
            resolve(option)
        }).catch(err => {
            reject(err)
        })
    })
}

export default setcompareConfig