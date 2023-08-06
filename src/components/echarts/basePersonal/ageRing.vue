<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-28 14:29:50
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-07-05 18:55:38
 * @FilePath: \vue-web\src\components\echarts\basePersonal\ageRing.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<!-- 年龄分布环形图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent" :title="title">
            <template #bottom-interactive>
                <el-row>
                    <el-col :span="5">
                        <p style="line-height: 30px;text-align: center;font-weight: 500;font-size: 14px;">
                            交易时间</p>
                    </el-col>
                    <el-col :span="12">
                        <div style="width: 100%;">
                            <el-select @change="timeChange" v-model="time">
                                <el-option label="完整日期" value="1">
                                </el-option>
                                <el-option label="近一月交易" value="2">
                                </el-option>
                                <el-option label="两周内" value="3">
                                </el-option>
                                <el-option label="一周内" value="4">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
            </template>
            <div id="age"  :style="{ width: `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setAgeRingConfig } from '@/utils/js/echartsConfig/basePersonal/ageRingConfig'
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts'
var myChart = null,dataE
let idBind = null
const questionContent = ref("How old are you now?");

const props = defineProps({
    width: {
        type: Number,
        default: 'auto'
    },
    height: {
        type: Number,
        default: 300
    }
})

onMounted(() => {
    chartDraw()
})

const title = ref(`全国购买人群年龄性别分布`)
const time = ref('1')
const chartDraw = (id=1) => {
    var chartDom = document.getElementById('age');
    myChart = echarts.init(chartDom);
    myChart.showLoading({
        text: '正在加载...',
        color: '#4cbbff',
        textColor: '#4cbbff',
        maskColor: 'rgba(0, 0, 0, 0.39)'
    })
    idBind = id
    setAgeRingConfig(time.value,id).then(({option,data}) => {
        dataE = data
        title.value = `用户活跃时间与价格喜好`
        myChart.hideLoading()
        myChart.setOption(option);
    })
    window.addEventListener("resize", () => {
        myChart.resize()
    });
}
const timeChange = ()=>{
    chartDraw(idBind)
}

const getEcharts = ()=>{
    return [myChart,dataE]
}

defineExpose({
    chartDraw,
    getEcharts
})



</script>

<style scoped></style>