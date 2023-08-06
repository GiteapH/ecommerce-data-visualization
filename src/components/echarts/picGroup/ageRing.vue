<!-- 年龄分布环形图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent" :title="title">
            <div id="age"  :style="{ width: `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setAgeRingConfig } from '@/utils/js/echartsConfig/picGroup/ageRingConfig'
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts'

const questionContent = ref("How old are you now?");

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

const title = ref(`全国购买人群年龄性别分布`)

const chartDraw = (address,model,tag='重要价值客户'  ) => {
    var chartDom = document.getElementById('age');
    var myChart = echarts.init(chartDom);
    myChart.showLoading({
        text: '正在加载...',
        color: '#4cbbff',
        textColor: '#4cbbff',
        maskColor: 'rgba(0, 0, 0, 0.39)'
    })
    setAgeRingConfig(address,model,tag).then(reOption => {
        title.value = `${address==null?'国内':address}购买人群年龄性别分布`
        myChart.hideLoading()
        myChart.setOption(reOption);
    })
    window.addEventListener("resize", () => {
        myChart.resize()
    });
}


defineExpose({
    chartDraw
})



</script>

<style scoped></style>