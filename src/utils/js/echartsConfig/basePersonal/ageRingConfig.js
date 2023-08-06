/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-14 11:27:39
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-28 18:39:55
 * @FilePath: \vue-web\src\utils\js\echartsConfig\basePersonal\ageRingConfig.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import { get } from '@/utils/axiosConfig/axios'


const getStr = (v)=>{
    switch(v){
        case 'afternoon':return '下午'
        case 'dawn':return '凌晨'
        case 'evening':return '晚上'
        case 'morning':return '早晨'
        case 'noon':return '上午'
        case 'midday':return '中午'
        case 'superLow':return '<=10'
        case 'low':return '10-100'
        case 'medium':return '100-500'
        case 'aboveModerate':return '500-2500'
        case 'finest':return '2500-7000'
        case 'higher':return '7000-18000'
        case 'highest':return '>18000'
    }
}

export function setAgeRingConfig(time,id) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    let proc = [],datas = {}
    return new Promise((resolve, reject) => {
        proc.push(
            new Promise((resolve1, reject1) => {
                get({
                    url: "/user-centralized/getById",
                    params: {
                        type:time,
                        id:id
                    }
                }).then(data => {
                    // data为可视化数据
                    datas.date = []
                    datas.price = []
                    for(let key in data){
                        if(key=='user'||key=='address')continue
                        if(key=='afternoon'||key=='dawn'||key=='evening'||key=='morning'||key=='noon'||key=='midday'){
                            datas.date.push({
                                name:getStr(key),
                                value:data[key]
                            })
                        }else{
                            datas.price.push({
                                name:getStr(key),
                                value:data[key]
                            })
                        }
                    }
                    resolve1(datas)
                }).catch(err => {
                    reject1(err)
                })
            })
        )
        Promise.all(proc).then(res=>{
            resolve({
                option:{
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
                            name: '活跃时间分布',
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
                            data: datas.date
                        },
                        {
                            name: '价格喜好分布',
                            type: 'pie',
                            top: '15%',
                            radius: [15, 70],
                            center: ['75%', '50%'],
                            roseType: 'area',
                            itemStyle: {
                                borderRadius: 5
                            },
                            data: datas.price
                        }
                    ]
                },
                data:datas
            })
        })
    })
}

export default setAgeRingConfig