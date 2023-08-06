<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-07-05 11:30:50
 * @FilePath: \vue-web\src\components\echarts\rfmValue\rfmtotal.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<!-- rfm三个指标总图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent" :title="title">
            <div id="gender" :style="{ width: `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setfrmTotalConfig } from '@/utils/js/echartsConfig/frmValue/rfmTotalConfig'
import { onMounted,getCurrentInstance,ref } from 'vue';
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

const title = ref('国内MR消费潜能-F消费频率')
onMounted(() => {
    chartDraw()
})


const chartDraw = (address,time=2)=>{
    var chartDom = document.getElementById('gender');
    var myChart = echarts.init(chartDom);
    proxy.$showLoading(myChart)
    setfrmTotalConfig(address,time).then(reOption => {
        title.value = `${address==null?'国内':address}MR消费潜能-F消费频率`
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