import {
    get,
    post
} from '@/utils/axiosConfig/axios'
import {
    CENTERED_ALIGNMENT
} from 'element-plus/es/components/virtual-list/src/defaults'
import * as echarts from 'echarts'

export function setclvLostConfig(params1, parmas2) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        // 模拟数据
        var data = [{
                interval: 5,
                percentage: 0.65
            },
            {
                interval: 10,
                percentage: 0.85
            },
            {
                interval: 15,
                percentage: 0.95
            },
            {
                interval: 20,
                percentage: 0.92
            },
            {
                interval: 25,
                percentage: 0.88
            },
            {
                interval: 30,
                percentage: 0.76
            },
            // 其他数据...
        ];

        // 计算流失阈值
        var lossThreshold = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].percentage >= 0.95) {
                lossThreshold = data[i].interval;
                break;
            }
        }



        // 配置图表选项
        var option = {
            title: {
                text: '流失率图表',
                subtext: '最新交易间隔大于' + lossThreshold + '天的用户说明流失',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                formatter: '{b}天流失率：{c}%'
            },
            xAxis: {
                type: 'category',
                data: data.map(function (item) {
                    return item.interval + '天';
                }),
                name: '交易间隔'
            },
            yAxis: {
                type: 'value',
                name: '流失率（%）'
            },
            series: [{
                type: 'bar',
                name: '流失率',
                data: data.map(function (item) {
                    return {
                        value: item.percentage * 100,
                        interval: item.interval
                    };
                }),
                label: {
                    show: true,
                    formatter: '{c}%'
                }
            }, {
                type: 'line',
                name: '阈值',
                data: [lossThreshold],
                symbol: 'none',
                lineStyle: {
                    type: 'dashed'
                },
                label: {
                    show: true,
                    formatter: '流失阈值'
                }
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

export default setclvLostConfig