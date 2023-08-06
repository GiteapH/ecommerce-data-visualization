<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-04 18:46:48
 * @FilePath: \vue-web\src\views\GouMaiAction.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<template>
    <Layout>
        <template #content>
            <el-row>
                <el-col :span="8">
                    <Map height="640px" @change="mapChange" @complete="mapComplete" @loadMapData="loadMapData"></Map>
                </el-col>
                <el-col :span="8">
                    <Whole height="500px" ref = "wholeRef"></Whole>
                </el-col>
                <el-col :span="8">
                    <usrback height="300px" ref="userBackRef"></usrback>
                </el-col>

            </el-row>
            <el-row justify="space-between">
                <el-col :span="24">
                    <purchasePercent height="500px" ref="purchasePercentRef"></purchasePercent>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <timeSpared height="600px" ref="timeSparedRef"></timeSpared>
                </el-col>
                <!-- <el-col :span="8">
                    <buyWhereArea style="margin-left:200px;margin-top:200px; width: 700px; height: 500px;"></buyWhereArea>
                </el-col> -->
            </el-row>
        </template>
    </Layout>
</template>
<script setup>
import { get } from '@/utils/axiosConfig/axios'
import Layout from '@/layout/Layout.vue'
import { ref } from 'vue'
import Whole from '@/components/echarts/goumaiAction/GoumaiActionwhole.vue'
import timeSpared from '@/components/echarts/goumaiAction/goumaiTimeArea.vue'
import usrback from '@/components/echarts/goumaiAction/userBack.vue'
import purchasePercent from '@/components/echarts/goumaiAction/purchasePercent.vue'
const wholeRef = ref()
const userBackRef = ref()
const timeDisabled = ref(true)
const timeSparedRef = ref()
const purchasePercentRef = ref()
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

const mapChange = (address,level)=>{
    wholeRef.value.chartDraw(address)
    userBackRef.value.chartDraw(address)
    timeSparedRef.value.chartDraw(address)
    purchasePercentRef.value.chartDraw(address)
}

</script>

<style scoped></style>
