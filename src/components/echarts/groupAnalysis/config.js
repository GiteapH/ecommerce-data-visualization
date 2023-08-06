/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-14 11:27:39
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-04 14:45:26
 * @FilePath: \vue-web\src\utils\js\echartsConfig\basePersonal\timePeriedConfig.js
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
 */
import { get } from '@/utils/axiosConfig/axios'
import { formatDateTime } from '@/utils/utils.js'


var proc = [], datas = {
  before: [],
  after: []
}
export function setAnalysisConfig(before_after,before_after_diff,group_before,group_after,group, beforeStart=new Date(), beforeEnd, afterStart, afterEnd, update, type) {
  // 根据params，请求获取渲染图标的数据，静态数据调试把他注释了
  return new Promise((resolve, reject) => {
    proc.push(
      new Promise((resolve1, reject1) => {
        if (update) { 
          before_after.value[2] = true
          before_after_diff.value[2] = true
          group_before.value.loading = true
          group_after.value.loading = true
          get({
            url: '/user-daily-act/getAllByGroup',
            params: {
              start: formatDateTime(beforeStart, 'yyyy-MM-dd'),
              end: formatDateTime(beforeEnd, 'yyyy-MM-dd'),
              group: group
            }
          }).then(data => {
            datas.before = data
            let sum = 0,count = 0,sum_diff=0,count_diff = 0
            datas.before.forEach(item => {
              if(item.buyLine!=0){
                sum+=item.buyLine
                count++
              }
              group_calculate(group_before.value,item)
              sum_diff+=item.interval
              count_diff++
            })

            try{
              before_after.value[0] = sum/count
              if(count==0)throw '被除数不为0'
            }catch(e){
              before_after.value[0] = 0
            }
            try{
              before_after_diff.value[0] = sum_diff/count_diff
              if(count_diff==0)throw '被除数不为0'
            }catch(e){
              before_after_diff.value[0] = 0
            }
            resolve1()
          }).catch(err => {
            reject1(err)
          })
        } else {
          resolve1()
        }
      })
    )
    proc.push(
      new Promise((resolve1, reject1) => {
        if (update) {
          get({
            url: '/user-daily-act/getAllByGroup',
            params: {
              start: formatDateTime(afterStart, 'yyyy-MM-dd'),
              end: formatDateTime(afterEnd, 'yyyy-MM-dd'),
              group: group
            }
          }).then(data => {
            let sum = 0,count = 0,sum_diff=0,count_diff = 0
            datas.after = data
            datas.after.forEach(item => {
              if(item.buyLine!=0){
                sum+=item.buyLine
                count++
              }
              group_calculate(group_after.value,item)
              sum_diff+=item.interval
              count_diff++
            })

            try{
              before_after.value[1] = sum/count
              if(count==0)throw '被除数不为0'
            }catch(e){
              before_after.value[1] = 0
            }
            try{
              before_after_diff.value[1] = sum_diff/count_diff
              if(count_diff==0)throw '被除数不为0'
            }catch(e){
              before_after_diff.value[1] = 0
            }
            resolve1()
          }).catch(err => {
            reject1(err)
          })
        } else {
          resolve1()
        }
      })
    )

    Promise.all(proc).then(() => {
      before_after.value[2] = false
      before_after_diff.value[2] = false
      group_before.value.loading = false
      group_after.value.loading = false
      let beforeLen = datas.before.length
      let afterLen = datas.after.length
      if(update)
        datas.before.push(datas.before.length==0?{
          "userId": "1",
          "date": [
              beforeStart.getFullYear(),
              beforeStart.getMonth()+1,
              beforeStart.getDate()
          ],
          "view": 0,
          "cart": 0,
          "fan": 0,
          "buy": 0,
          "complain": 0,
          "comment": 0,
          "consult": 0,
          "buyLine": 0,
          "interval": 0
      }:datas.before[datas.before.length-1])
      let all = datas.before.concat(datas.after)
      resolve({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data:all.map(e=>{
            return e.date.join("-")
          })
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '30%']
        },
        tooltip: {},
        visualMap: {
          type: 'piecewise',
          show: false,
          dimension: 0,
          seriesIndex: 0,
          pieces: [
            {
              gt: 0,
              lt: beforeLen - 1,
              color: 'rgba(0, 0, 180, 0.4)'
            },
            {
              gt: beforeLen,
              lt: beforeLen + afterLen,
              color: 'rgba(111, 236, 209, 0.4)'
            }
          ]
        },
        series: [
          {
            name:'次数/元/日',
            type: 'line',
            smooth: 0.6,
            lineStyle: {
              color: '#5470C6',
              width: 5
            },
            markLine: {
              symbol: ['none', 'none'],
              label: { show: false },
              data: [{ xAxis: 0 }, { xAxis:  beforeLen - 1 }, { xAxis: beforeLen }, { xAxis: beforeLen + afterLen }]
            },
            areaStyle: {},
            data: all.map(e => {
              return e[type]
            })
          }
        ]
      })
    })
  })
}

const group_calculate = (group,item)=>{
  group.view += item.view
  group.buy += item.buy
  group.cart += item.cart
  group.consult += item.consult
  group.comment += item.comment
  group.fan += item.fan
  group.complaint += item.complain
}

export default setAnalysisConfig