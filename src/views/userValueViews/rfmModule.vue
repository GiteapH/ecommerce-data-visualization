<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-13 13:58:03
 * @FilePath: \vue-web\src\views\userValueViews\rfmModule.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<template>
    <Layout>
        <template #content>
            <el-form :inline="true">
                <el-form-item label="基于的rfm模型时间">
                    <el-select @change="timeChange" v-model="time">
                        <el-option label="基于全部日期的模型" value="1">
                        </el-option>
                        <el-option label="基于最近一月的模型" value="2">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="近月指标变化查询">
                    <el-badge is-dot>
                        <score-change></score-change>
                    </el-badge>
                </el-form-item>
            </el-form>
            
            <el-row>
                <el-col :span="8">
                    <Map height="640px" @change="mapChange" @complete="mapComplete" @loadMapData="loadMapData"></Map>
                </el-col>
                <el-col :span="8">
                    <frmThree height="600px" ref="rfmThreeRef"></frmThree>
                </el-col>
                <el-col :span="8">
                    <rfmGroup height="215px" ref="groupRef"></rfmGroup>
                    <frmcompare height="215px" ref="compareRef"></frmcompare>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <frmTotal height="500px" ref="rfmTotalRef"></frmTotal>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <rfmLeida height="500px" ref="rfmLeidaRef"></rfmLeida>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                        <rfmSlider height="500px" ref="rfmSliderRef"></rfmSlider>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <rfmtable height="500px" ref="rfmTableRef"></rfmtable>
                </el-col>
            </el-row>
        </template>
    </Layout>
</template>

<script setup>
import Layout from '@/layout/Layout.vue'
import { get } from '@/utils/axiosConfig/axios'
import { ref,onMounted } from 'vue'
import frmThree from '@/components/echarts/rfmValue/rfmThree.vue'
import frmTotal from '@/components/echarts/rfmValue/rfmtotal.vue'
import rfmGroup from '@/components/echarts/rfmValue/rfmGroup.vue'
import rfmLeida from '@/components/echarts/rfmValue/rfmLeida.vue'
import frmcompare from '@/components/echarts/rfmValue/rfmCompare.vue'
import rfmtable from '@/components/echarts/rfmValue/rfmtable.vue'
let addressBind,timeBind
const rfmTotalRef = ref()
const groupRef = ref()
const rfmThreeRef = ref()
const compareRef = ref()
const rfmLeidaRef = ref()
const timeDisabled = ref(true)
const rfmSliderRef = ref()
const time = ref('1')
const timeChange = (val)=>{
    timeBind = val
    groupRef.value.chartDraw(addressBind,val)
    rfmThreeRef.value.chartDraw(addressBind,val)
    rfmTotalRef.value.chartDraw(addressBind,val)
    compareRef.value.chartDraw(addressBind,val)
    rfmLeidaRef.value.chartDraw(addressBind,val)
    rfmSliderRef.value.chartDraw(addressBind,val)
}

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
    addressBind = address
    
    groupRef.value.chartDraw(address,timeBind)
    rfmThreeRef.value.chartDraw(address,timeBind)
    rfmTotalRef.value.chartDraw(address,timeBind)
    compareRef.value.chartDraw(address,timeBind)
    rfmLeidaRef.value.chartDraw(address,timeBind)
    rfmSliderRef.value.chartDraw(address,timeBind)
}

onMounted(()=>{
    
})
</script>

<style scoped></style>
