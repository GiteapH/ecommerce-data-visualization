import {
    get,
    post
} from '@/utils/axiosConfig/axios'

export function setgetLoudouConfig(params1, parmas2) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        get({
            url: '/getcount',
            params: {

            }
        }).then(data => {
            // data为可视化数据
            resolve({
                title: {
                    text: `电商大数据转化率`,
                    top: 26,
                    left: 'center',
                    textStyle: {
                        fontFamily: 'MicrosoftYaHei',
                        color: '#252525',
                        fontSize: 30,
                        fontWeight: 400
                    }
                },
                color: ['#1481E2', '#1F88E5', '#3594E8', '#4CA0EA', '#62ABED', '#79B8EF', '#8FC3F2'],
                xAxis: {
                    show: false,
                },
                yAxis: {
                    show: false,
                    type: 'category',
                    inverse: true,
                    min: 0,
                    max: 6,
                },
                series: [{
                    type: 'funnel',
                    minSize: 90,
                    maxSize: '70%',
                    left: '4%',
                    top: 100,
                    bottom: 50,
                    gap: 2,
                    label: {
                        position: 'inside',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 16,
                        color: '#fff',
                        formatter: '{b}{xx|}\n{c}',
                        rich: {
                            xx: {
                                padding: [6, 0]
                            }
                        }
                    },
                    data: [{
                            value: 2033,
                            name: '浏览和产品选择'
                        },
                        {
                            value: 2000,
                            name: '产品加入购物车'
                        },
                        {
                            value: 1820,
                            name: '结账和支付'
                        },
                        {
                            value: 1680,
                            name: '订单确认'
                        },
                        {
                            value: 800,
                            name: '交付和物流'
                        },
                        {
                            value: 500,
                            name: '用户满意度和售后服务'
                        },
                        {
                            value: 100,
                            name: '用户复购--价值用户'
                        },
                    ]
                }, {
                    type: 'funnel',
                    minSize: 80,
                    maxSize: 80,
                    top: 100,
                    bottom: 50,
                    left: '-68%',
                    gap: 2,
                    label: {
                        position: 'insideLeft',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 14,
                        color: '#545454',

                        formatter: function (d) {
                             
                            if (d.data.name === '整页拍照') {
                                return ' '
                            }
                            var ins = `{s|${d.data.name}}\n` + `{x|${d.data.percent}}`;
                            return ins
                        },
                        rich: {
                            s: {
                                fontSize: 14,
                                color: '#545454',
                                padding: [5, 0, 12, 0]
                            },
                            x: {
                                fontSize: 16,
                                color: '#545454',
                                fontWeight: 'bold'
                            }
                        }

                    },
                    itemStyle: {
                        color: 'transparent',
                        borderWidth: 0,
                    },
                    data: [{
                            value: 2030,
                            name: '浏览和产品选择',
                            percent: '90%'
                        },
                        {
                            value: 2000,
                            name: '产品加入购物车',
                            percent: '70%'
                        },
                        {
                            value: 1820,
                            name: '结账和支付',
                            percent: '60%'
                        },
                        {
                            value: 1680,
                            name: '订单确认',
                            percent: '50%'
                        },
                        {
                            value: 800,
                            name: '交付和物流',
                            percent: '30%'
                        },
                        {
                            value: 500,
                            name: '用户满意度和售后服务',
                            percent: '20%'
                        },
                        {
                            value: 100,
                            name: '用户复购--价值用户',
                            percent: '40%'
                        },
                    ]
                }, {
                    type: 'pictorialBar',
                    symbol: 'image://./img/drawio.png',
                    symbolSize: ['43.5%', 58],
                    z: 1,
                    symbolOffset: ['110%', 60],
                    label: {
                        show: true,
                        position: 'right',
                        offset: [15, 60],
                        align: 'center',
                        backgroundColor: 'rgba(249,249,249,1)',
                        width: 106,
                        height: 60,
                        fontStyle: 'Microsoft YaHei',
                        formatter: function (d) {
                            var ins = '{s|转换率}\n' + `{x|${d.data.percent}}`;
                            return ins
                        },
                        rich: {
                            s: {
                                fontSize: 14,
                                color: '#545454',
                                padding: [5, 0, 12, 0]
                            },
                            x: {
                                fontSize: 16,
                                color: '#121212'
                            }
                        }
                    },
                    data: [{
                        value: 140,
                        percent: '70%',
                    }, {
                        value: 140,
                        percent: '60%',
                    }, {
                        value: 140,
                        percent: '50%',
                    }, {
                        value: 140,
                        percent: '40%',
                    }, {
                        value: 140,
                        percent: '30%',
                    }, {
                        value: 140,
                        percent: '10%',
                    }]
                }]
            })
        }).catch(err => {
            reject(err)
        })
    })
}

export default setgetLoudouConfig