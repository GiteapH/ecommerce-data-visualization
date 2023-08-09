<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-28 20:27:15
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-09 17:45:07
 * @FilePath: \vue-web\src\components\echarts\basePersonal\loudou.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<!-- 近几年电商数据流程转化率图 -->
<template>
    <div>
        <div :id="id" :style="{ width: `${width}`, height: `${height}` }" v-if="!show"></div>
        <el-empty description="区间内无交易数据" v-else />
    </div>
</template>

<script setup>
import {
    get
} from '@/utils/axiosConfig/axios'
import { formatDateTime } from '@/utils/utils.js'
import { setLoudouConfig } from './loudou.config.js'
import { nextTick, onMounted, ref } from 'vue';
import * as echarts from 'echarts'

const questionContent = null;


const props = defineProps({
    width: {
        type: String,
        default: 'auto'
    },
    height: {
        type: String,
        default: "350px"
    },
    date: {
        type: Array
    },
    user: {
        type: Number
    },
    id: {
        type: String
    }
})

const show = ref(true)

onMounted(() => {
    chartDraw()
})


const chartDraw = () => {
    show.value = false
    nextTick(() => {
        var chartDom = document.getElementById(props.id);
        var myChart = echarts.init(chartDom);
        myChart.showLoading({
            text: '正在加载...',
            color: '#4cbbff',
            textColor: '#4cbbff',
            maskColor: 'rgba(0, 0, 0, 0.39)'
        })
        get({
            url: '/user-daily-act/getAllByDate',
            params: {
                start: formatDateTime(props.date[0], 'yyyy-MM-dd'),
                end: formatDateTime(props.date[1], 'yyyy-MM-dd'),
                user: props.user
            }
        }).then(res => {
            if (res.length == 0) {
                show.value = true
            } else {
                myChart.hideLoading()
                myChart.setOption(setLoudouConfig(res))
                show.value = false
            }
        })
    })

}
defineExpose({
    chartDraw
})

</script>

<style scoped>

</style>