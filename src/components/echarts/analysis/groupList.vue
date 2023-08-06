<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-08-02 14:08:42
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-02 15:29:10
 * @FilePath: \vue-web\src\components\echarts\analysis\groupList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
<div>
    <el-descriptions title="采取策略前" v-loading="group_before.loading">
        <el-descriptions-item label="浏览次数">{{ group_before.view }}</el-descriptions-item>
        <el-descriptions-item label="下单次数">{{ group_before.buy }}</el-descriptions-item>
        <el-descriptions-item label="加入购物车次数">{{ group_before.cart }}</el-descriptions-item>
        <el-descriptions-item label="咨询次数">{{ group_before.consult }}</el-descriptions-item>
        <el-descriptions-item label="评论次数">{{ group_before.comment }}</el-descriptions-item>
        <el-descriptions-item label="关注次数">{{ group_before.fan }}</el-descriptions-item>
        <el-descriptions-item label="投诉次数">{{ group_before.complaint }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="采取策略后" v-loading="group_after.loading">
        <el-descriptions-item label="浏览次数">{{group_after.view}}</el-descriptions-item>
        <el-descriptions-item label="下单次数">{{group_after.buy}}</el-descriptions-item>
        <el-descriptions-item label="加入购物车次数">{{group_after.cart}}</el-descriptions-item>
        <el-descriptions-item label="咨询次数">{{group_after.consult}}</el-descriptions-item>
        <el-descriptions-item label="评论次数">{{group_after.comment}}</el-descriptions-item>
        <el-descriptions-item label="关注次数">{{group_after.fan}}</el-descriptions-item>
        <el-descriptions-item label="投诉次数">{{group_after.complaint}}</el-descriptions-item>
    >
    </el-descriptions>
</div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
    group_before: {
        type: Object,
        default: {
            view:0,
            buy:0,
            cart:0,
            consult:0,
            comment:0,
            fan:0,
            complaint:0,
            loading:true
        },
    },
    group_after: {
        type: Object,
        default: {
            view:0,
            buy:0,
            cart:0,
            consult:0,
            comment:0,
            fan:0,
            complaint:0,
            loading:true
        },
    }
});
</script>

<style lang="less" scoped>
</style>