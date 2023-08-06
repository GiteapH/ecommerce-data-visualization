import {
    get,
    post
} from '@/utils/axiosConfig/axios'
import {
    CENTERED_ALIGNMENT
} from 'element-plus/es/components/virtual-list/src/defaults'

export function setuserBuyConfig(address) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    return new Promise((resolve, reject) => {

        get({
            url: "/getAllPrice",
            params: {
                address: address,
            }
        }).then(data => {
            // data为可视化数据

            data = data.map(e => {
                return {
                    name: e.sku,
                    value: e.totalCount,
                }

            })
            resolve({
                // 配置项

                title: {
                    text: '商品分布数量排行榜词云图',
                    left: 'center',
                    top: '10px',
                    textStyle: {
                        fontSize: 24,
                        fontWeight: 'bold'
                    }
                },
                series: [{
                    type: 'wordCloud',
                    shape: 'circle',
                    sizeRange: [20, 100],
                    rotationRange: [-90, 90],
                    rotationStep: 45,
                    gridSize: 8,
                    textStyle: {
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: 'bold',
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        },
                        color: function () {
                            return 'rgb(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ')';
                        }
                    },
                    data: data,
                    animation: true,
                    animationDuration: 2000,
                    animationEasing: 'quadraticInOut',
                    animationDelay: function (idx) {
                        return idx * 200;
                    }
                }],
                tooltip: {
                    show: true,
                    formatter: function (params) {
                        return '商品：' + params.name + '<br>数量：' + params.value;
                    }
                }


            })
        }).catch(err => {
            reject(err)
        })
    })
}

export default setuserBuyConfig