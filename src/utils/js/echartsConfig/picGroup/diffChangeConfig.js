/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-14 11:27:39
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-17 11:47:43
 * @FilePath: \vue-web\src\utils\js\echartsConfig\picGroup\diffChangeConfig.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import { get } from '@/utils/axiosConfig/axios'


export function setDiffChangeConfig(address, model, group) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    let proc = [],datas = {},set = new Set()
    return new Promise((resolve, reject) => {
        proc.push(
            new Promise((resolve1, reject1) => {
                get({
                    url: "/transaction-interval/getIntervalVaries",
                    params: {
                        address: address,
                        tag: group,
                        type: model
                    }
                }).then(data => {
                    // data为可视化数据
                    datas.change = data.map(e=>{
                        set.add(e.startDate)
                        return [e.startDate,e.average]
                    })
                    resolve1(datas)
                }).catch(err => {
                    reject1(err)
                })
            })
        )
        Promise.all(proc).then(res=>{
            resolve( {
                tooltip:{},
                legend:{
                    data:[...set]
                },
                xAxis:{
                    type:'category',        //坐标轴类型：类目轴
                    data:[...set],
                    name:'日期'
                },
                yAxis:{
                    type:'value',
                    name:'据下一次交易间隔天数'        //坐标轴类型：数值轴
                },
                graphic: {
                    type: 'text',     // 类型：文本
                    left: 'center',
                    top: 'middle',
                    silent: true,     // 不响应事件
                    invisible: datas.change.length > 0,   // 有数据就隐藏
                    style: {
                        fill: '#9d9d9d',
                        fontWeight: 'bold',
                        text: '暂无数据',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: '25px'
                    }
                },
                series:[{
                    name:'交易间隔',
                    type:'line',
                    data:datas.change,
                    smooth:true,        //平滑曲线图。值可为数字      
                }]
            })
        })
    })
}

export default setDiffChangeConfig