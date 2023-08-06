<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-14 11:26:42
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-16 16:44:59
 * @FilePath: \vue-web\src\components\echarts\picGroup\genderPies.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<!-- 年龄分布环形图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent" :title="title" >
            <div id="gender"  :style="{ width: `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setGenderRingConfig } from '@/utils/js/echartsConfig/picGroup/genderPiesConfig'
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts'


const questionContent = ref("");



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

const title = ref('国内用户群占比信息')


onMounted(() => {
    chartDraw(null)
})


const chartDraw = (address, model=1, group='重要价值客户',level=0,type = 1) => {
    var chartDom = document.getElementById('gender');
    var myChart = echarts.init(chartDom);
    myChart.showLoading({
        text: '正在加载...',
        color: '#4cbbff',
        textColor: '#4cbbff',
        maskColor: 'rgba(0, 0, 0, 0.39)'
    })
    setGenderRingConfig(address, model, group,level,type).then(option => {
        title.value =  `${address==null?'国内':address}用户群占比信息`
        // 简单分析data
        
        myChart.hideLoading()
        myChart.setOption(option);
    })
    window.addEventListener("resize", () => {
        myChart.resize();
    });
}

defineExpose({
    chartDraw
})

</script>

<style scoped>
#gender {
    width: 450px;
    height: 450px;
}
</style>