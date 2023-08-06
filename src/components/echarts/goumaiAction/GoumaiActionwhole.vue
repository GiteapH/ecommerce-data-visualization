<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-03 20:17:31
 * @FilePath: \vue-web\src\components\echarts\goumaiAction\GoumaiActionwhole.vue
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
            <div id="whole"></div>

        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setActionWholeConfig } from '@/utils/js/echartsConfig/GoumaiActionwholeConfig'
import { getCurrentInstance, onMounted, ref } from 'vue';
import * as echarts from 'echarts'
import { add } from 'lodash';
const title = ref('国内复购用户中的年龄/性别/rfm分群类别分布')
const { proxy } = getCurrentInstance()
const questionContent = "How old are you?";

const props = defineProps({
    width: {
        type: Number,
        default: 600
    },
    height: {
        type: Number,
        default: 600
    }
})

const repurchase = ref('1')
let addressBind = null
onMounted(() => {
    chartDraw()
})

const chartDraw = (address, repuchase = 1) => {
    addressBind = address
    var chartDom = document.getElementById('whole');
    var myChart = echarts.init(chartDom);
    proxy.$showLoading(myChart)
    setActionWholeConfig(address, repuchase).then(reOption => {
        title.value = `${address == null ? '国内' : address}${repuchase==1?'复购':'非复购'}用户中的年龄/性别/rfm分群类别分布`
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

<style scoped>
#whole {
    width: 600px;
    height: 600px;
}
</style>