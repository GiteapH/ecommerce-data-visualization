<!-- 转化率图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent">
            <div id="loudou" :style="{ width:  `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../utils/echartDecoration.vue';
import { setgetLoudouConfig } from '@/utils/js/echartsConfig/getLoudouConfig'
import { onMounted } from 'vue';
import * as echarts from 'echarts'
let option = {}

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
    var chartDom = document.getElementById('loudou');
    var myChart = echarts.init(chartDom);
    setgetLoudouConfig().then(reOption => {
        option = reOption
        myChart.setOption(option);
    })
})



</script>

<style scoped>
#loudou {
    width: 400px;
    height: 400px;
}
</style>