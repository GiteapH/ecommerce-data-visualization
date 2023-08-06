<!-- clv客户生命周期图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent">
            <div id="clvUserLive"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setclvUserLiveConfig } from '@/utils/js/echartsConfig/clvValue/clvUserLiveConfig'
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
    var chartDom = document.getElementById('clvUserLive');
    var myChart = echarts.init(chartDom);
    setclvUserLiveConfig().then(reOption => {
        option = reOption
        myChart.setOption(option);
    })
})



</script>

<style scoped>
#clvUserLive {
    width: 400px;
    height: 400px;
}
</style>