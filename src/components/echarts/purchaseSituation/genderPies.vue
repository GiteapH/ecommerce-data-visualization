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
import { setGenderPiesConfig } from '@/utils/js/echartsConfig/purchaseSituation/genderPiesConfig'
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

const title = ref('国内购买人群性别分类占比')


onMounted(() => {
    chartDraw(null)
})


const chartDraw = (address) => {
    var chartDom = document.getElementById('gender');
    var myChart = echarts.init(chartDom);
    myChart.showLoading({
        text: '正在加载...',
        color: '#4cbbff',
        textColor: '#4cbbff',
        maskColor: 'rgba(0, 0, 0, 0.39)'
    })
    setGenderPiesConfig(address).then(({ option, data }) => {
        title.value =  `${address==null?'国内':address}购买人群性别分类占比`
        // 简单分析data
        if (data.female > data.male) {
            questionContent.value = `${address ? `在${address}中,` : ''}购买商品的用户女性占比较高。男性占比较低。网站群体女性占比较重。`;
        } else if (data.female < data.male) {
            questionContent.value = `${address ? `在${address}中,` : ''}购买商品的用户中，男性占比较高。女性占比较低。网站群体男性占比较重。`
        } else {
            questionContent.value = `${address ? `在${address}中,` : ''}购买商品的用户中，男女比例一致。网站群体性别平衡。`
        }
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