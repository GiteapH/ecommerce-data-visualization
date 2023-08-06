<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-30 12:19:13
 * @FilePath: \vue-web\src\components\echarts\basePersonal\rfmCompare.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<!-- rfm三个指标图 -->
<template>
    <div>
        <echartDecoration :question-content="questionContent" :title="title">
            <template #bottom-interactive>
                <el-form :inline="true">
                    <el-form-item label="对比用户id">
                        <el-input v-model="compare" filterable placeholder="请选择对比用户" :min="1" type="number" :max="1608708"
                            controls-position="right" :disabled="disabled" @change="userChange">
                        </el-input>
                    </el-form-item>
                </el-form>
            </template>
            <div id="compare" :style="{ width: `${width}`, height: `${height}` }"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { setcompareConfig } from '@/utils/js/echartsConfig/basePersonal/frmCompareConfig'
import { onMounted, getCurrentInstance, ref } from 'vue';
import * as echarts from 'echarts'
const questionContent = "How old are you?";
const { proxy } = getCurrentInstance()
const title = ref('国内用户累计支出,消费频率与最近一次消费时间的分布情况')
const compare = ref(2)
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

let timeBind = null, idBind = null

const userChange = (val) => {
    chartDraw(timeBind, idBind)
}
onMounted(() => {
    chartDraw()
})

const chartDraw = (time = 1, id = 1) => {
    var chartDom = document.getElementById('compare');
    var myChart = echarts.init(chartDom);
    timeBind = time
    idBind = id
    proxy.$showLoading(myChart)
    setcompareConfig(time, [id, compare.value]).then(reOption => {
        myChart.hideLoading()
        title.value = `用户支出,消费频率与最近一次消费时间的分布情况`
        myChart.setOption(reOption);
    })
}

defineExpose({
    chartDraw
})

</script>

<style scoped>
.el-select .el-select-tags-wrapper.has-prefix {
    overflow: scroll;
    height: 40px
}

/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
}

/deep/ input[type='number'] {
    -moz-appearance: textfield !important;
}
</style>