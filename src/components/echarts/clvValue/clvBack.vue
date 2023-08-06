<!-- clv回归率图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent">
            <div id="clvBack"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setBackConfig } from '@/utils/js/echartsConfig/clvValue/clvBackConfig'
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
    var chartDom = document.getElementById('clvBack');
    var myChart = echarts.init(chartDom);
    setBackConfig().then(reOption => {
        option = reOption
        myChart.setOption(option);
    })
})



</script>

<style scoped>
#clvBack {
    width: 400px;
    height: 400px;
}
</style>