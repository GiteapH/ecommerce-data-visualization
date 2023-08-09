<!-- 近几年电商数据流程转化率图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent" :title="title">
            <div id="loudou" :style="{ width: `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setgetLoudouConfig } from '@/utils/js/echartsConfig/purchaseSituation/getLoudouConfig'
import { onMounted,ref } from 'vue';
import * as echarts from 'echarts'

const questionContent = null;


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


const title = ref('国内电商数据转化率')

const chartDraw = (address) => {
    var chartDom = document.getElementById('loudou');
    var myChart = echarts.init(chartDom);
    myChart.showLoading({
        text: '正在加载...',
        color: '#4cbbff',
        textColor: '#4cbbff',
        maskColor: 'rgba(0, 0, 0, 0.39)'
    })
    setgetLoudouConfig(address).then(reOption => {
        title.value = `${address==null?'国内':address}电商数据转化率`
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