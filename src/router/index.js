/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-06 15:31:18
 * @FilePath: \vue-web\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Layout from '../layout/Layout'
import purchaseSituational from '../views/purchaseSituation.vue'
import userAnalysis from '@/components/echarts/analysis/userAnalysis.vue'
import GouMaiAction from '../views/GouMaiAction.vue'
import ShangPinfenbu from '../views/ShangPinfenbu.vue'
import rfmModuleVue from '@/views/userValueViews/rfmModule.vue'
import group from '../views/picture/groupPic'
import streamingData from '../views/streamingData.vue'
import basePersonal from '../views/picture/basePersonal.vue'
const routes = [{
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/purchaseSituation',
    children: [ // 子路由
      {
        path: '/purchaseSituation',
        name: 'purchaseSituation',
        component: purchaseSituational
      },
    ]
  },
  {
    path: '/purchaseSituation',
    name: 'purchaseSituation',
    component: purchaseSituational,
    meta: { title: '用户群体购买情况' }
  },
  {
    path: '/action',
    name: 'action',
    component: GouMaiAction,
    meta: { title: '购买行为分布' }

  },
  {
    path: '/sku',
    name: 'sku',
    component: ShangPinfenbu,
    meta: { title: '商品发布' }
  },
  {
    path: '/rfm',
    name: 'rfm',
    component: rfmModuleVue,
    meta: { title: 'rfm用户群体分析' }
  },
  {
    path: '/basePersonal',
    name: 'basePersonal',
    component: basePersonal,
    meta: { title: '用户画像' }
  },
  {
    path: '/group',
    name: 'group',
    component: group,
    meta: { title: '用户群画像' }
  },
  {
    path: '/streamingData',
    name: 'streamingData',
    component: streamingData,
    meta: { title: '实时数据' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router