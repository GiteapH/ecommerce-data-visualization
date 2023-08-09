<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-14 11:26:42
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-08 17:53:34
 * @FilePath: \vue-web\src\components\echarts\picGroup\ageRing.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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

var myChart = null,dataE
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
    myChart = echarts.init(chartDom);
    myChart.showLoading({
        text: '正在加载...',
        color: '#4cbbff',
        textColor: '#4cbbff',
        maskColor: 'rgba(0, 0, 0, 0.39)'
    })
    setAgeRingConfig(address,model,tag).then(({option,data}) => {
        title.value = `${address==null?'国内':address}购买人群年龄性别分布`
        myChart.hideLoading()
        myChart.setOption(option);
        dataE = data
    })
    window.addEventListener("resize", () => {
        myChart.resize()
    });
}


const getEcharts = ()=>{
    return [myChart,dataE]
}

defineExpose({
    chartDraw,
    getEcharts
})



</script>

<style scoped></style>