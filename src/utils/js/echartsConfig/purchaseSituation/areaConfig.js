import {
    get,
    post
} from '@/utils/axiosConfig/axios'

export function setAreaConfig(address,province, city, level = 1) {
    
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        get({
            url: '/ProCitCount',
            params: {
                province: province,
                city: city
            }
        }).then(data => {
            let info = (address == null ? 'province' : (level == 1 ? 'city' : 'county'))
             
            var xAxis = data.map((e) => {
                return e[info]
            })
            var series = data.map((e) => { return e.counts })

             
            resolve({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                legend: {
                    data: xAxis
                },
                xAxis: [{
                    type: 'category',
                    axisLabel: {
                        interval:0,//代表显示所有x轴标签显示,
                        rotate:xAxis.length>10?40:0, //代表逆时针旋转45度

                    },
                    data:xAxis,
                    axisPointer: {
                        type: 'shadow'
                    }
                }],
                yAxis: [{
                    type: 'value',
                    name: '下单人数',
                    axisLabel: {
                        formatter: (value)=>{
                            if (value >= 10000 && value < 10000000) {
                                value = value / 10000 + "万";
                            } else if (value >= 10000000) {
                                value = value / 10000000 + "千万";
                            }
                            return value; 
                        }
                    }
                },
                {
                    type: 'value',
                    name: '',
                    show:false,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
                ],
                series: [{
                    name: '下单人数',
                    type: 'bar',
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + ' 人';
                        }
                    },
                    data: series
                },
                {
                    name: '',
                    type: 'line',
                    yAxisIndex: 1,
                    tooltip: {
                        show:false,
                    },
                    data: series
                }
                ]

            })

        }).catch(err => {
            reject(err)
        })
    })
}

export default setAreaConfig