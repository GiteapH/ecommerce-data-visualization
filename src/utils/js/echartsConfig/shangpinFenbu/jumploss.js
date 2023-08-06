/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-30 19:53:27
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-07-04 20:37:42
 * @FilePath: \vue-web\src\utils\js\echartsConfig\shangpinFenbu\jumploss.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import {
    get,
    post
} from '@/utils/axiosConfig/axios'

export function setjumploss(dataO,showLoss) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        let option = {
            baseOption: {
                timeline: {
                    axisType: 'category',
                    // realtime: false,
                    // loop: false,
                    autoPlay: true,
                    // currentIndex: 2,
                    playInterval: 1000,
                    // controlStyle: {
                    //     position: 'left'
                    // },
                    left:'1%',
                    right:'1%',
                    data: dataO.map(e => {
                        return e.province != null ? e.province : e.city
                    }),
                    label: {
                        formatter: function (s) {
                            return s
                        }
                    }
                },
                tooltip: {},
                calculable: true,
                grid: {
                    top: 80,
                    bottom: 100,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                            label: {
                                show: true,
                                formatter: function (params) {
                                    return params.value.replace('\n', '');
                                }
                            }
                        }
                    }
                },
                series: [
                    {
                        type: 'pie',
                    }
                ]
            },
            options: []
        };
        for (let info of dataO) {
            option.options.push({
                color: ['#61a0a8', '#c23531'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                lengend: {

                },
                series: [
                {
                    type: 'pie',
                    radius: '35%',
                    center:['75%',showLoss?'65%':'45%'],
                    data: [{
                        name:'5岁以下',
                        value:info.less5Count
                    },{
                        name:'5-10岁',
                        value:info.less10Count
                    },{
                        name:'10-20岁以',
                        value:info.less20Count
                    }]
                },
                {
                    type: 'pie',
                    radius: '35%',
                    center: ['25%', showLoss?'65%':'45%'],
                    data: [{
                        name:'男',
                        value:info.maleCount
                    },{
                        name:'女',
                        value:info.femaleCount
                    }]
                }]
            })
        }
        if(showLoss){
            get({
                url: '/sku-jump-loss/getSkuWatch'
            }).then(data => {
                let dataW = []
                
                dataW = data.map(e => {
                    return {
                        name: e.watch == 0 ? '浏览单个商品多次用户数' : '浏览商品一次用户数',
                        value: e.counts
                    }
                })
                option.options.forEach(e=>{
                    e.series.splice(0,0,{
                        type: 'pie',
                        radius: '30%',
                        center: ['50%', '25%'],
                        data: dataW
                    })
                })
                resolve(option)
            }).catch(err => {
                reject(err)
            })
        }else{
            resolve(option)
        }
    })
}

export default setjumploss