<!-- 近几年价格类型分布图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent" :title="title">
            <div id="priceLine" :style="{ width:  `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setgetPriceConfig } from '@/utils/js/echartsConfig/purchaseSituation/priceLine'
import { onMounted,ref } from 'vue';
import * as echarts from 'echarts'
const questionContent = "How old are you?";


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

const title = ref('国内用户购买价格段总量')

const chartDraw = (address,time)=>{
    var chartDom = document.getElementById('priceLine');
    var myChart = echarts.init(chartDom);
    myChart.showLoading({
        text: '正在加载...',
        color: '#4cbbff',
        textColor: '#4cbbff',
        maskColor: 'rgba(0, 0, 0, 0.39)'
    })
    setgetPriceConfig(address,time).then(reOption => {
        title.value =  `${address==null?'国内':address}用户购买价格段总量`
        myChart.hideLoading()
        myChart.setOption(reOption);
    })
}

defineExpose({
    chartDraw
})


</script>

<style scoped></style>