/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-07-05 11:44:16
 * @FilePath: \vue-web\src\store\index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import {
  createStore
} from 'vuex'


import router from '@/router'
export default createStore({
  state: {
    //tags数组
    tags: [{
      name: '用户群体购买情况',
      url: '/purchaseSituation'
    }],
    //tagsview标签显示隐藏
    isCollapse: false
  },
  mutations: {
    pushtags(state, val) {

      //如果等于-1说明tabs不存在那么插入，否则什么都不做
      //findindex找角标，循环判断一下，如果等于那么就代表有相同的，就不必添加，如果找不到那就是-1.就添加
      let result = state.tags.findIndex(item => item.name === val.name)
      result === -1 ? state.tags.push(val) : ''
    },
    //关闭标签
    closeTab(state, val) {
      //同上，找角标，然后用角标的位置对应删除一位。splice：这是数组的删除方法
      let result = state.tags.findIndex(item => {
        
        return item.name == val.name
      })
      state.tags.splice(result, 1)
    },
    //关闭所有tagsview标签
    cleartagsview(state, val) {
      //清空数组
      state.tags = []
      //跳转到首页,val接受传过来的当前路由
      if (val !== "/index") {
        router.push({
          path: "/index"
        })
      }
    },
    //改变tagsview显示隐藏
    changeisshow(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {},
  modules: {}
})