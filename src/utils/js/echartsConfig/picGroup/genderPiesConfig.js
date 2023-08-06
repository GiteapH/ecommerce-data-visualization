/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-14 11:27:39
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-17 14:49:32
 * @FilePath: \vue-web\src\utils\js\echartsConfig\picGroup\genderPiesConfig.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import { get } from '@/utils/axiosConfig/axios'


export function setGenderRingConfig(address, model, group, level) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    let proc = [], datas = {}
    return new Promise((resolve, reject) => {
        proc.push(
            new Promise((resolve1, reject1) => {
                get({
                    url: "/base-user-tag/RFMSubsetCities",
                    params: {
                        province: level == 1 ? address : null,
                        city: level == 2 ? address : null,
                        tag: group,
                        model: model
                    }
                }).then(data => {
                    // data为可视化数据
                    datas.cities = data.map(e => {
                        return {
                            name: level == 0 ? e.province : (level == 1 ? e.city : e.county),
                            value: e.counts
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
                url: "/clv-forecast/SelectUserValue",
                params: {
                    address: address,
                    tag: group,
                    model: model,
                    type:60
                }
            }).then(data => {
                // data为可视化数据
                datas.userValues = data.map(e => {
                    return {
                        name: e.userValue,
                        value: e.counts
                    }
                })
                resolve1(datas)
            }).catch(err => {
                datas.userValues = [{
                    name: '高价值用户',
                    value: 0
                }, {
                    name: '低价值用户',
                    value: 0
                }]
                resolve1(datas)
            })
        }))
        Promise.all(proc).then(res => {
            
            resolve({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    top: '',
                    left: '-5',
                    show: false
                },
                graphic: {
                    type: 'text',     // 类型：文本
                    left: 'center',
                    top: 'middle',
                    silent: true,     // 不响应事件
                    invisible: datas.userValues.length > 0,   // 有数据就隐藏
                    style: {
                        fill: '#9d9d9d',
                        fontWeight: 'bold',
                        text: '暂无数据',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: '25px'
                    }
                },
                series: [
                    {
                        name: '价值人群分布',
                        type: 'pie',
                        radius: [15, 70],
                        center: ['25%', '50%'],
                        avoidLabelOverlap: false,
                        top: '15%',
                        label: {
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
                        data: datas.userValues
                    },
                    {
                        name: '用户群地区人数分布',
                        type: 'pie',
                        top: '15%',
                        radius: [15, 100],
                        center: ['75%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 5
                        },
                        data: datas.cities
                    }
                ]
            })
        })
    })
}

export default setGenderRingConfig