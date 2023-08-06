import {
    get,
    post
} from '@/utils/axiosConfig/axios'
import {
    CENTERED_ALIGNMENT
} from 'element-plus/es/components/virtual-list/src/defaults'

export function setfrmTotalConfig(address, time) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        var option;

        const schema = [{
            name: '用户累计消费',
            index: 0,
            text: '用户累计消费'
        },
        {
            name: '用户消费频率',
            index: 1,
            text: '用户消费频率'
        },
        {
            name: '用户最近一次消费',
            index: 2,
            text: '用户最近一次消费'
        },
        {
            name: '用户累计消费评价',
            index: 3,
            text: '用户累计消费评价'
        },
        {
            name: '用户消费频率评价',
            index: 4,
            text: '用户消费频率评价'
        },
        {
            name: '用户最近一次消费评价',
            index: 5,
            text: '用户最近一次消费评价'
        }
        ];
        const itemStyle = {
            opacity: 0.8,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0,0,0,0.3)'
        };



        get({
            url: '/getAllTagList',
            params: {
                address: address,
                time: time
            }
        }).then(data => {
            
            let legends = [], series = []
            let mxc = 0,mxr = 0
            for (let info in data) {
                legends.push(info)
                let t = {
                    name: info,
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: []
                }
                let limit = 80
                for (let { userId, consumptionCapacityNum, frequencyNum, recencyNum, consumptionCapacity, frequency, recency } of data[info]) {
                    if (limit-- >= 0){
                        t.data.push([consumptionCapacityNum, frequencyNum, recencyNum, consumptionCapacity, frequency, recency, userId])
                        mxc = Math.max(mxc,consumptionCapacityNum)
                        mxr = Math.max(mxr,recencyNum)
                    }
                }
                series.push(t)
            }
            
            option = {
                color: ['#dd4444', '#fec42c', '#80F1BE', '#4363f1', '#e7618e', '#50ff0a'],
                legend: {
                    top: 10,
                    data: legends,
                    textStyle: {
                        fontSize: 16
                    }
                },
                grid: {
                    left: '10%',
                    right: 150,
                    top: '18%',
                    bottom: '10%'
                },
                tooltip: {
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    formatter: function (param) {
                        var value = param.value;
                        // prettier-ignore
                        return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                            '用户id:' + value[6] +
                            '</div>' +
                            schema[1].text + '：' + value[1] + '<br>' +
                            schema[2].text + '：' + value[2] + '<br>' +
                            schema[0].text + '：' + value[0] + '<br>' +
                            schema[3].text + '：' + value[3] + '<br>' +
                            schema[4].text + '：' + value[4] + '<br>' +
                            schema[5].text + '：' + value[5] + '<br>'
                    }
                },
                xAxis: {
                    type: 'value',
                    name: '累计消费金额',
                    nameGap: 16,
                    nameTextStyle: {
                        fontSize: 16
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '最近一次消费日期',
                    nameLocation: 'end',
                    nameGap: 20,
                    nameTextStyle: {
                        fontSize: 16
                    },
                    splitLine: {
                        show: false
                    }
                },
                visualMap: [{
                    left: 'right',
                    top: '10%',
                    min: 0,                                  //指定 visualMapContinuous 组件的允许的最小值
                    max: mxc,
                    range:[0,mxc],
                    dimension: 0,
                    itemWidth: 30,
                    itemHeight: 120,
                    calculable: true,
                    text: ['累计消费金额'],
                    textGap: 30,
                    inRange: {
                        symbolSize: [10, 70]
                    },
                    outOfRange: {
                        symbolSize: [10, 70],
                        color: ['rgba(255,255,255,0.4)']
                    },
                    controller: {
                        inRange: {
                            color: ['#c23531']
                        },
                        outOfRange: {
                            color: ['#999']
                        }
                    }
                },
                {
                    left: 'right',
                    bottom: '14%',
                    dimension: 2,
                    itemHeight: 120,
                    calculable: true,
                    max:mxr,
                    text: ['最近一次消费日期'],
                    textGap: 10,
                    inRange: {
                        colorLightness: [0.9, 0.5]
                    },
                    outOfRange: {
                        color: ['rgba(255,255,255,0.4)']
                    },
                    controller: {
                        inRange: {
                            color: ['#c23531']
                        },
                        outOfRange: {
                            color: ['#999']
                        }
                    }
                }
                ],
                series: series
            };
            // data为可视化数据
            resolve(option)
        }).catch(err => {
            reject(err)
        })
    })
}

export default setfrmTotalConfig