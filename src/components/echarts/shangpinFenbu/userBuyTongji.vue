<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-30 19:52:50
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-07-04 20:22:25
 * @FilePath: \vue-web\src\components\echarts\shangpinFenbu\userBuyTongji.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<!-- 商品下单浏览购买地区排行图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent" :title="title">
            <div id="orderby" :style="{ width: `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setuserBuyConfig } from '@/utils/js/echartsConfig/shangpinFenbu/userBuyTongji'
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts'
let option = {}

const questionContent = ref("");


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
const title = ref("国内商品销售量排行榜")


onMounted(() => {
    chartDraw()


})
const chartDraw = (address) => {
    var chartDom = document.getElementById('orderby');
    var myChart = echarts.init(chartDom);
    myChart.showLoading({
        text: '正在加载...',
        color: '#4cbbff',
        textColor: '#4cbbff',
        maskColor: 'rgba(0, 0, 0, 0.39)'
    })
    setuserBuyConfig(address).then(reOption => {
        myChart.hideLoading()
        myChart.setOption(reOption);
    });
    window.addEventListener("resize", () => {
        myChart.resize();
    });

}

defineExpose(
    {
        chartDraw
    }
)

</script>

<style scoped>

</style>