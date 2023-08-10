<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-07-29 14:23:24
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-10 11:36:18
 * @FilePath: \vue-web\src\components\echarts\analysis\groupAnalysis.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<template>
  <div>
    <div label-width="120px" label-position="left">
      <el-row>
        <el-col :span="24">
          <h3>用户指标分析</h3>
        </el-col>
        <el-col :span="24">
          <div v-loading="userAnalysisLoading" element-loading-text="正在分析中...">
            {{ groupAnalysis }}
          </div>
        </el-col>
      </el-row>
      <el-divider style="margin-top: 30px"></el-divider>
      <el-row>
        <el-col :span="24">
          <h3>对应营销策略</h3>
        </el-col>
        <el-col :span="5">
          <p>请选择生成方案数量</p>
          <el-select v-model="num" placeholder="请选择生成方案数量" @change="numChange">
            <el-option label="1种" value="1"></el-option>
            <el-option label="2种" value="2"></el-option>
            <el-option label="3种" value="3"></el-option>
            <el-option label="4种" value="4"></el-option>
            <el-option label="5种" value="5"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <div style="margin-top: 30px">
        <div class="analysis">
          <el-timeline style="height: 500px; overflow: scroll; padding-right: 15px">
            <el-timeline-item :timestamp="'方案  ' + (index + 1)" :key="index" placement="top" :color="`${colors[index]}`"
              hollow v-for="(item, index) in analysis">
              <el-card v-loading="loading" :element-loading-text="`正在生成方案${index + 1}中...`"
                :style="{ 'border-right': `solid 14px ${colors[index]}` }" shadow="hover">
                <el-form :inline="true">
                  <el-form-item label="措施">
                    <p>{{ item.name }}</p>
                  </el-form-item>
                  <el-form-item label="具体实施">
                    <p>{{ item.detail }}</p>
                  </el-form-item>
                  <el-form-item label="实施目的">
                    <p>{{ item.result }}</p>
                  </el-form-item>
                </el-form>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <el-divider></el-divider>
      <div>
        <div :span="24">
          <h3>营销前后数据对比</h3>
        </div>
        <div>
          <div>
            <div>
              <p>未采取策略用户交易周期</p>
              <el-date-picker @calendar-change="beforeChange" v-model="before" type="daterange" range-separator="到"
                start-placeholder="开始日期" end-placeholder="结束日期"
                :default-value="[new Date(2018, 1, 15), new Date(2018, 2, 15)]" />
            </div>
          </div>
          <div>
            <div>
              <p>采取策略后用户交易周期</p>
              <el-date-picker @calendar-change="afterChange" v-model="after" type="daterange" range-separator="到"
                start-placeholder="开始日期" end-placeholder="结束日期"
                :default-value="[new Date(2018, 2, 15), new Date(2018, 3, 15)]" />
            </div>
          </div>
          <div>
            <div>
              <p>需要对比的数据</p>
              <el-select v-model="type" placeholder="需要对比的数据" style="margin-top: -5px" @change="typeChange">
                <el-option label="浏览次数" value="view"></el-option>
                <el-option label="下单次数" value="buy"></el-option>
                <el-option label="关注次数" value="fan"></el-option>
                <el-option label="评论次数" value="comment"></el-option>
                <el-option label="加入购物车次数" value="cart"></el-option>
                <el-option label="咨询客服次数" value="consult"></el-option>
                <el-option label="投诉次数" value="conplain"></el-option>
                <el-option label="每日交易额" value="buyLine"></el-option>
                <el-option label="每日距离下次交易间隔" value="interval"></el-option>
                <el-option label="平均消费信息" value="avg"></el-option>
                <el-option label="消费信息统计" value="group"></el-option>
                <el-option label="转化率变化" value="conversion"></el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div v-if="type == 'group'" style="margin-top: 25px">
        <group-list :group_before="group_before" :group_after="group_after"></group-list>
      </div>
      <div v-else-if="type == 'avg'" style="margin-top: 25px">
        <avg-card :before_after="before_after" :before_after_diff="before_after_diff"></avg-card>
      </div>
      <div v-else-if="type == 'conversion'" style="margin-top: 25px">
        <el-row :gutter="20">
          <el-col :span="12">
            <span
              style="font-weight:500;font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;font-size:larger;border-bottom:solid 3px #7df79b">采取前</span>
            <loudou :date="before" :group="group" :id="'before'"></loudou>
          </el-col>
          <el-col :span="12">
            <span
              style="font-weight:500;font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;font-size:larger;border-bottom:solid 3px #125623">采取后</span>
            <loudou :date="after" :group="group" :id="'after'"></loudou>
          </el-col>
        </el-row>
      </div>
      <div id="any" style="height: 450px; width: 1000px; margin: 0 auto; margin-top: 25px" v-else></div>
    </div>
  </div>
</template>

<script setup>
//1.浏览；2.下单；3.关注；4.评论；
//5.加入购物车；6.咨询客服；7.投诉；
import * as echarts from "echarts";
import loudou from '../analysis/loudou'
import { setAnalysisConfig } from "./config.js";
import { analysisGroup, chatGroup } from "@/utils/js/gpt.js";
import {
  onMounted,
  ref,
  watch,
  getCurrentInstance,
  nextTick,
  defineProps,
} from "vue";
import { ElNotification } from "element-plus";

const props = defineProps({
  group: {
    type: String,
    default: "重要价值客户",
  },
  forecast: {
    type: Object,
    default: {
      avgLoss: 0.0,
      sumPrice: 0.0,
      avgBack: 0.0,
      avgdiff: 0.0,
      personal_avg: 0,
    },
  },
  cardInfo: {
    type: Object,
    default: {
      frequencyNum: 0,
      consumptionCapacityNum: 0,
      recencyNum: 0,
    },
  },
});

const colors = ref([
  "rgb(139, 235, 102)",
  "rgb(123, 167, 248)",
  "rgb(233, 196, 34)",
  "rgb(255, 238, 0)",
  "rgb(88, 78, 236)",
  "rgb(193, 78, 247)",
  "rgb(252, 114, 90)",
]);

const group_after = ref({
  view: 0,
  buy: 0,
  cart: 0,
  consult: 0,
  comment: 0,
  fan: 0,
  complaint: 0,
  loading: true,
});
const group_before = ref({
  view: 0,
  buy: 0,
  cart: 0,
  consult: 0,
  comment: 0,
  fan: 0,
  complaint: 0,
  loading: true,
});
const before_after = ref([0, 0, true]);
const before_after_diff = ref([0, 0, true]);
const { proxy, parent } = getCurrentInstance();
const before = ref([new Date(2018, 1, 15), new Date(2018, 2, 15)]);
const after = ref([new Date(2018, 2, 15), new Date(2018, 3, 15)]);
const num = ref("2");
const loading = ref(true);
const userAnalysisLoading = ref(true);
const groupAnalysis = ref("");
const analysis = ref([]);
const type = ref("view");

const numChange = () => {
  analysis.value = []
  for (let i = 0; i < num.value; i++) {
    analysis.value.push({
      title: "",
      detail: "",
      result: "",
    })
  }
  loading.value = true
  nextTick(() => {
    try {
      chatGroup(
        props.forecast,
        props.cardInfo,
        props.group,
        analysis,
        loading,
        num.value
      );
    } catch (e) {
      ElNotification({
        title: '异常',
        message: "方案生成中发生未知错误",
        position: 'top-left',
        type: 'error'
      })
    }
  })
};
const typeChange = (val) => {
  chartDraw(val, false, props.group);
};
const beforeChange = (val) => {
  if (val[0] == null || val[1] == null) return;
  before.value = val;
  chartDraw(type.value, true, props.group);
};

const afterChange = (val) => {
  if (val[0] == null || val[1] == null) return;
  after.value = val;
  chartDraw(type.value, true, props.group);
};

const chartDraw = (type, update, group) => {
  nextTick(() => {
    if (type != "avg" && type != "group" && type != "conversion") {
      let chartDom = document.getElementById("any");
      var myChart = echarts.init(chartDom);
      proxy.$showLoading(myChart);
    }
    setAnalysisConfig(
      before_after,
      before_after_diff,
      group_before,
      group_after,
      group,
      before.value[0],
      before.value[1],
      after.value[0],
      after.value[1],
      update,
      type
    ).then((res) => {
      if (type != "avg" && type != "group" && type != "conversion") {
        myChart.hideLoading();
        myChart.setOption(res);
      }
    });
  });
};

onMounted(() => {
  chatGroup(
    props.forecast,
    props.cardInfo,
    props.group,
    analysis,
    loading,
    num.value
  );
  chartDraw("view", true, props.group);
  analysisGroup(
    props.forecast,
    props.cardInfo,
    props.group,
    groupAnalysis,
    userAnalysisLoading
  );
});
</script>

<style scoped>
.el-form--inline .el-form-item {
  display: flex;
}

.analysis {
  filter: Alpha(opacity=50);
  background-image: url("@/assets/img/88.jpg");
  width: 100%;
  height: 500px;
  background-repeat: no-repeat;
  background-position: center;
  position: static;
  background-size: 30%;
}
</style>