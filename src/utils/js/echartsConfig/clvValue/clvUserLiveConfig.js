import {
    get,
    post
} from '@/utils/axiosConfig/axios'
import {
    CENTERED_ALIGNMENT
} from 'element-plus/es/components/virtual-list/src/defaults'
import * as echarts from 'echarts'

export function setclvUserLiveConfig(params1, parmas2) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {
        var option = {
            title: {
                text: '客户生命周期漏斗图',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}'
            },
            series: [{
                name: '客户生命周期',
                type: 'funnel',
                left: '10%',
                top: 60,
                bottom: 60,
                width: '80%',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}'
                },
                emphasis: {
                    label: {
                        fontSize: 20
                    }
                },
                data: [{
                        value: 100,
                        name: '阶段1'
                    },
                    {
                        value: 80,
                        name: '阶段2'
                    },
                    {
                        value: 60,
                        name: '阶段3'
                    },
                    {
                        value: 40,
                        name: '阶段4'
                    },
                    {
                        value: 20,
                        name: '阶段5'
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

export default setclvUserLiveConfig