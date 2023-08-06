<!-- clv流失率图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent">
            <div id="lost"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setLostRateConfig } from '@/utils/js/echartsConfig/clvValue/lostRateConfig'
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
    var chartDom = document.getElementById('lost');
    var myChart = echarts.init(chartDom);
    setLostRateConfig().then(reOption => {
        option = reOption
        myChart.setOption(option);
    })
})



</script>

<style scoped>
#lost {
    width: 400px;
    height: 400px;
}
</style>