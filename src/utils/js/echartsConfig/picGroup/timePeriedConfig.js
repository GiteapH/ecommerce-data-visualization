/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-14 11:27:39
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-17 14:50:13
 * @FilePath: \vue-web\src\utils\js\echartsConfig\picGroup\timePeriedConfig.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import { get } from '@/utils/axiosConfig/axios'


export function setTimePeriedConfig(address, model, group) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    let proc = [], datas = {}, set = new Set(),map = {
        today:'今日(2018-4-15)',
        yesterday:'昨日',
        inweek:'一周内',
        inmonth:'一月内',
        outmonth:'一月外'
    }
    return new Promise((resolve, reject) => {
        proc.push(
            new Promise((resolve1, reject1) => {
                get({
                    url: "/transaction-interval/timePeriod",
                    params: {
                        address: address,
                        tag: group,
                        type: model
                    }
                }).then(data => {
                    // data为可视化数据
                    datas.timePeried = []
                    for(let info in data){
                        datas.timePeried.push(data[info])
                        set.add(map[info])
                    }
                    resolve1(datas)
                }).catch(err => {
                    reject1(err)
                })
            })
        )
        Promise.all(proc).then(res => {
            resolve({
                tooltip: {},
                legend: {
                    data: [...set]
                },
                xAxis: {
                    name:'人数',
                    show:true,
                    type: "value",
                },
                yAxis: {
                    type: "category",
                    data: [...set],
                    name:'最后一次交易时间'
                },
                graphic: {
                    type: 'text',     // 类型：文本
                    left: 'center',
                    top: 'middle',
                    silent: true,     // 不响应事件
                    invisible: datas.timePeried.length > 0,   // 有数据就隐藏
                    style: {
                        fill: '#9d9d9d',
                        fontWeight: 'bold',
                        text: '暂无数据',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: '25px'
                    }
                },
                series: [{
                    name: '最后一次交易时间',
                    type: 'bar',
                    data: datas.timePeried
                }]
            })
        })
    })
}

export default setTimePeriedConfig