<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-16 12:40:59
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-16 15:28:36
 * @FilePath: \vue-web\src\components\echarts\picGroup\diffChange.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->

<template>
    <div>
        <echartDecoration :question-content="questionContent" :title="title">
            <div id="diff"  :style="{ width: `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setDiffChangeConfig } from '@/utils/js/echartsConfig/picGroup/diffChangeConfig'
import { onMounted, ref,getCurrentInstance } from 'vue';
import * as echarts from 'echarts'

const questionContent = ref("How old are you now?");
const { proxy } = getCurrentInstance()
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
    chartDraw(null)
})

const title = ref(`全国交易间隔变化曲线`)

const chartDraw = (address,model=1,tag='重要价值客户'  ) => {
    var chartDom = document.getElementById('diff');
    var myChart = echarts.init(chartDom);
    proxy.$showLoading(myChart)
    setDiffChangeConfig(address,model,tag).then(reOption => {
        title.value = `${address==null?'国内':address}交易间隔变化曲线`
        myChart.hideLoading()
        myChart.setOption(reOption);
    })
    window.addEventListener("resize", () => {
        myChart.resize()
    });
}


defineExpose({
    chartDraw
})



</script>

<style scoped></style>