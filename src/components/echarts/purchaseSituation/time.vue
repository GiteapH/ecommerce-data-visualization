<!-- 近几年价格类型分布图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent" :title="title">
            <div id="time" :style="{ width:  `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setgetTimeConfig } from '@/utils/js/echartsConfig/purchaseSituation/getTimeConfig'
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
    chartDraw()
})


const title = ref('国内活跃时间分布')

const chartDraw = (address,time)=>{
    var chartDom = document.getElementById('time');
    var myChart = echarts.init(chartDom);
    myChart.showLoading({
        text: '正在加载...',
        color: '#4cbbff',
        textColor: '#4cbbff',
        maskColor: 'rgba(0, 0, 0, 0.39)'
    })
    setgetTimeConfig(address,time).then(reOption => {
    title.value = `${address==null?'国内':address}活跃时间分布`

        myChart.hideLoading()
        myChart.setOption(reOption);
    })
}

defineExpose({
    chartDraw
})


</script>

<style scoped></style>