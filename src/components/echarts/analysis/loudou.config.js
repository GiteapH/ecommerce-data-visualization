import actType from '@/utils/js/echartsConfig/Enum/actType'

function formatter(data) {
    let map = new Map();
    let types = ['view', 'buy', 'fan', 'comment', 'cart', 'consult','complain']
    data.forEach(e => {

        types.forEach((type, idx) => {
            if (e[type] != 0) {
                if (map.has(idx)) {
                    map.set(idx, map.get(idx) + e[type])
                } else {
                    map.set(idx, 1)
                }
            }
        })

    })
    let ret = []
    map.forEach((value, key) => {
        ret.push({
            actType: key + 1,
            counts: value
        })
    })
    return ret
}

export function setLoudouConfig(data) {
    data = formatter(data)
    console.error(data)
    data = data.sort((e1, e2) => {
        return e2.counts - e1.counts
    })
    let values = [],
        exchange = []
    let sum = 0
    let i = 0,
        pre = 0
    for (let info of data) {
        if (i != 0) {
            exchange.push({
                percent: parseFloat(info.counts / pre * 100).toFixed(2) + '%',
                value: 140
            })
        }
        values.push({
            value: info.counts,
            name: actType[`${info.actType}`].name,
            itemStyle: {
                normal: {
                    height: '68px'
                }
            }
        })
        sum += info.counts
        i++
        pre = info.counts
    }
    values = values.map(e => {
        e.percent = parseFloat(e.value / sum * 100).toFixed(2) + "%"
        return e
    })
    // data为可视化数据
    return {
        color: ['#1481E2', '#1F88E5', '#3594E8', '#4CA0EA', '#62ABED', '#79B8EF', '#8FC3F2'],
        xAxis: {
            show: false,
        },
        yAxis: {
            show: false,
            type: 'category',
            inverse: true,
            min: 0,
            max: 3,
        },
        series: [{
            type: 'funnel',
            minSize: 90,
            maxSize: '70%',
            left: '4%',
            top: 50,
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
            data: values
        }, {
            type: 'funnel',
            minSize: 80,
            maxSize: 80,
            top: 50,
            bottom: 50,
            left: '-65%',
            gap: 2,
            label: {
                position: 'insideLeft',
                fontFamily: 'Microsoft YaHei',
                fontSize: 14,
                color: '#545454',

                formatter: function (d) {
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
            data: values
        }, {
            type: 'pictorialBar',
            symbol: 'image://./img/drawio.png',
            symbolSize: ['43.5%', 60],
            z: 1,

            symbolOffset: ['110%', 30],
            label: {
                show: true,
                position: 'right',
                offset: [15, 32],
                align: 'center',
                backgroundColor: 'rgba(249,249,249,1)',
                width: 100,
                height: 60,
                distance: 5,
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
            data: exchange
        }]
    }
}

export default setLoudouConfig