<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-07 17:59:08
 * @FilePath: \vue-web\src\components\echarts\rfmValue\rfmThree.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<!-- rfm三个指标图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent" :title="title">
            <template #interactive>
                <rfmSelect @change="rfmChange"/>
            </template>
            <div id="four" :style="{ width: `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setfrmThreeConfig } from '@/utils/js/echartsConfig/frmValue/frmThreeConfig'
import { onMounted,getCurrentInstance,ref } from 'vue';
import * as echarts from 'echarts'
import rfmSelect from '@/components/echarts/commen/rfmSelect.vue'
const questionContent = "How old are you?";
const {proxy} = getCurrentInstance()
const title = ref('国内FM消费能力-R消费流失')
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

let addressBind = null,rfmBind = '重要价值客户',timeBind = null
onMounted(() => {
    chartDraw()
})

const rfmChange = (val)=>{
    rfmBind = val
    chartDraw(addressBind,timeBind)
}
const chartDraw = (address, time=1)=>{
    var chartDom = document.getElementById('four');
    var myChart = echarts.init(chartDom);
    addressBind = address
    timeBind = time
    proxy.$showLoading(myChart)
    setfrmThreeConfig(address,rfmBind,time).then(reOption => {
        myChart.hideLoading()
        title.value = `${address==null?'国内':address}FM消费能力-R消费流失`
        myChart.setOption(reOption);
    })
}

defineExpose({
    chartDraw
})

</script>

<style scoped>

</style>