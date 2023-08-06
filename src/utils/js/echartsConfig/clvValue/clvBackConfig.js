import {
    get,
    post
} from '@/utils/axiosConfig/axios'
import {
    CENTERED_ALIGNMENT
} from 'element-plus/es/components/virtual-list/src/defaults'

export function setBackConfig(params1, parmas2) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        // 假设你已经计算得到符合要求的数据
        var regressionData = [{
                period: 'Q1',
                regressionRate: 0.15
            },
            {
                period: 'Q2',
                regressionRate: 0.12
            },
            {
                period: 'Q3',
                regressionRate: 0.1
            },
            {
                period: 'Q4',
                regressionRate: 0.08
            },
            {
                period: 'Q5',
                regressionRate: 0.06
            },
            {
                period: 'Q6',
                regressionRate: 0.04
            },
            {
                period: 'Q7',
                regressionRate: 0.02
            }
        ];

        // 提取周期和回归率数据
        var periods = regressionData.map(item => item.period);
        var regressionRates = regressionData.map(item => item.regressionRate);

        // 设置CLV回归率图表的配置项
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
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: periods,
                axisLine: {
                    lineStyle: {
                        color: '#999999'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#666666'
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: '回归率',
                axisLine: {
                    lineStyle: {
                        color: '#999999'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#dddddd'
                    }
                },
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#666666'
                    }
                }
            },
            series: [{
                name: '回归率',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: regressionRates
            }]
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

export default setBackConfig