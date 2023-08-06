/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-14 11:27:39
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-28 15:51:53
 * @FilePath: \vue-web\src\utils\js\echartsConfig\picGroup\ageRingConfig.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import { get } from '@/utils/axiosConfig/axios'


export function setAgeRingConfig(address, model, group) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    let proc = [],datas = {}
    return new Promise((resolve, reject) => {
        proc.push(
            new Promise((resolve1, reject1) => {
                get({
                    url: "/base-user-tag/SelectByAge",
                    params: {
                        address: address,
                        tag: group,
                        model: model
                    }
                }).then(data => {
                    // data为可视化数据
                    datas.age = data.map(e=>{
                        return {
                            name:e.age,
                            value:e.counts
                        }
                    })
                    resolve1(datas)
                }).catch(err => {
                    reject1(err)
                })
            })
        )
        proc.push(new Promise((resolve1, reject1) => {
            get({
                url: "/base-user-tag/SelectByGender",
                params: {
                    address: address,
                    tag: group,
                    model: model
                }
            }).then(data => {
                // data为可视化数据
                datas.gender = data.map(e=>{
                    return {
                        name:e.gender,
                        value:e.counts
                    }
                })
                resolve1(datas)
            }).catch(err => {
                reject1(err)
            })
        }))
        Promise.all(proc).then(res=>{
            resolve( {
                tooltip: {
                    trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    top: '',
                        left: '-5'
                },
                series: [
                    {
                        name: '年龄人群分布',
                        type: 'pie',
                        radius: [15, 70],
                        center: ['25%', '50%'],
                        avoidLabelOverlap: false,
                        top: '15%',
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 10,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: datas.age
                    },
                    {
                        name: '性别分布',
                        type: 'pie',
                        top: '15%',
                        radius: [15, 70],
                        center: ['75%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 5
                        },
                        data: datas.gender
                    }
                ]
            })
        })
    })
}

export default setAgeRingConfig