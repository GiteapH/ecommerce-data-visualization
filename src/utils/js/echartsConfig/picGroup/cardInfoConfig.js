/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-15 17:24:44
 * @FilePath: \vue-web\src\utils\js\echartsConfig\picGroup\cardInfoConfig.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import {
    get,
    post
} from '@/utils/axiosConfig/axios'
export function setCardInfoConfig(address, model,tag,type) {
    return new Promise((resolveO,rejectO)=>{
        let proc = [],obj = {}
        proc.push(new Promise((resolve, reject) => {
            // 模拟数据
            get({
                url: '/clv-forecast/getTotalAndLoss',
                params: {
                    address: address,
                    model: model,
                    tag:tag,
                    type:type
                }
            }).then(data => {
                // data为可视化数据
                resolve(data==null?{
                    "avgLoss": 0,
                    "sumPrice":0,
                    "avgBack": 0,
                    "personal_avg":0
                }:data)
            }).catch(err => {
                resolve({
                    "avgLoss": 0,
                    "sumPrice":0,
                    "avgBack": 0,
                    "personal_avg":0
                })
            })
        }))
        proc.push(new Promise((resolve,reject)=>{
            get({
                url: 'transaction-interval/getTradingInterval',
                params: {
                    address: address,
                    day: type,
                    tag:tag,
                    type:model
                }
            }).then(data => {
                // data为可视化数据
                resolve({
                    avgdiff:data
                })
            }).catch(err => {
                resolve({
                    avgdiff:0
                })
            })
        }))
    
        Promise.all(proc).then(res=>{
            
            for(let pro of res){
                for(let i in pro){
                    obj[i] = pro[i]
                }
            }
            resolveO(obj)
        })
    })
}

export default setCardInfoConfig