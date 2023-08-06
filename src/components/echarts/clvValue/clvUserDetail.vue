<!-- clv用户价值分层图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent">
            <div id="clvUserDetail"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setclvUserDetailConfig } from '@/utils/js/echartsConfig/clvValue/clvUserDetailConfig'
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
    var chartDom = document.getElementById('clvUserDetail');
    var myChart = echarts.init(chartDom);
    setclvUserDetailConfig().then(reOption => {
        option = reOption
        myChart.setOption(option);
    })
})



</script>

<style scoped>
#clvUserDetail {
    width: 400px;
    height: 400px;
}
</style>