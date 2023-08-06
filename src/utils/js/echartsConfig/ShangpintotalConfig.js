import {
    get,
    post
} from '@/utils/axiosConfig/axios'
import * as echarts from 'echarts'
export function setshangPinTotalConfig(address) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        var option;

        get({
            url: '/getCtmUnitPrice',
            params: {
                address: address
            }
        }).then(data => {
            // x轴
            let xData = [],dataS=[],dataC=[]
            data.sort(function() {
                return (0.5-Math.random());
            });
            for(let info of data){
                xData.push(info.sku)
                dataC.push(info.ctmUnitPrice)
                dataS.push(info.acSales)
            }
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        label: {
                            show: true
                        }
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                legend: {
                    data: ['总销售额', '客单价'],
                    itemGap: 5
                },
                grid: {
                    top: '12%',
                    left: '1%',
                    right: '10%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xData,
                        axisPointer: {
                          type: 'shadow'
                        }
                      }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '总销售额',
                        axisLabel: {
                            formatter: function (a) {
                                a = +a;
                                return isFinite(a) ? echarts.format.addCommas(+a / 1000) : '';
                            }
                        }
                    },
                    {
                        type: 'value',
                        name: '客单价',
                        axisLabel: {
                            formatter: '{value}元'
                        }
                    }
                ],
                dataZoom: [
                    {
                        show: true,
                        start: 94,
                        end: 100
                    },
                    {
                        type: 'inside',
                        start: 94,
                        end: 100
                    },
                    {
                        show: true,
                        yAxisIndex: 0,
                        filterMode: 'empty',
                        width: 30,
                        height: '80%',
                        showDataShadow: false,
                        left: '93%'
                    }
                ],
                series: [
                    {
                        name: '总销售额',
                        type: 'bar',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + ' 元';
                            }
                        },
                        data: dataS
                    },
                    {
                        name: '客单价',
                        type: 'line',
                        yAxisIndex: 1,
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + '元 ';
                            }
                        },
                        data: dataC
                    }
                ]
            };
            // data为可视化数据
            resolve(option)
        }).catch(err => {
            resolve(option)
        })
    })
}

export default setshangPinTotalConfig