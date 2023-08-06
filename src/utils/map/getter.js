// 地区个数
//地图模块
export var tempAddress = "全国"
var preCode = [
    ['100000', '全国']
]
export function getter() {
    var myChart = echarts.init(document.querySelector(".map .chart"));
    //各省份的地图json文件
    var alladcode
    loadMap('100000', '全国'); //初始化全国地图
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
            loadMap(clickRegionCode, name).then((ret) => {
                if (ret == true) {
                    preCode.push([clickRegionCode, params.name])
                };
            })
            tempAddress = name.replaceAll(/[省|市|自治区|壮族自治区|回族自治区|维吾尔族自治区]/g, "").substring(0, 2)
            return
        }, 250);
    });


    // 绑定双击事件，返回全国地图
    myChart.on('dblclick', function (params) {
        //当双击事件发生时，清除单击事件，仅响应双击事件
        clearTimeout(timeFn);
        if (preCode.length != 1) {
            preCode.pop()
            let codeAdd = preCode[preCode.length - 1]
            loadMap(codeAdd[0], codeAdd[1]);
            tempAddress = codeAdd[1].replaceAll(/[省|市|自治区|壮族自治区|回族自治区|维吾尔族自治区]/g, "").substring(0, 2)

        } else {
            return
        }
    });

    /**
    获取对应的json地图数据，然后向echarts注册该区域的地图，最后加载地图信息
    @params {String} mapCode:json数据的地址
    @params {String} name: 地图名称
    */
    function loadMap(mapCode, name) {
        return new Promise((resolve) => {
            if (preCode.length <= 2) {
                $(".container").show()
                $("#loadAdd").text("正在获取 " + name + " 地图数据")
                $.get('http://' + ip + '/getMap?code=' + mapCode, function (data) {
                    data = JSON.parse(data)
                    alladcode = data.features
                    var allData = []

                    if (data) {
                        let proc = []
                        for (var i = 0; i < data.features.length; i++) {
                            let tName = data.features[i].properties.name
                            if (tName != "") {
                                proc.push(new Promise((resolve) => {
                                    getAddress(tName.replaceAll(/[省|市|自治区|壮族自治区|回族自治区|维吾尔族自治区]/g, ""))
                                        .then((ret) => {
                                            $("#loadAdd").text('加载' + tName + "中..")
                                            allData.push({
                                                name: tName,
                                                value: ret[0] == null ? 0 : ret[
                                                    0].COUNT
                                            })
                                            resolve(allData)
                                        })
                                }))
                            }
                        }
                        Promise.all(proc).then((res) => {
                            $(".container").hide()
                            let Data = res[0]
                            let max = 0
                            echarts.registerMap(name, data);
                            for (let data in Data) {
                                max = Math.max(max, Data[data].value)
                            }

                            var option = {
                                layoutCenter: ['50%', '70%'],
                                layoutSize: 280, //位置
                                title: {
                                    text: name,
                                    left: 'center',

                                    textStyle: {
                                        color: "white",
                                        fontSize: 30,
                                        fontFamily: 'sans-serif'
                                    }
                                },
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
                                    min: 0,
                                    max: max,
                                    inRange: {
                                        color: ['rgba(135,206,235,0.8)', 'rgba(72,61,139,0.8)'
                                        ]
                                    },
                                    splitNumber: 0,
                                    bottom: 100,
                                    textStyle: {
                                        color: "#7986ff"
                                    }
                                },
                                series: [{
                                    name: 'MAP',
                                    type: 'map',
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
                                        min: -1,
                                        max: 80
                                    },

                                    data: Data
                                }]
                            };
                            myChart.setOption(option, true);
                        })
                        resolve(true)
                    }
                }).fail(() => {
                    resolve(false)
                })
            }
        })
    }
    // 监听浏览器缩放，图表对象调用缩放resize函数
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}
