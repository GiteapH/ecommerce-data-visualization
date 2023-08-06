<template>
    <div>
        <echartDecoration :title="title">
            <template #interactive>
                <el-button @click="swag" :disabled="disabled">
                    切换视图
                </el-button>
            </template>
            <div id="map" :style="{ width: `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '@/components/utils/echartDecoration.vue';
import { get } from '@/utils/axiosConfig/axios'
import { getCurrentInstance, onMounted, ref } from 'vue';
import * as echarts from 'echarts'
const preCode = [['100000', '全国']]
const props = defineProps({
    width: {
        type: Number,
        default: "auto"
    },
    height: {
        type: Number,
        default: '400px'
    }
})

const disabled = ref(true)
const emit = defineEmits(['change', 'complete', 'loadMapData'])
const title = ref('全国')
const ctx = getCurrentInstance()
let myChart
let currentOption,barOption,option
var alladcode

onMounted(() => {
    
    myChart = echarts.init(document.getElementById("map"));
    //各省份的地图json文件
    loadMap('100000', '全国', myChart) //初始化全国地图
    var timeFn = null;
    //单击切换到省级地图，当mapCode有值,说明可以切换到下级地图
    myChart.on('click', function (params) {
        clearTimeout(timeFn);
        //由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行
        timeFn = setTimeout(function () {
            var name = params.name; //地区name
            let clickRegionCode = alladcode.filter(areaJson => {
                return areaJson.properties.name === params.name
            })[0].properties.adcode;
            loadMap(clickRegionCode, name, myChart).then((ret) => {
                if (ret == true) {
                    preCode.push([clickRegionCode, params.name])
                };
            })
            emit('change', name.replaceAll(/[省|市|自治区|壮族自治区|回族自治区|维吾尔族自治区]/g, ""), preCode.length)
            return
        }, 250);
    });

    // 绑定双击事件，返回上级
    myChart.on('dblclick', function (params) {
        //当双击事件发生时，清除单击事件，仅响应双击事件
        clearTimeout(timeFn);
        if (preCode.length != 1) {
            preCode.pop()
            let codeAdd = preCode[preCode.length - 1]
            loadMap(codeAdd[0], codeAdd[1], myChart);
            emit('change', codeAdd[1].replaceAll(/[省|市|自治区|壮族自治区|回族自治区|维吾尔族自治区]/g, ""), preCode.length - 1)
        } else {
            return
        }
    });

    window.addEventListener("resize", () => {
        myChart.resize();
    });
})

const swag = ()=>{
    currentOption = currentOption === option ? barOption : option;
    myChart.setOption(currentOption, true);
}
/**
获取对应的json地图数据，然后向echarts注册该区域的地图，最后加载地图信息
@params {String} mapCode:json数据的地址
@params {String} name: 地图名称
*/
const loadMap = (mapCode, name, myChart) => {
    name = name + '的购买情况统计'
    return new Promise((resolve) => {
        if (preCode.length <= 2) {
            // $(".container").show()
            // $("#loadAdd").text("正在获取 " + name + " 地图数据")
            myChart.showLoading({
                text: '正在加载获取地形数据中...',
                color: '#4cbbff',
                textColor: '#4cbbff',
                maskColor: 'rgba(0, 0, 0, 0.39)'
            });
            get({
                url: '/getMapData?code=' + mapCode
            }).then(function (data) {
                alladcode = data.features
                title.value = name
                var allData = []
                // 地图呈现数据
                if (data) {
                    let proc = []
                    for (var i = 0; i < data.features.length; i++) {
                        let tName = data.features[i].properties.name
                        if (tName != "") {
                            let tNameFormat = tName.replaceAll(/[省|市|自治区|壮族自治区|回族自治区|维吾尔族自治区]/g, "")
                            proc.push(new Promise((resolve) => {
                                emit('loadMapData', tNameFormat, tName, allData, myChart, (allData) => {
                                    resolve(allData)
                                })
                                // $("#loadAdd").text('加载' + tName + "中..")
                            }))
                        }
                    }
                    disabled.value = true
                    Promise.all(proc).then((res) => {
                        // $(".container").hide()
                        let Data = res[0]
                        let max = 0
                        echarts.registerMap(name, data);
                        for (let data in Data) {
                            max = Math.max(max, Data[data].value)
                        }
                        barOption = {
                            xAxis: {
                                type: 'value'
                            },
                            yAxis: {
                                type: 'category',
                                axisLabel: {
                                    rotate: 30
                                },
                                data: Data.map(function (item) {
                                    return item.name;
                                })
                            },
                            animationDurationUpdate: 1000,
                            series: {
                                type: 'bar',
                                id: 'population',
                                data: Data.map(function (item) {
                                    return item.value;
                                }),
                                universalTransition: true
                            }
                        };
                        option = {
                            layoutCenter: ['50%', '70%'],
                            layoutSize: 280, //位置
                            tooltip: {
                                show: true,
                                formatter: function (params) {
                                    if (params.data) return params.name + ':' +
                                        params.data['value']
                                },
                            },
                            visualMap: {
                                type: 'continuous',
                                text: ['', '样本量'],
                                showLabel: true,
                                left: '10',
                                top: '250',
                                min: 0,
                                max: max,
                                inRange: {
                                    color: ['#FFEC8B', '#98FB98'
                                    ]
                                },
                                splitNumber: 0,
                                bottom: 100,
                                textStyle: {
                                    color: "#7986ff"
                                },
                                calculable: true
                            },
                            series: [{
                                name: 'MAP',
                                type: 'map',
                                textStyle: {
                                    fontFamily: '微软雅黑',
                                    fontSize: 12,
                                    fontStyle: 'normal',
                                    fontWeight: 'normal',
                                    color: '#fff'

                                },
                                map: name,
                                selectedMode: false, //是否允许选中多个区域
                                label: {
                                    normal: {
                                        show: true
                                    },
                                    emphasis: {
                                        show: true
                                    }
                                },
                                zoom: 2, //当前视角的缩放比例
                                roam: true, //是否开启平游或缩放
                                scaleLimit: { //滚轮缩放的极限控制
                                    min: 2,
                                    max: 80
                                },
                                animationDurationUpdate: 1000,
                                universalTransition: true,
                                data: Data
                            }],
                        };

                        myChart.hideLoading()
                        disabled.value = false
                        swag()
                        emit('complete')
                    })
                    resolve(true)
                }
            }).catch((err) => {

                resolve(false)
            })
        }
    })
}
</script>

<style scoped>
#map {
    width: 600px;
    height: 600px;
}
</style>