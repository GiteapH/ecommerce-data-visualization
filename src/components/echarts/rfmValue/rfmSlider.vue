<template>
    <div>
        <echartDecoration title="RFM范围用户">
            <el-row :gutter="20" style="margin-left:20px;margin-bottom: 25px;;">
                <el-col :span="12">
                    <el-row :gutter="50">
                        <el-col :span="8">
                            <div>
                                <span class="demonstration" >R分值</span>
                                <el-slider :max="5" :min="1" v-model="R" range :step="1" show-stops @change="val=>ScoreChange('R',val)" />
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div>
                                <span class="demonstration" >F分值</span>
                                <el-slider :max="5" :min="1" v-model="F" range :step="1" show-stops @change="val=>ScoreChange('F',val)" />
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div>
                                <span class="demonstration" >M分值</span>
                                <el-slider :max="5" :min="1" v-model="M" range :step="1" show-stops @change="val=>ScoreChange('M',val)" />
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <div id="slider" style="width:100%;height:520px"></div>
        </echartDecoration>
    </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance,defineExpose } from "vue";
import { setSliderConfig } from '@/utils/js/echartsConfig/frmValue/rfmSliderConfig'
import * as echarts from 'echarts'
const R = ref([1, 5]);
const F = ref([1, 5]);
const M = ref([1, 5]);
const title = ref("")
const { proxy } = getCurrentInstance('国内RFM得分区间')
let addressBind = null, timeBind = 1
const chartDraw = (address, time) => {
    var chartDom = document.getElementById('slider');
    var myChart = echarts.init(chartDom);
    addressBind = address
    timeBind = time
    proxy.$showLoading(myChart)
    setSliderConfig(address, time, R.value, F.value, M.value).then(reOption => {
        console.log(reOption)
        myChart.hideLoading()
        title.value = `${address == null ? '国内' : address}RFM得分区间`
        myChart.setOption(reOption);
    })
}

const ScoreChange = (type,val)=>{
    chartDraw(addressBind, timeBind)
}

onMounted(async () => {
    chartDraw(addressBind, timeBind)
})

defineExpose({
    chartDraw
})



</script>

<style scoped>
.demonstration {
    font-size: 14px;
    color: var(--el-text-color-secondary);
    line-height: 44px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0;
}
</style>