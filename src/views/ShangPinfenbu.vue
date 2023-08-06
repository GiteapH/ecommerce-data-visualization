<template>
    <Layout>
        <template #content>
            <Map height="500px" @change="mapChange" @complete="mapComplete" @loadMapData="loadMapData"></Map>
            <el-row>
                <el-col :span="16">
                    <ShangpinTotal height="400px" ref="ShangpinTotalRef"></ShangpinTotal>
                </el-col>
                <el-col :span="8">
                    <userBuy height="400px" ref="userBuyRef"> </userBuy>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <cityBang height="290px" ref="cityBangRef"></cityBang>
                </el-col>
                <el-col :span="10">
                    <jumploss height="580px" ref="jumpLossRef"></jumploss>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <h2>商品详细情况</h2>

            <el-descriptions class="margin-top" title="Details" :column="3" :size="size" border>
                <template #extra>
                    <el-input v-model="descriptions.id" filterable placeholder="请选择商品id" controls-position="right"
                        :disabled="disabled" @keyup.enter.native="skuChange" type="number">
                    </el-input>
                </template>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            商品id
                        </div>
                    </template>
                    <p v-loading="descriptionsLoading.saleCount">{{ descriptions.id }}</p>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            商品总销售额/销售次数
                        </div>
                    </template>
                    <p v-loading="descriptionsLoading.saleCount">{{ parseFloat(descriptions.sales).toFixed(2) }}元/{{
                        descriptions.saleCount }}次</p>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            商品客单价
                        </div>
                    </template>
                    <p v-loading="descriptionsLoading.saleCount">{{ parseFloat(descriptions.salePer).toFixed(2) }}元</p>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            商品偏向性别
                        </div>
                    </template>
                    <p v-loading="descriptionsLoading.sex">{{ descriptions.sex }}</p>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            商品偏向年龄
                        </div>
                    </template>
                    <p v-loading="descriptionsLoading.sex">{{ descriptions.age }}</p>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            商品单次浏览/多次浏览
                        </div>
                    </template>
                    <p v-loading="descriptionsLoading.moreVis">{{ descriptions.oneVis }}次/{{ descriptions.moreVis }}次</p>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            商品跳失率
                        </div>
                    </template>
                    <p v-loading="descriptionsLoading.moreVis">{{descriptions.oneVis + descriptions.moreVis==0?0:descriptions.oneVis / (descriptions.oneVis + descriptions.moreVis) * 100 }} %</p>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            流行城市/当地购买当前商品数
                        </div>
                    </template>
                    <p v-loading="descriptionsLoading.popularCount">{{ descriptions.popularCity }}/{{
                        descriptions.popularCount }}件</p>
                </el-descriptions-item>
            </el-descriptions>

            <el-row style="margin-top: 15px;">
                <el-col :span="10">
                    <jumploss height="580px" ref="skuJumpRef" jumpId="skuJump" :showLoss="false"></jumploss>
                </el-col>
                <el-col :span="14">
                    <cityBang height="290px" ref="skuBangRef" bangId="skuBang" cityId="skuCity"></cityBang>
                </el-col>
            </el-row>
        </template>

    </Layout>
</template>

<script setup>
// import * as echarts from 'echarts'
import { get } from '@/utils/axiosConfig/axios'
import Layout from '@/layout/Layout.vue'
import { defineComponent, onMounted, ref } from 'vue'
import ShangpinTotal from '@/components/echarts/shangpinFenbu/ShangpinTotal'
import userBuy from '@/components/echarts/shangpinFenbu/userBuyTongji.vue'
import cityBang from '@/components/echarts/shangpinFenbu/cityBang.vue'
import jumploss from '@/components/echarts/shangpinFenbu/jumploss.vue'
import Map from '@/components/echarts/Map'

const ShangpinTotalRef = ref()
const jumpLossRef = ref()
const userBuyRef = ref()
const cityBangRef = ref()
const skuBangRef = ref()
const skuJumpRef = ref()
const disabled = ref(true)
const descriptions = ref({
    id: 356317,
    sales: 0,
    saleCount: 0,
    salePer: 0,
    sex: '女',
    age: 0,
    oneVis: 0,
    moreVis: 0,
    jumpLoss: 0,
    popularCity: '',
    popularCount: 0
})
const descriptionsLoading = ref({
    saleCount: true,
    sex: true,
    moreVis: true,
    popularCount: true
})
let addressBind = ref(null), levelBind = ref(0)
const loadMapData = (tNameFormat, tName, allData, myChart, callback) => {
    // get({
    //     url: '/user-act-count/getTotalOrder',
    //     params: {
    //         address: tNameFormat
    //     }
    // }).then(data => {
    //     myChart.showLoading({
    //         text: '正在加载' + tName + '的数据中...',
    //         color: '#4cbbff',
    //         textColor: '#4cbbff',
    //         maskColor: 'rgba(0, 0, 0, 0.39)'
    //     });
    //     allData.push({
    //         name: tName,
    //         value: data[tNameFormat] == null ? 0 : data[tNameFormat]
    //     })
    callback(allData)
    // })
}

const skuChange = () => {
    getInfos(descriptions.value.id)
    skuBangRef.value.chartDraw(addressBind.value, skuJumpRef.value,descriptions.value.id)
}
const mapChange = (address, level) => {
    
    address = address == '全国' ? null : address
    addressBind.value = address
    levelBind.value = level
    userBuyRef.value.chartDraw(address)
    ShangpinTotalRef.value.chartDraw(address)
    cityBangRef.value.chartDraw(address, jumpLossRef.value)
    skuBangRef.value.chartDraw(addressBind.value, skuJumpRef.value,descriptions.value.id)
}

const getSkuPrice = (id) => {
    descriptionsLoading.value.saleCount = true
    get({
        url: '/getCtmUnitPrice',
        params: {
            sku: id
        }
    }).then(res => {
        descriptionsLoading.value.saleCount = false
        if (res.length == 0) {
            descriptions.value.sales = 0
            descriptions.value.salePer =0
            descriptions.value.saleCount = 0
            return 
        }
        descriptions.value.id = res[0].sku
        descriptions.value.sales = res[0].acSales
        descriptions.value.salePer = res[0].ctmUnitPrice
        descriptions.value.saleCount = res[0].sumNum
    })
}


const getJumpLossCount = (id) => {
    descriptionsLoading.value.moreVis = true
    get({
        url: '/sku-jump-loss/getSkuWatch',
        params: {
            sku: id
        }
    }).then(res => {
        descriptionsLoading.value.moreVis = false
        if (res.length != 0) {
            descriptions.value.oneVis = res[0].counts
            descriptions.value.moreVis = res[1].counts
        } else {
            descriptions.value.oneVis = 0
            descriptions.value.moreVis = 0
        }
    })
}

const getPopularCity = (id) => {
    if (levelBind != 3) {
        descriptionsLoading.value.popularCount = true
        get({
            url: '/getMaxAddressNum',
            params: {
                province: levelBind.value == 1 ? addressBind : null,
                city: levelBind.value == 2 ? addressBind : null,
                sku: id
            }
        }).then(res => {
            descriptionsLoading.value.popularCount = false
            if (res != null) {
                descriptions.value.popularCity = res[levelBind.value == 0 ? 'province' : (levelBind.value == 1 ? 'city' : 'county')]
                descriptions.value.popularCount = res.max
            } else {
                descriptions.value.popularCity = '暂无数据'
                descriptions.value.popularCount = 0
            }
        })
    }
}

const getSkuCount = (id) => {
    let map = {
        "less5Count": "小于5岁",
        "less10Count": "5-10岁",
        "less20Count": "10-20岁",
        "maleCount": "男",
        "femaleCount": "女"
    }

    descriptionsLoading.value.sex = true
    get({
        url: '/getAllCounts',
        params: {
            sku: id
        }
    }).then(res => {
        descriptionsLoading.value.sex = false
        if (res.length == 0) {
            descriptionsLoading.value.sex = false
            descriptions.value.age = '暂无数据'
            descriptions.value.sex = '暂无数据'
            disabled.value = false
            return
        }
        let sum = {
            "女": 0,
            "男": 0,
            "小于5岁": 0,
            "5-10岁": 0,
            "10-20岁": 0,
        }
        for (let info of res) {
            for (let key in info) {
                if (key != 'sku' && key != 'province' && key != 'city' && key != 'addressNumCount') {
                    sum[map[key]] += info[key]
                }
            }
        }

        descriptions.value.age = sum['10-20岁'] > sum['5-10岁'] ? (sum['10-20岁'] > sum['小于5岁'] ? '10-20岁' : '小于5岁') : (sum['5-10岁'] > sum['小于5岁'] ? '5-10岁' : '小于5岁')
        descriptions.value.sex = sum['女'] > sum['男'] ? '女' : '男'
        disabled.value = false
    }).catch(err => {
        disabled.value = false
        
    })
}


const getInfos = (id) => {
    disabled.value = true
    getJumpLossCount(id)
    getPopularCity(id)
    getSkuPrice(id)
    getSkuCount(id)
}
onMounted(() => {
    cityBangRef.value.chartDraw(null, jumpLossRef.value)
    skuBangRef.value.chartDraw(null, skuJumpRef.value,descriptions.value.id)
    getInfos(356317)

})
</script>

<style scoped>
/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
}

/deep/ input[type='number'] {
    -moz-appearance: textfield !important;
}</style>
