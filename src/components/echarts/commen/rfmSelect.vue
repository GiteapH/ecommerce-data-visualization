<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-06 16:53:47
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-15 12:05:11
 * @FilePath: \vue-web\src\components\echarts\commen\rfmSelect.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<template>
    <div>
        <el-select v-model="rfm" @change="onChange">
            <el-option v-for="item in rfms" :value="item" :label="item" :key="item"></el-option>
        </el-select>
    </div>
</template>

<script setup>
import {ref} from 'vue'
const rfms = ['重要挽留客户','重要深耕客户','一般维持客户','新客户','流失客户','重要唤回客户','重要价值客户','潜力客户']
const rfm = ref('重要价值客户')
const props = defineProps({
    value:{
        type:String,
        default:"重要价值客户"
    }
})
let emit = defineEmits(['change:value'])
const onChange = (val)=>{
    emit('change',val)
}

</script>

<style scoped>

</style>