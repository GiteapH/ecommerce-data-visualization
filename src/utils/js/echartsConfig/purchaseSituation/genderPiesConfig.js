import { get, post } from '@/utils/axiosConfig/axios'

export function setGenderPiesConfig(address) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        get({
            url: "/getcountByAddress",
            params: {
                address: address
            }
        }).then(data => {
            // data为可视化数据
            resolve(
                {
                    option: {
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left'
                        },
                        series: [
                            {
                                name: '用户性别',
                                type: 'pie',
                                radius: '50%',
                                data: [
                                    { value: data.female, name: '女' },
                                    { value: data.male, name: '男' },
                                ],
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    },
                    data: data
                }
            )
        }).catch(err => {
            reject(err)
        })
    })
}

export default setGenderPiesConfig