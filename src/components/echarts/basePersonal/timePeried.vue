<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-16 12:40:59
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-07-03 16:05:19
 * @FilePath: \vue-web\src\components\echarts\basePersonal\timePeried.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->

<template>
    <div>
        <echartDecoration :question-content="questionContent" :title="title">
            <template #interactive>
                <el-select v-model="actType" class="m-2" placeholder="浏览(查看指定操作的交易)" size="large" @change="typeChange">
                    <el-option v-for="item in 5" :label="actTypeStr(item)" :value="item" :key="item" />
                </el-select>
            </template>
            <div id="peried" :style="{ width: `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>


<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setTimePeriedConfig } from '@/utils/js/echartsConfig/basePersonal/timePeriedConfig'
import { onMounted, ref, getCurrentInstance } from 'vue';
import * as echarts from 'echarts'


let userBind = 1
const questionContent = ref("How old are you now?");
const { proxy } = getCurrentInstance()
const actType = ref('')
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

const title = ref(`用户对商品浏览操作的次数`)

const typeChange = ()=>{
    
    chartDraw(userBind)
}

const chartDraw = (user = 1) => {
    
    userBind = 1
    var chartDom = document.getElementById('peried');
    var myChart = echarts.init(chartDom);
    proxy.$showLoading(myChart)
    
    setTimePeriedConfig(actType.value==''?1:actType.value, user).then(reOption => {
        title.value = `用户对商品${proxy.actTypeStr(parseInt(actType.value==''?1:actType.value))}操作的次数`
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