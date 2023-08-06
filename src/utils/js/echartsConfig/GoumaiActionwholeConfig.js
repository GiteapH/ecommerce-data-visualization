import {
    get,
    post
} from '@/utils/axiosConfig/axios'
export function setActionWholeConfig(address, repuchase) {
    // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
    let map = {
        age:'年龄',
        gender:'性别',
        actType:'rfm分群标签'
    }
    let map2 = {
        age:'age',
        gender:"gender",
        rfm:'actType'
    }
    return new Promise((resolve, reject) => {
        var option;
        let proc = []
        let datas = {
            rfm: [],
            gender: [],
            age: []
        }
        proc.push(
            new Promise((resolve1, reject1) => {
                get({
                    url: '/selectByAge',
                    params: {
                        address: address,
                        repurchase: repuchase
                    }
                }).then(data => {
                    datas.age = data
                    // data为可视化数据
                    resolve1(data)
                }).catch(err => {
                    reject1(err)
                })
            })
        )
        proc.push(
            new Promise((resolve1, reject1) => {
                get({
                    url: '/getRepurBygender',
                    params: {
                        address: address,
                        repurchase:repuchase
                    }
                }).then(data => {
                    // data为可视化数据
                    datas.gender = data
                    resolve1(data)
                }).catch(err => {
                    reject1(err)
                })
            })
        )

        proc.push(
            new Promise((resolve1, reject1) => {
                get({
                    url: '/selectByRFM',
                    params: {
                        address: address,
                        repurchase:repuchase
                    }
                }).then(data => {
                    datas.rfm = data
                    // data为可视化数据
                    resolve1(data)
                }).catch(err => {
                    reject1(err)
                })
            })
        )
        Promise.all(proc).then(values => {
            ['age', 'gender', 'rfm'].forEach(e => {
                datas[e] = datas[e].map(v => {
                    
                    return {
                        name: v[map2[e]],
                        value: v.counts,
                        tag:map[map2[e]]
                    }
                })
                
            })
            option = {
                series: ['age', 'gender', 'rfm'].map(function (data, idx) {
                    var top = idx * 33.3;
                    return {
                        type: 'pie',
                        radius: [20, 60],
                        top: top + '%',
                        height: '33.33%',
                        left: 'center',
                        width: 400,
                        itemStyle: {
                            borderColor: '#fff',
                            borderWidth: 1
                        },
                        label: {
                            alignTo: 'edge',
                            formatter:function(params){ 
                                
                                let str =  `{tag|${params.data.tag}:${params.data.name}}\n{value|人数:${params.data.value}人(${params.percent}%)}`
                                return str
                            },
                            minMargin: 15,
                            edgeDistance: 10,
                            lineHeight: 15,
                            rich: {
                                percent: {
                                    fontSize: 10,
                                    color: '#999'
                                },
                                value: {
                                    fontSize: 10,
                                    color: '#999'
                                },
                            }
                        },
                        data: datas[data]
                    };
                })
            };
            
            resolve(option)
        })
    })
}

export default setActionWholeConfig