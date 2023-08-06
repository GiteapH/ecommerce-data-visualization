<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-07-01 14:05:13
 * @FilePath: \vue-web\src\App.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
<script setup>
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.15);
  transition: color 0.2s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
</style>
