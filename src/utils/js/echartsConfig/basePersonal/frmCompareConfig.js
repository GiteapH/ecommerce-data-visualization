/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-28 15:28:43
 * @FilePath: \vue-web\src\utils\js\echartsConfig\basePersonal\frmCompareConfig.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import {
    get,
    post
} from '@/utils/axiosConfig/axios'

export function setcompareConfig(time,ids) {
    let idsStr = ids.map(e=>{
        return `userId=${e}`
    }).join("&")
    return new Promise((resolve, reject) => {
        get({
            url: '/getUserById?'+idsStr,
            params: {
                time: time
            }
        }).then(data => {
            data = data.map(e => {
                return {
                    value:[e.consumptionCapacityNum,e.frequencyNum,e.recencyNum],
                    name:e.userId
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