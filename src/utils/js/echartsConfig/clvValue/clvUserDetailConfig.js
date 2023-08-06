import {
    get,
    post
} from '@/utils/axiosConfig/axios'
import {
    CENTERED_ALIGNMENT
} from 'element-plus/es/components/virtual-list/src/defaults'
import * as echarts from 'echarts'

export function setclvUserDetailConfig(params1, parmas2) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        var option = {
            title: {
                text: '客户细分雷达图',
                left: 'center'
            },
            tooltip: {},
            radar: {
                shape: 'polygon',
                indicator: [{
                        name: '维度1',
                        max: 100
                    },
                    {
                        name: '维度2',
                        max: 100
                    },
                    {
                        name: '维度3',
                        max: 100
                    },
                    {
                        name: '维度4',
                        max: 100
                    },
                    {
                        name: '维度5',
                        max: 100
                    }
                ]
            },
            series: [{
                name: '客户细分',
                type: 'radar',
                data: [{
                        value: [80, 50, 70, 90, 60],
                        name: '客户群1'
                    },
                    {
                        value: [60, 70, 80, 40, 50],
                        name: '客户群2'
                    }
                ]
            }]
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

export default setclvUserDetailConfig