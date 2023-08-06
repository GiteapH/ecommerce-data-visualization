<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-30 19:52:50
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-07-09 13:20:00
 * @FilePath: \vue-web\src\components\echarts\shangpinFenbu\cityBang.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<!-- 商品下单浏览购买地区排行图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent" :title="title">
            <div :id="bangId" :style="{ width: `${width}`, height: `${height}` }"></div>
            <div :id="cityId" :style="{ width: `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setcityBang } from '@/utils/js/echartsConfig/shangpinFenbu/cityBang'
import { setcityRate } from '@/utils/js/echartsConfig/shangpinFenbu/cityRate'
import { onMounted, ref, getCurrentInstance } from 'vue';
import * as echarts from 'echarts'


const questionContent = ref("");


const props = defineProps({
    width: {
        type: Number,
        default: 'auto'
    },
    height: {
        type: Number,
        default: 300
    },
    bangId:{
        type:String,
        default:'rate'
    },
    cityId:{
        type:String,
        default:'city'
    }
})

const title = ref("商品浏览次数的中国城市")
const { proxy } = getCurrentInstance()


const chartDraw = (address,jumpLossRef,sku) => {
    var chartDom = document.getElementById(props.bangId);
    var chartDom2 = document.getElementById(props.cityId)
    var myChart1 = echarts.init(chartDom);
    var myChart2 = echarts.init(chartDom2);
    myChart1.group = 'group1'
    myChart2.group = 'group2'
    proxy.$showLoading(myChart1)
    proxy.$showLoading(myChart2)
    setcityRate(address,sku).then(({ option, xData, data,addressData }) => {
        myChart1.hideLoading()
        myChart1.setOption(option);
        setcityBang(xData, addressData).then(reOption => {
            myChart2.hideLoading()
            myChart2.setOption(reOption);
        })
        
        jumpLossRef.chartDraw(data)
    })
    window.addEventListener("resize", () => {
        myChart1.resize();
        myChart2.resize();
    });
    echarts.connect([myChart1, myChart2])
}

defineExpose({
    chartDraw
})



</script>

<style scoped></style>