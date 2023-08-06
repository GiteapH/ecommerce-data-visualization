/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-06 16:46:44
 * @FilePath: \vue-web\src\utils\js\echartsConfig\frmValue\frmThreeConfig.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import {
    get,
    post
} from '@/utils/axiosConfig/axios'

export function setfrmThreeConfig(address, rfmTag, time) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        var datas = []
      
        get({
            url: '/getScatterPlot',
            params: {
                address: address,
                rfmTag: rfmTag,
                time: time
            }
        }).then(data => {
            // data为可视化数据
            
            var max = 0
            // data.forEach(e=>{
            //     max = Math.max(e.consumptionCapacityNum,max)
            // })
            datas = data.map(e=>{
                return [e.frequencyNum,e.consumptionCapacityNum,e.recencyNum]
            })
            var option = {
                color: ['#FFCCCC', 'GREEN'],
                tooltip: {
                    axisPointer: {
                        show: true,
                        type: 'cross',
                        lineStyle: {
                            type: 'dashed',
                            width: 1
                        }
                    },
                    formatter:({data})=>{
                        
                        return '用户的最近一次消费:'+data[2]+'天前'
                    }
                },
    
                toolbox: {
                    show: true,
                    x: 450,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataZoom: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        },
                    }
                },
                xAxis: [{
                    type: 'value',
                    scale: true,
                    splitNumber: 4,
                    name:'用户的消费频率'
                }],
                yAxis: [{
                    type: 'value',
                    scale: true,
                    splitNumber: 4,
                    name:'用户的累计支出'
                }],
                series: [{
                    name: '用户的最近一次消费',
                    type: 'scatter',
                    symbol: 'circle',
                    symbolSize: function (value) {
                        return value[2]/3
                    },
                    data:datas
                }]
            };
            resolve(option)
        }).catch(err => {
            reject(err)
        })
    })
}

export default setfrmThreeConfig