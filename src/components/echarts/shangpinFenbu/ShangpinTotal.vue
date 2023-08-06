<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-07-04 12:02:58
 * @FilePath: \vue-web\src\components\echarts\shangpinFenbu\ShangpinTotal.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<!-- 商品总销售近几年状态-->
<template>
    <div>
        <echartDecoration :title="title">
            <div id="shangpinTotal" :style="{ width: `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setshangPinTotalConfig } from '@/utils/js/echartsConfig/ShangpintotalConfig'
import { onMounted,getCurrentInstance,ref } from 'vue';
import * as echarts from 'echarts'

const questionContent = "How old are you?";
const {proxy} = getCurrentInstance()
const title = ref('全国商品客单价与总销售额')
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

const chartDraw = (address)=>{
    var chartDom = document.getElementById('shangpinTotal');
    var myChart = echarts.init(chartDom);
    proxy.$showLoading(myChart)
    setshangPinTotalConfig(address).then(reOption => {
        title.value = `${address==null?'全国':address}商品客单价与总销售额`
        myChart.hideLoading()
        myChart.setOption(reOption);
    })
}

onMounted(() => {
    chartDraw()
})
defineExpose({
    chartDraw
})


</script>

<style scoped>

</style>