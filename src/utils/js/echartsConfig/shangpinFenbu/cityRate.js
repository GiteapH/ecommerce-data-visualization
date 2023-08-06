import {
    get,
    post
} from '@/utils/axiosConfig/axios'

export function setcityRate(address,sku) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        get({
            url: "/getAllCounts",
            params: {
                address: address,
                sku:sku
            }
        }).then(data => {
            // data为可视化数据
            let xData = [], addressData = []
            addressData = data.map((e, i) => {
                xData.push(e[address==null?'province':'city'])
                return {
                    name: e[address==null?'province':'city'],
                    value: e.addressNumCount
                }
            })
            resolve({
                option: {
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        right: 10,
                        top: 20,
                        bottom: 20,
                        data: xData
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {
                                show: true
                            },
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    series: [{
                        name: '商品下单浏览排行榜',
                        type: 'pie',
                        radius: [50, 120],
                        center: ['50%', '50%'],
                        itemStyle: {
                            borderRadius: 8
                        },
                        data: addressData
                    }]


                },
                xData: xData,
                data: data,
                addressData: addressData
            })
        }).catch(err => {
            reject(err)
        })
    })
}

export default setcityRate