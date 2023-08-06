import {
    get,
    post
} from '@/utils/axiosConfig/axios'

export function setgetPriceConfig(address,time) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        get({
            url: "/rule-user-tag/getPrice",
            params: {
                address: address,
                time:time
            }
        }).then(data=> {
        //     // data为可视化数据
         
        resolve(
            {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    data: data.map(item=>item.activePrice)
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        name: '价格区间',
                        type: 'pie',
                        radius: [20, 80],
                        center: ['50%', '50%'],
                        roseType: 'radius',
                        itemStyle: {
                            borderRadius: 5
                        },
                        label: {
                            show: false
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        data: data.map((e)=>{
                            let obj = {
                                value:e.counts,
                                name:e.activePrice
                            }
                            return obj
                        })
                    }
                ]
            }
        )
    }).catch(err=>{
        reject(err)
    })
})
}

export default setgetPriceConfig