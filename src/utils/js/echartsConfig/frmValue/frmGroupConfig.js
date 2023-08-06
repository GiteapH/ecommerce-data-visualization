/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-07 11:27:21
 * @FilePath: \vue-web\src\utils\js\echartsConfig\frmValue\frmGroupConfig.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import {
    get,
    post
} from '@/utils/axiosConfig/axios'

export function setGroupConfig(address, time) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        // 模拟数据
        const data = []
        get({
            url: '/getPersonDistribution',
            params: {
                address: address,
                time: time
            }
        }).then(data => {
            data = data.map(e=>{
                return {
                    value:e.counts,
                    name:e.actType
                }
            })
            const option = {
                tooltip: {},
                legend:{
                },
                series: [{
                    type: 'pie',
                    radius: '55%',
                    top:'15%',
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                },]
            }
            // data为可视化数据
            resolve(option)
        }).catch(err => {
            reject(err)
        })
    })
}

export default setGroupConfig