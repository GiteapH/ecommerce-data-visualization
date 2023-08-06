<template>
    <Layout>
        <template #content>
            <div>
                <h2 style="margin-bottom: 30px;">用户全体购买情况</h2>
                <el-row>
                    <el-col :span="8">
                        <Map height="720px" @change="mapChange" @complete="mapComplete" @loadMapData="loadMapData"></Map>
                    </el-col>
                    <el-col :span="8">
                        <div>
                            <genderPies height="300px" ref="genderPiesRef"></genderPies>
                        </div>
                        <div>
                            <ageRing height="300px" ref="ageRingRef"></ageRing>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <loudou height="400px" ref="vulnerabilityRef"></loudou>
                        <Area height="200px" ref="areaRef"></Area>
                    </el-col>
                </el-row>
            </div>
            <el-row>
                <el-col :span="1">
                    <p class="m-2" style="text-align: center;line-height: 30px;">时间段：</p>
                </el-col>
                <el-col :span="5">
                    <el-select v-model="time" class="m-2" placeholder="请选择时间段" @change="timeChange"
                        :disabled="timeDisabled">
                        <el-option v-for="item in times" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <div>
                        <price height="300px" ref="priceRef"></price>
                    </div>
                    <div>
                        <Time height="300px" ref="timeRef"></Time>
                    </div>
                </el-col>
                <el-col :span="16">
                    <priceLine height="300px" ref="priceLineRef"></priceLine>
                    <timeLine height="300px" ref="timeLineRef"></timeLine>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div>
                        <timePriceBubble height="300px" ref="timePriceBubbleRef"></timePriceBubble>
                    </div>
                </el-col>
            </el-row>
        </template>
    </Layout>
</template>

<script setup>
// import * as echarts from 'echarts'
import Layout from '@/layout/Layout.vue'
import { get } from '@/utils/axiosConfig/axios'
import { onMounted, ref } from 'vue'
import Map from '@/components/echarts/Map'
import genderPies from '@/components/echarts/purchaseSituation/genderPies'
import ageRing from '@/components/echarts/purchaseSituation/ageRing'
import loudou from '@/components/echarts/purchaseSituation/loudou.vue'
import timeLine from '@/components/echarts/purchaseSituation/timeLine.vue'
import priceLine from '@/components/echarts/purchaseSituation/priceLine.vue'
import timePriceBubble from '@/components/echarts/purchaseSituation/timePriceBubble.vue'
import Area from '@/components/echarts/purchaseSituation/Area'
import price from '@/components/echarts/purchaseSituation/price'
import Time from '@/components/echarts/purchaseSituation/time'

const timeDisabled = ref(true)
const times = [{
    label: '完整时间',
    value: '1'
}, {
    label: '近一个月',
    value: '2'
}, {
    label: '近两周',
    value: '3'
}, {
    label: '近一周',
    value: '4'
}]
const time = ref('1')
const genderPiesRef = ref()
const ageRingRef = ref()
const priceRef = ref()
const timeRef = ref()
const vulnerabilityRef = ref()
const areaRef = ref()
const timeLineRef = ref()
const priceLineRef = ref()
const addressBind = ref(null)
const timePriceBubbleRef = ref()
// 地图加载完成
const mapComplete = () => {
    timeDisabled.value = false
}
// 加载地图数据，alldata填充数据，callback一定要返回填充后的alldata，mychart为charts实例
const loadMapData = (tNameFormat, tName, allData, myChart, callback) => {
    get({
        url: '/user-act-count/getTotalOrder',
        params: {
            address: tNameFormat
        }
    }).then(data => {
        myChart.showLoading({
            text: '正在加载' + tName + '的数据中...',
            color: '#4cbbff',
            textColor: '#4cbbff',
            maskColor: 'rgba(0, 0, 0, 0.39)'
        });
        allData.push({
            name: tName,
            value: data[tNameFormat] == null ? 0 : data[tNameFormat]
        })
        callback(allData)
    })
}

const mapChange = (address, level) => {
    timeDisabled.value = true
    address = address == '全国' ? null : address

    addressBind.value = address
    genderPiesRef.value.chartDraw(address)
    ageRingRef.value.chartDraw(address)
    priceRef.value.chartDraw(address)
    timeRef.value.chartDraw(address)
    vulnerabilityRef.value.chartDraw(address)
    priceLineRef.value.chartDraw(address)
    timeLineRef.value.chartDraw(address)

    
    if (level <= 2)
        areaRef.value.chartDraw(address, level == 1 ? address : null, level == 2 ? address : null, level)
}

const timeChange = (val) => {
    priceRef.value.chartDraw(addressBind.value, val)
    timeRef.value.chartDraw(addressBind.value, val)
    priceLineRef.value.chartDraw(addressBind.value, val)
    timeLineRef.value.chartDraw(addressBind.value, val)
    timePriceBubbleRef.value.chartDraw(addressBind.value, val)
}


</script>

<style scoped>
.dot {
    border-radius: 50%;
}

.m-2 {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
