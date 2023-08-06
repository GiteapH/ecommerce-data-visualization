/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-25 10:22:40
 * @FilePath: \vue-web\src\utils\js\echartsConfig\basePersonal\cardInfoConfig.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import {
    get,
    post
} from '@/utils/axiosConfig/axios'
export function setCardInfoConfig(model, id, type) {
    return new Promise((resolveO, rejectO) => {
        let proc = [], obj = {}
        proc.push(new Promise((resolve, reject) => {
            // 模拟数据
            get({
                url: '/clv-forecast/getById',
                params: {
                    model: model,
                    clvUid: id,
                    type: type
                }
            }).then(data => {
                // data为可视化数据
                resolve(data == null ? {
                    "forecastLoss": 0.0,
                    "forecastPrice": 0.0,
                    "forecastBack": 0.0,
                    avgdiff: 0.0,
                    "clvUid": id
                } : data)
            }).catch(err => {
                resolve({
                    "forecastLoss": 0.0,
                    "forecastPrice": 0.0,
                    "forecastBack": 0.0,
                    avgdiff: 0.0,
                    "clvUid": id
                })
            })
        }))

        Promise.all(proc).then(res => {
            
            for (let pro of res) {
                for (let i in pro) {
                    obj[i] = pro[i]
                }
            }
            resolveO(obj)
        })
    })
}

export default setCardInfoConfig