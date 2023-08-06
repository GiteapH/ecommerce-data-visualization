<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-07-09 20:12:18
 * @FilePath: \vue-web\src\components\echarts\goumaiAction\goumaiTimeArea.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<!-- 用户购买时间段图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent" :title="title">
            <template #interactive>
                <el-select v-model="repurchase" @change="repurchaseChange">
                    <el-option label="查询已复购用户" value="1" />
                    <el-option label="查询非复购用户" value="0" />
                </el-select>
            </template>
            <div id="time" :style="{ width: `${width}`, height: `${height}`}"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setTimeAreaConfig } from '@/utils/js/echartsConfig/goumaiAction/goumaiTimeAreaConfig';
import { onMounted,ref,getCurrentInstance } from 'vue';
import * as echarts from 'echarts'
const questionContent = "How old are you?";
const {proxy} = getCurrentInstance()

const repurchase = ref('1')
let addressBind = null
const props = defineProps({
    width: {
        type: Number,
        default: 'auto'
    },
    height: {
        type: Number,
        default: '150px'
    }
})

const title = ref('国内复购用户时刻交易分布')
onMounted(() => {
    chartDraw()
})
const chartDraw = (address,repurchase=1)=>{
    addressBind = address
    var chartDom = document.getElementById('time');
    var myChart = echarts.init(chartDom);
    proxy.$showLoading(myChart)
    setTimeAreaConfig(address,repurchase).then(reOption => {
        
        myChart.hideLoading()
        myChart.setOption(reOption);
    })
}

const repurchaseChange = (val)=>{
    chartDraw(addressBind,val)
}

defineExpose({
    chartDraw
})



</script>
