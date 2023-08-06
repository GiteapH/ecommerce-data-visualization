/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-14 11:27:39
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-02 15:45:22
 * @FilePath: \vue-web\src\utils\js\echartsConfig\basePersonal\buyChangeConfig.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import { get } from '@/utils/axiosConfig/axios'

const actTypeStr = (type) => {
    switch (type) {
        case 1: return '浏览'
        case 2: return '下单'
        case 3: return '关注'
        case 4: return '评论'
        case 5: return '加入购物车'
    }
}

export function setBuyChangeConfig(id) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    let proc = [], map = new Map(), set = new Set(), datas = [], f = true
    return new Promise((resolve, reject) => {
        proc.push(
            new Promise((resolve1, reject1) => {
                get({
                    url: "/user-act/UserTypeCountById",
                    params: {
                        userId: id
                    }
                }).then(data => {
                    // data为可视化数据
                    data.forEach(e => {
                        set.add(e.actDate)
                        e.actType = actTypeStr(e.actType)
                        if (map.has(e.actType)) {
                            map.get(e.actType).push([e.actDate, e.counts])
                        } else {
                            map.set(e.actType, [[e.actDate, e.counts]])
                        }
                    })
                    map.forEach((v, k) => {
                        if (v.length != 0) f = false
                        datas.push({
                            name: k,
                            type: 'line',
                            data: v.sort((e1, e2) => {
                                return new Date(e1[0]).getTime() - new Date(e2[0]).getTime()
                            }),
                            smooth: true,
                        })
                    })
                    resolve1(true)
                }).catch(err => {
                    reject1(err)
                })
            })
        )
        Promise.all(proc).then(res => {
            let xs = [...set].sort((a, b) => {
                return new Date(a).getTime() - new Date(b).getTime()
            })
            resolve({
                option:{
                    tooltip: {},
                    legend: {
                        data: [...map.keys()]
                    },
                    xAxis: {
                        type: 'category',        //坐标轴类型：类目轴
                        data: xs,
                        name: '日期'
                    },
                    yAxis: {
                        type: 'value',
                        name: '交易次数'        //坐标轴类型：数值轴
                    },
                    graphic: {
                        type: 'text',     // 类型：文本
                        left: 'center',
                        top: 'middle',
                        silent: true,     // 不响应事件
                        invisible: !f,   // 有数据就隐藏
                        style: {
                            fill: '#9d9d9d',
                            fontWeight: 'bold',
                            text: '暂无数据',
                            fontFamily: 'Microsoft YaHei',
                            fontSize: '25px'
                        }
                    },
                    series: datas
                },
                xData:xs,
                data:datas
            })
        })
    })
}

export default setBuyChangeConfig