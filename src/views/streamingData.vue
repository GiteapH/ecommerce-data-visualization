<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-05 19:28:32
 * @FilePath: \vue-web\src\views\streamingData.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<template>
  <Layout>
    <template #content>
      <el-descriptions title="当前更新信息" :column="3" border>
        <el-descriptions-item
          v-for="item in streamingInfo"
          :key="item.field"
          :label="item.info"
          label-align="right"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
          width="150px"
          >{{ item.value }}
          </el-descriptions-item>
      </el-descriptions>
      <streaming-table api="streaming-update-user-act" title="数据流更新数据详情" :pageSizes="[10,30,50,100]" update></streaming-table>
      <streaming-table></streaming-table>
    </template>
  </Layout>
</template>
<script setup>
import { get, post } from "@/utils/axiosConfig/axios";
import Layout from "@/layout/Layout.vue";
import { ref, onMounted } from "vue";


const streamingInfo = ref([]);

const getUpdateInfo = () => {
  get({
    url: "/streaming-info",
  }).then((res) => {
    streamingInfo.value = res;
  });
};

onMounted(async () => {
  getUpdateInfo();
});
</script>
