/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-06-30 12:03:23
 * @FilePath: \vue-web\src\main.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import {
  createApp
} from 'vue'
import App from './App.vue'
import {
  loadFonts
} from './plugins/webfontloader'
import router from './router'
import './router/handle.js'
import store from './store'
const actTypeStr = (type)=>{
  switch(type){
    case 1:return '浏览'
    case 2:return '下单'
    case 3:return '关注'
    case 4:return '评论'
    case 5:return '加入购物车'
  }
}
loadFonts()
const app = createApp(App)

app.config.globalProperties.$showLoading = (myChart, config = {
  text: '正在加载...',
  color: '#4cbbff',
  textColor: '#4cbbff',
  maskColor: 'rgba(0, 0, 0, 0.39)'
}) => {
  myChart.showLoading(config)
}
app.config.globalProperties.actTypeStr = actTypeStr
app.use(store).use(router).use(router).mount('#app')