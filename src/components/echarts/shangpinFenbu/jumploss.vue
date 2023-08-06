<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-30 19:52:50
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-07-04 16:09:25
 * @FilePath: \vue-web\src\components\echarts\shangpinFenbu\jumploss.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<!-- 商品分布跳失率图 -->
<template>
    <div>
        <echartDecoration :title="title">
            <div :id="jumpId" :style="{ width: `${width}`, height: `${height}` }" ></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setjumploss } from '@/utils/js/echartsConfig/shangpinFenbu/jumploss'
import { onMounted,getCurrentInstance ,ref} from 'vue';
import * as echarts from 'echarts'

const {proxy} = getCurrentInstance()
const title = ref('全国的商品购买用户分布情况')


const props = defineProps({
    width: {
        type: Number,
        default: 'auto'
    },
    height: {
        type: Number,
        default: 300
    },
    jumpId:{
        type:String,
        default:'jump'
    },
    showLoss:{
        type:Boolean,
        default:true
    }
})

const chartDraw = (data)=>{
    var chartDom = document.getElementById(props.jumpId);
    var myChart = echarts.init(chartDom);
    proxy.$showLoading(myChart)
    setjumploss(data,props.showLoss).then(reOption => {
        myChart.hideLoading()
        myChart.setOption(reOption);
    })
    
    
}

defineExpose({
    chartDraw
})




</script>

<style scoped>

</style>