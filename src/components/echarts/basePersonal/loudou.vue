<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-28 20:27:15
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-29 16:16:08
 * @FilePath: \vue-web\src\components\echarts\basePersonal\loudou.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
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
import { setgetLoudouConfig } from '@/utils/js/echartsConfig/basePersonal/getLoudouConfig'
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
    chartDraw()
})


const title = ref('国内电商数据转化率')

const chartDraw = (id=1) => {
    var chartDom = document.getElementById('loudou');
    var myChart = echarts.init(chartDom);
    myChart.showLoading({
        text: '正在加载...',
        color: '#4cbbff',
        textColor: '#4cbbff',
        maskColor: 'rgba(0, 0, 0, 0.39)'
    })
    setgetLoudouConfig(id).then(reOption => {
        title.value = `用户电商数据转化率`
        myChart.hideLoading()
        myChart.setOption(reOption);
    })
}
defineExpose({
    chartDraw
})

</script>

<style scoped>
#loudou {
    width: 400px;
    height: 400px;
}
</style>