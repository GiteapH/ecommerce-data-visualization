<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-07 11:28:32
 * @FilePath: \vue-web\src\components\echarts\rfmValue\rfmGroup.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<!-- rfm用户群体种类 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent" :title="title">
            <div id="group" :style="{ width: `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setGroupConfig } from '@/utils/js/echartsConfig/frmValue/frmGroupConfig'
import { onMounted,ref,getCurrentInstance } from 'vue';
import * as echarts from 'echarts'


const questionContent = "How old are you?";
const {proxy} = getCurrentInstance()

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
const title = ref('国内RFM用户所属群体种类')

onMounted(() => {
    chartDraw()
})

const chartDraw = (address,time=1)=>{
    var chartDom = document.getElementById('group');
    var myChart = echarts.init(chartDom);
    proxy.$showLoading(myChart)
    setGroupConfig(address,time).then(reOption => {
        title.value = `${address==null?'国内':address}RFM用户所属群体种类`
        myChart.hideLoading()
        myChart.setOption(reOption);
    })
}

defineExpose({
    chartDraw
})

</script>

<style scoped>

</style>