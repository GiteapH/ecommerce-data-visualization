/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-07-29 14:08:00
 * @FilePath: \vue-web\src\utils\axiosConfig\axios.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import axios from 'axios'
axios.defaults.timeout = 10000
const instance = axios.create({
    // ylj的接口ip+端口号
    // baseURL: "http://116.204.124.17:9999",
    baseURL: "http://localhost:9999",
    timeout: 60000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})


export function post({
    url,
    data,
    params,
    headers
}) {
    return new Promise((resolve, reject) => {
        instance.post(url, data, {
            params: params,
            headers: headers
        }).then(res => {
            if (res.data.code == 200) {
                resolve(res.data.data)
            } else {
                reject(res.data.msg)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

export function get({
    url,
    params
}) {

    return new Promise((resolve, reject) => {
        instance.get(url, {
            params: params,
        }).then(res => {

            if (res.data.features) {
                resolve(res.data)
            } else if (res.data.code == 200) {
                resolve(res.data.data)
            } else {
                reject(res.data.msg)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

export default instance