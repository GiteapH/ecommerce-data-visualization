import {
    get,
    post
} from '@/utils/axiosConfig/axios'
import {
    CENTERED_ALIGNMENT
} from 'element-plus/es/components/virtual-list/src/defaults'

export function setTimeAreaConfig(params1, parmas2) {
    // TODO
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        var option;
        const builderJson = {
            all: 10887,
            charts: {
                江苏: 3237,
                山东: 2164,
                新疆: 7561,
                甘肃: 7778,
                浙江: 7355,
                上海: 2405,
                北京: 1842,
                天津: 2090,
                福建: 1762,
                广东: 1593,
                四川: 2060,
                贵州: 1537,
                云南: 1908,
                广西: 2107,
                河南: 1692,
                安徽: 1568
            },
            components: {
                '1:00-3:00': 2788,
                '3:00-5:00': 9575,
                '5:00-7:00': 9400,
                '7:00-9:00': 9466,
                '9:00-11:00': 9266,
                '11:00-13:00': 3419,
                '13:00-15:00': 2984,
                '15:00-17:00': 2739,
                '17:00-19:00': 2744,
                '19:00-21:00': 2466,
                '21:00-23:00': 3034,
                '23:00-24:00': 1945
            },
            ie: 9743
        };
        const downloadJson = {
            '京东': 17365,
            '淘宝': 4079,
            '拼多多': 6929,
            '唯品会': 14890
        };
        const themeJson = {
            '母婴类': 1594,
            '鞋袜类': 925,
            '电商数码类': 1608,
            '食品类': 721,
            '生鲜类': 2179,
            '图书类': 1982
        };
        const waterMarkText = 'ECHARTS';
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.height = 100;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = 0.08;
        ctx.font = '20px Microsoft Yahei';
        ctx.translate(50, 50);
        ctx.rotate(-Math.PI / 4);
        ctx.fillText(waterMarkText, 0, 0);
        option = {
            backgroundColor: {
                type: 'pattern',
                image: canvas,
                repeat: 'repeat'
            },
            tooltip: {},
            title: [{
                    text: '全国电商销售榜',
                    subtext: '总计 ' + builderJson.all,
                    left: '25%',
                    textAlign: 'center'
                },
                {
                    text: '电商APP使用占比',
                    subtext: '总计 ' +
                        Object.keys(downloadJson).reduce(function (all, key) {
                            return all + downloadJson[key];
                        }, 0),
                    left: '75%',
                    textAlign: 'center'
                },
                {
                    text: '各类商品销售',
                    subtext: '总计 ' +
                        Object.keys(themeJson).reduce(function (all, key) {
                            return all + themeJson[key];
                        }, 0),
                    left: '75%',
                    top: '50%',
                    textAlign: 'center'
                }
            ],
            grid: [{
                    top: 50,
                    width: '50%',
                    bottom: '45%',
                    left: 10,
                    containLabel: true
                },
                {
                    top: '55%',
                    width: '50%',
                    bottom: 0,
                    left: 10,
                    containLabel: true
                }
            ],
            xAxis: [{
                    type: 'value',
                    max: builderJson.all,
                    splitLine: {
                        show: false
                    }
                },
                {
                    type: 'value',
                    max: builderJson.all,
                    gridIndex: 1,
                    splitLine: {
                        show: false
                    }
                }
            ],
            yAxis: [{
                    type: 'category',
                    data: Object.keys(builderJson.charts),
                    axisLabel: {
                        interval: 0,
                        rotate: 30
                    },
                    splitLine: {
                        show: false
                    }
                },
                {
                    gridIndex: 1,
                    type: 'category',
                    data: Object.keys(builderJson.components),
                    axisLabel: {
                        interval: 0,
                        rotate: 30
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: [{
                    type: 'bar',
                    stack: 'chart',
                    z: 3,
                    label: {
                        position: 'right',
                        show: true
                    },
                    data: Object.keys(builderJson.charts).map(function (key) {
                        return builderJson.charts[key];
                    })
                },
                {
                    type: 'bar',
                    stack: 'chart',
                    silent: true,
                    itemStyle: {
                        color: '#eee'
                    },
                    data: Object.keys(builderJson.charts).map(function (key) {
                        return builderJson.all - builderJson.charts[key];
                    })
                },
                {
                    type: 'bar',
                    stack: 'component',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    z: 3,
                    label: {
                        position: 'right',
                        show: true
                    },
                    data: Object.keys(builderJson.components).map(function (key) {
                        return builderJson.components[key];
                    })
                },
                {
                    type: 'bar',
                    stack: 'component',
                    silent: true,
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    itemStyle: {
                        color: '#eee'
                    },
                    data: Object.keys(builderJson.components).map(function (key) {
                        return builderJson.all - builderJson.components[key];
                    })
                },
                {
                    type: 'pie',
                    radius: [0, '30%'],
                    center: ['75%', '25%'],
                    data: Object.keys(downloadJson).map(function (key) {
                        return {
                            name: key.replace('.js', ''),
                            value: downloadJson[key]
                        };
                    })
                },
                {
                    type: 'pie',
                    radius: [0, '30%'],
                    center: ['75%', '75%'],
                    data: Object.keys(themeJson).map(function (key) {
                        return {
                            name: key.replace('.js', ''),
                            value: themeJson[key]
                        };
                    })
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

export default setTimeAreaConfig