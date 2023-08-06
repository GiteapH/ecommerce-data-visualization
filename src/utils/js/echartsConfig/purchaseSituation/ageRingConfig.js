import { get} from '@/utils/axiosConfig/axios'


export function setAgeRingConfig(address) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        get({
            url: "/getcountbycondition",
            params: {
                address: address
            }
        }).then(data => {
            // data为可视化数据
            resolve(
                {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        top: '',
                        left: '-5'
                    },
                    series: [
                        {
                            name: '年龄人群分布',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: 10,
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                { value: data['less10'], name: '10岁以下的年龄占比' },
                                { value: data['less15'], name: '10岁到15岁群体占比' },
                                { value: data['less20'], name: '15岁到25岁群体占比' }
                            ]
                        }
                    ]
                }
            )
        }).catch(err=>{
            reject(err)
        })
    })
}

export default setAgeRingConfig