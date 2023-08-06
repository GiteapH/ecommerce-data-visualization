/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-30 19:53:27
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-07-03 19:57:48
 * @FilePath: \vue-web\src\utils\js\echartsConfig\shangpinFenbu\cityBang.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import {
    get,
    post
} from '@/utils/axiosConfig/axios'

export function setcityBang(xData,data) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        // 过滤浏览次数大于1的城市
        var filteredData = data.filter(function (item) {
            return item.value > 1;
        });

        // 按照浏览次数排序
        filteredData.sort(function (a, b) {
            return b.value - a.value;
        });
        
        resolve({

            // 配置项
            title: {
                text: '',
                subtext: '',
                left: 'center'
            },
            tooltip: {},
            legend: {
                data: xData
            },
            xAxis: {
                data: xData
            },
            yAxis: {},
            series: [{
                name: '浏览次数',
                type: 'bar',
                data: data
            }]
        })
    })
}

export default setcityBang