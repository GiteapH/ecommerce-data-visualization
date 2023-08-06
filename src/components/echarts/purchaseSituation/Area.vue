<!-- 近几年男女电商数据购物频率图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent" :title="title">
            <div id="area" :style="{ width:  `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setAreaConfig } from '@/utils/js/echartsConfig/purchaseSituation/areaConfig'
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

const title = ref(`国内下单人数`)

const chartDraw = (address,province,city,level)=>{
    var chartDom = document.getElementById('area');
    var myChart = echarts.init(chartDom);
    myChart.showLoading({
        text: '正在加载...',
        color: '#4cbbff',
        textColor: '#4cbbff',
        maskColor: 'rgba(0, 0, 0, 0.39)'
    })
    setAreaConfig(address,province,city,level).then(reOption => {
        title.value = `${address==null?'国内':address}下单人数`
        myChart.setOption(reOption,true);
        myChart.hideLoading()
    })
}


defineExpose({
    chartDraw
})

</script>

<style scoped>
#area {
    width: 400px;
    height: 400px;
}
</style>