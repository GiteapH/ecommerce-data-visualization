<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-17 14:46:21
 * @FilePath: \vue-web\src\components\echarts\commen\card.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<template>
    <div id="card">
        <el-row justify="space-between" @mousemove="visibility = false" @mouseleave="visibility = true">
            <el-col :span="7">
                <div class="svg-div" :style="{ 'background': (visibility == true ? 'whitesmoke' : background) }">
                    <slot name="svgLeave" v-if="visibility">
                    </slot>
                    <slot name="svgmove" v-else>
                    </slot>
                </div>
            </el-col>
            <el-col :span="14">
                <div style="text-align: center;">
                    <p style="line-height: 18px;color: rgba(0,0,0,.45);font-size: 16px;margin-bottom: 12px;">{{ label }}</p>
                    <DigitalFlop :config="config" style="width:200px;height:50px;" v-if="isNum" />
                    <p style="font-size: 20px;font-weight: 700;" v-else>
                        {{ value }}
                    </p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"
import { DigitalFlop } from '@kjgl77/datav-vue3'

const visibility = ref(true)
const props = defineProps({
    isNum: {
        default: true,
        type: Boolean
    },
    value: {
        type: String,
        requierd: true
    },
    label: {
        type: String,
        requierd: true
    },
    background: {
        type: String,
        requierd: true
    },
    toFixed: {
        type: Number,
        default: 0
    },
    suffix: {
        type: String,
        default: ""
    }
})
const formatter = props.toFixed == 0 ? function (number) {

        const numbers = number.toString().split('').reverse()
        const segs = []
        while (numbers.length) segs.push(numbers.splice(0, 3).join(''))

        return segs.join(',').split('').reverse().join('')
    
} : function(number){
    return number
}

watch(() => props.value, (val, preval) => {
    if (props.isNum) {
        config.value.number = [val]
    }
})
const config = ref({
    number: [],
    content: '{nt}' + props.suffix,
    formatter,
    toFixed: props.toFixed,
    style: {
        fontSize: '20',
        fontWeight: '700',
        fill: '#3de7c9',
        textAlign: 'right'
    }
})


onMounted(() => {
    if (props.isNum)
        config.value.number = [props.value]
})
</script>

<style scoped>
#card {
    border-radius: 10px;
    background: whitesmoke;
    padding: 18px;
    padding-top: 5px;
    padding-bottom:5px;
    padding-left: 5px;
}

.svg-div {
    padding: 15px;
    border-radius: 10px;
    background: whitesmoke;
    transition: all 0.5s ease;
}
</style>