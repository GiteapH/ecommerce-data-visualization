/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-07 19:28:50
 * @FilePath: \vue-web\src\utils\js\echartsConfig\frmValue\frmThreeConfig.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import {
    get,
    post
} from '@/utils/axiosConfig/axios'

export function setSliderConfig(address,time, R, F, M) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        var datas = []
        get({
            url: `/getRangeCounts?F=${F[0]}&F=${F[1]}&M=${M[0]}&M=${M[1]}&R=${R[0]}&R=${R[1]}`,
            params: {
                address: address,
                time:time
            }
        }).then(data => {
            // data为可视化数据

            let yData = [],values = []
            for(let info of data){
                yData.push(info.tag)
                values.push(info.count)
            }
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: yData
                },
                series: [
                    {
                        name: '用户群体',
                        type: 'bar',
                        data: values,
                        markLine: {
                            data: [{ type: 'average', name: 'Avg' }]
                        }
                    }
                ]
            };
            resolve(option)
        }).catch(err => {
            reject(err)
        })
    })
}

export default setSliderConfig