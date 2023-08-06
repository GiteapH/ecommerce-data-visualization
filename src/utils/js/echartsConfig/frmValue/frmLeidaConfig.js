import {
    get,
    post
} from '@/utils/axiosConfig/axios'

export function setLeidaConfig(address,rfmTag,time) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        var option;
//   // var maxr = 0,maxf=0
        // data.forEach(e=>{
        //     maxr = Math.max(e.recencyNum,maxr)
        //     maxf = Math.max(e.frequencyNum,maxf)
        // })

        // datas = data.map(e=>{
        //     return [e.frequencyNum,e.recencyNum,e.consumptionCapacityNum]
        // })
        // 
        

        get({
            url: '/getHeatMap',
            params: {
                address: address,
                rfmTag: rfmTag,
                time: time
            }
        }).then(data => {
            // data为可视化数据
            

            let mapR = new Map(),mapF = new Map()
            let datas = []
            let max = 0,min = 99999999
            let recency=new Set(),frequency=new Set()
            data.forEach(e=>{
                recency.add(e.recencyNum)
                frequency.add(e.frequencyNum)
                max = Math.max(max,e.consumptionAvg)
                min = Math.min(min,e.consumptionAvg)
            })
            
            recency = [...recency]
            frequency = [...frequency]
            frequency.sort((a,b)=>a-b)
            recency.sort((a,b)=>a-b)
            frequency.forEach((e,i)=>{
                mapF.set(e,i)
            })
            recency.forEach((e,i)=>{
                mapR.set(e,i)
            })
            data.forEach(e=>{
                datas.push([mapR.get(e.recencyNum),mapF.get(e.frequencyNum),e.consumptionAvg])
            })
            option = {
                    tooltip: {
                        position: 'top',
                        formatter: function (param) {
                            var value = param.value;
                            // prettier-ignore
                            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                                    'FR消费异动-M消费额度'+
                                '</div>' +
                                '最近一次消费日期' + '：' + recency[value[0]] + '<br>' +
                                '累计消费金额' + '：' + value[2] + '<br>' +
                                '消费频率' + '：' + frequency[value[1]] + '<br>' 
                        }
                    },
                    grid: {
                        height: '81%',
                        top: '10%'
                    },
                    xAxis: {
                        type: 'category',
                        data: recency,
                        splitArea: {
                            show: true
                        },
                        name:'最近一次消费日期(天)'
                    },
                    yAxis: {
                        type: 'category',
                        data: frequency,
                        splitArea: {
                            show: true
                        },
                        name:'消费频率'
                    },
                    visualMap: {
                        min: min,
                        max: max,
                        calculable: true,
                        orient: 'vertical ',
                        left: '2%',
                        bottom: '55%'
                    },
                    series: [
                        {
                            name: 'M累计消费',
                            type: 'heatmap',
                            data: datas,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
            resolve(option)
        })
    })
}

export default setLeidaConfig