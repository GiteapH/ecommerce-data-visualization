<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-11 17:18:57
 * @FilePath: \vue-web\src\components\utils\echartDecoration.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<template>
    <div class="echart_box">
        <el-row justify="space-between">
            <el-col :span="15">
                <p class="title" v-if="!update">
                    {{ title }}
                </p>
                <el-badge is-dot v-else>
                    <p class="title">
                        {{ title }}
                    </p>
                </el-badge>
            </el-col>
            <el-col :span="7">
                <slot name="interactive"></slot>
            </el-col>
        </el-row>
        <el-row v-show="$slots['bottom-interactive']">
            <el-col :span="24" style="margin-top: 15px;">
                <slot name="bottom-interactive"></slot>
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <slot></slot>
        <el-tooltip class="box-item" effect="light" :content="questionContent" placement="top-start"
            :raw-content="permitHTML" v-if="questionContent != null">
            <el-button :icon="QuestionFilled" circle size="small"></el-button>
        </el-tooltip>
    </div>
</template>

<script setup>
import { QuestionFilled } from '@element-plus/icons-vue'
import { onMounted, watch,getCurrentInstance } from 'vue'

const {proxy} = getCurrentInstance()
const props = defineProps({
    questionContent: {
        type: String,
        default: null
    },
    permitHTML: {
        default: false,
        type: Boolean
    },
    title: {
        type: String,
        default: "______"
    },
    update:{
        type:Boolean,
        default:false
    }
})



watch(() => props.title, (val, preVal) => {
    new Promise(()=>{

    })
})

onMounted(()=>{
    
})
</script>

<style scoped>
.echart_box {
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    padding: 10px;
    border-radius: 8px;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 10px;
    width: 95%;
}

.title {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 700;
    color: #3c3c3c;
    line-height: 16px;
    margin-top: 5px;
    text-align: left;
    margin-left: 8px;

}

</style>