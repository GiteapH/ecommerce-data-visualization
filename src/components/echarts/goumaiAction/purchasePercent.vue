<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-04 16:19:38
 * @FilePath: \vue-web\src\components\echarts\goumaiAction\purchasePercent.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<!-- 近几年男女电商数据购物频率图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent" :title="title">
            <template #interactive>
                <el-select v-model="repurchase" @change="repurchaseChange">
                    <el-option label="查询已复购用户" value="1" />
                    <el-option label="查询非复购用户" value="0" />
                </el-select>
            </template>
            <div id="purchasePercent" :style="{ width: `${width}`, height: `${height}`}"></div>

        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setPurchasePercentConfig } from '@/utils/js/echartsConfig/goumaiAction/purchasePercentConfig'
import { getCurrentInstance, onMounted, ref } from 'vue';
import * as echarts from 'echarts'

const title = ref('国内复购用户的累计购物数量与复购率变化')
const { proxy } = getCurrentInstance()
const questionContent = "How old are you?";

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

const repurchase = ref('1')
let addressBind = null
onMounted(() => {
    chartDraw()
})

const chartDraw = (address, repuchase = 1) => {
    addressBind = address
    var chartDom = document.getElementById('purchasePercent');
    var myChart = echarts.init(chartDom);
    proxy.$showLoading(myChart)
    setPurchasePercentConfig(address, repuchase).then(reOption => {
        
        title.value = `${address == null ? '国内' : address}${repuchase==1?'复购':'非复购'}用户的累计购物数量与复购率变化`
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
