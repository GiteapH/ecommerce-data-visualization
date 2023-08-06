/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-03 20:29:04
 * @FilePath: \vue-web\src\utils\js\echartsConfig\goumaiAction\userBack.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import {
    get,
    post
} from '@/utils/axiosConfig/axios'
export function setuserBackConfig(address, repuchase) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        get({
            url: '/selectByCount',
            params: {
                address: address,
                repurchase: repuchase
            }
        }).then(data => {
            let ids = data.map(e=>{
                return e.actType
            })
            data = data.map(e => {
                return {
                    name: e.actType,
                    value: e.counts
                }
            })
            let option = {
                legend: {
                    top: 'bottom'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        name: 'Nightingale Chart',
                        type: 'pie',
                        radius: [40, 70],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 8
                        },
                        label:{
                            formatter: '用户id:{name|{b}}\n{value|用户购物次数:{c} 次}',
                            rich: {
                                value: {
                                    fontSize: 10,
                                    color: '#999'
                                }
                            }
                        },
                        data: data
                    }
                ]
            }
            resolve({
                option:option,
                ids:ids
            })
        })
    })
}

export default setuserBackConfig