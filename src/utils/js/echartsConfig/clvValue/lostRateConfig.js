import {
    get,
    post
} from '@/utils/axiosConfig/axios'
import {
    CENTERED_ALIGNMENT
} from 'element-plus/es/components/virtual-list/src/defaults'

export function setLostRateConfig(params1, parmas2) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        // 设置CLV流失率图表的配置项
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['CLV', '流失率']
            },
            xAxis: [{
                type: 'category',
                data: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7']
            }],
            yAxis: [{
                    type: 'value',
                    name: 'CLV',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                {
                    type: 'value',
                    name: '流失率',
                    axisLabel: {
                        formatter: '{value}%'
                    }
                }
            ],
            series: [{
                    name: 'CLV',
                    type: 'bar',
                    data: [100, 120, 150, 130, 160, 140, 180]
                },
                {
                    name: '流失率',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [5, 6, 8, 7, 9, 7, 10]
                }
            ]
        };
        // get({
        //     url: url,
        //     params: {
        //         params1: params1,
        //         parmas2: parmas2
        //     }
        // }).then(data => {
        //     // data为可视化数据
        resolve(option)
        // }).catch(err=>{
        //     reject(err)
        // })
    })
}

export default setLostRateConfig