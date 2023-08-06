<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-08 16:21:17
 * @FilePath: \vue-web\src\components\echarts\rfmValue\rfmCompare.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<!-- rfm三个指标图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent" :title="title">
            <template #bottom-interactive>
                <el-select v-model="rfmTags" multiple filterable allow-create default-first-option :reserve-keyword="false" @change="rfmTagsChange" style="width: 80%"
                    placeholder="请选择雷达图用户群元素">
                    <el-option v-for="item in rfms" :key="item" :label="item" :value="item"/>
                </el-select>
            </template>
            <div id="compare" :style="{ width: `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setcompareConfig } from '@/utils/js/echartsConfig/frmValue/frmCompareConfig'
import { onMounted, getCurrentInstance, ref } from 'vue';
import * as echarts from 'echarts'
import rfmSelect from '@/components/echarts/commen/rfmSelect.vue'
const questionContent = "How old are you?";
const { proxy } = getCurrentInstance()
const title = ref('国内用户累计支出,消费频率与最近一次消费时间的分布情况')
const rfms = ['重要挽留客户', '重要深耕客户', '一般维持客户', '新客户', '流失客户', '重要唤回客户', '重要价值客户', '潜力客户']
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

let addressBind = null, timeBind = null
const rfmTags = ref(['重要价值客户', '一般维持客户'])
const rfmTagsChange = (val)=>{
    chartDraw(addressBind,timeBind)
}
onMounted(() => {
    chartDraw()
})

const chartDraw = (address, time = 1) => {
    var chartDom = document.getElementById('compare');
    var myChart = echarts.init(chartDom);
    addressBind = address
    timeBind = time
    proxy.$showLoading(myChart)
    setcompareConfig(address, rfmTags.value, time).then(reOption => {
        myChart.hideLoading()
        title.value = `${address == null ? '国内' : address}用户累计支出,消费频率与最近一次消费时间的分布情况`
        myChart.setOption(reOption);
    })
}

defineExpose({
    chartDraw
})

</script>

<style scoped>

.el-select .el-select-tags-wrapper.has-prefix{
    overflow: scroll;
    height: 40px
}
</style>