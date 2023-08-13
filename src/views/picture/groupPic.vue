<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-05-30 15:38:41
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-11 14:57:44
 * @FilePath: \vue-web\src\views\picture\groupPic.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<template>
  <Layout>
    <template #content>
      <el-row style="margin-bottom: 10px">
        <el-col :span="10">
          <el-form :inline="true">
            <el-form-item label="基于的rfm模型时间">
              <el-select @change="modelChange" v-model="model" style="margin-bottom: 15px">
                <el-option label="基于全部日期的模型" value="1"> </el-option>
                <el-option label="基于最近一月的模型" value="2"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="rfm群体">
              <rfmSelect @change="rfmChange" :value="rfm" style="margin-bottom: 15px" />
            </el-form-item>
            <el-form-item label="用户群报告">
              <el-badge is-dot>
                <input type="file" id="module" accept=".docx" style="margin-bottom: 15px" @change="docxChange" />
                <el-button text bg type="primary" @click="docxUpload" style="margin-bottom: 15px">上传模板word生成报告</el-button>
              </el-badge>
            </el-form-item>
            <el-form-item label="用户群体营销策略">
              <el-badge is-dot>
                <el-button text bg type="primary" @click="analysisVisible = true" style="margin-bottom: 15px">
                  用户群体营销策略
                </el-button>
              </el-badge>
              <el-dialog v-model="analysisVisible" title="用户群体营销策略" width="50%" center>
                <groupAnalysis ref="groupAnalysisRef" :group="rfm" :cardInfo="cardInfo" :forecast="forecastGPT">
                </groupAnalysis>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="analysisVisible = false">取消</el-button>
                    <el-button type="primary" @click="analysisVisible = false">
                      取消
                    </el-button>
                  </span>
                </template>
              </el-dialog>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-row justify="space-between" v-loading="load">
            <el-col :span="7">
              <card :value="cardInfo.avgConsumption" label="用户群平均累计消费" background="#eade02" :is-num="true" to-fixed="0"
                suffix="元">
                <template #svgLeave>
                  <svg t="1686984083187" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="26100" width="45" height="45">
                    <path
                      d="M922.8 338.5c-22.5-53.1-54.6-100.8-95.5-141.7-40.9-40.9-88.6-73.1-141.7-95.5-55-23.3-113.4-35-173.5-35-60.2 0-118.6 11.8-173.5 35-53.1 22.5-100.8 54.6-141.7 95.5-40.9 40.9-73.1 88.6-95.5 141.7-23.3 55-35 113.4-35 173.5 0 60.2 11.8 118.6 35 173.5 22.5 53.1 54.6 100.8 95.5 141.7 40.9 40.9 88.6 73.1 141.7 95.5 55 23.3 113.4 35 173.5 35 60.2 0 118.6-11.8 173.5-35 53.1-22.5 100.8-54.6 141.7-95.5 40.9-40.9 73.1-88.6 95.5-141.7 23.3-55 35-113.4 35-173.5 0-60.2-11.8-118.6-35-173.5zM512 907.8c-218.3 0-395.8-177.6-395.8-395.8 0-218.3 177.6-395.8 395.8-395.8 218.3 0 395.8 177.6 395.8 395.8 0 218.3-177.5 395.8-395.8 395.8z"
                      fill="#eade02" p-id="26101"></path>
                    <path
                      d="M512 192.8c-85.3 0-165.4 33.2-225.7 93.5S192.8 426.7 192.8 512s33.2 165.4 93.5 225.7 140.4 93.5 225.7 93.5 165.4-33.2 225.7-93.5 93.5-140.4 93.5-225.7-33.2-165.4-93.5-225.7-140.4-93.5-225.7-93.5z m0 588.4c-148.4 0-269.2-120.8-269.2-269.2S363.6 242.8 512 242.8 781.2 363.6 781.2 512 660.4 781.2 512 781.2z"
                      fill="#eade02" p-id="26102"></path>
                    <path
                      d="M611.4 351.5L509.2 453.6l-98.9-98.9c-9.8-9.8-25.6-9.8-35.4 0-9.8 9.8-9.8 25.6 0 35.4l80.1 80.1h-50.5c-13.8 0-25 11.2-25 25s11.2 25 25 25h79.3v48.5h-79.3c-13.8 0-25 11.2-25 25s11.2 25 25 25h79.3v60.7c0 13.8 11.2 25 25 25s25-11.2 25-25v-60.7H617c13.8 0 25-11.2 25-25s-11.2-25-25-25h-83.2v-48.5H617c13.8 0 25-11.2 25-25s-11.2-25-25-25h-53.8l83.4-83.4c9.8-9.8 9.8-25.6 0-35.4-9.6-9.7-25.5-9.7-35.2 0.1z"
                      fill="#eade02" p-id="26103"></path>
                  </svg>
                </template>
                <template #svgmove>
                  <svg t="1686984083187" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="26100" width="45" height="45">
                    <path
                      d="M922.8 338.5c-22.5-53.1-54.6-100.8-95.5-141.7-40.9-40.9-88.6-73.1-141.7-95.5-55-23.3-113.4-35-173.5-35-60.2 0-118.6 11.8-173.5 35-53.1 22.5-100.8 54.6-141.7 95.5-40.9 40.9-73.1 88.6-95.5 141.7-23.3 55-35 113.4-35 173.5 0 60.2 11.8 118.6 35 173.5 22.5 53.1 54.6 100.8 95.5 141.7 40.9 40.9 88.6 73.1 141.7 95.5 55 23.3 113.4 35 173.5 35 60.2 0 118.6-11.8 173.5-35 53.1-22.5 100.8-54.6 141.7-95.5 40.9-40.9 73.1-88.6 95.5-141.7 23.3-55 35-113.4 35-173.5 0-60.2-11.8-118.6-35-173.5zM512 907.8c-218.3 0-395.8-177.6-395.8-395.8 0-218.3 177.6-395.8 395.8-395.8 218.3 0 395.8 177.6 395.8 395.8 0 218.3-177.5 395.8-395.8 395.8z"
                      fill="#e6e6e6" p-id="26101"></path>
                    <path
                      d="M512 192.8c-85.3 0-165.4 33.2-225.7 93.5S192.8 426.7 192.8 512s33.2 165.4 93.5 225.7 140.4 93.5 225.7 93.5 165.4-33.2 225.7-93.5 93.5-140.4 93.5-225.7-33.2-165.4-93.5-225.7-140.4-93.5-225.7-93.5z m0 588.4c-148.4 0-269.2-120.8-269.2-269.2S363.6 242.8 512 242.8 781.2 363.6 781.2 512 660.4 781.2 512 781.2z"
                      fill="#e6e6e6" p-id="26102"></path>
                    <path
                      d="M611.4 351.5L509.2 453.6l-98.9-98.9c-9.8-9.8-25.6-9.8-35.4 0-9.8 9.8-9.8 25.6 0 35.4l80.1 80.1h-50.5c-13.8 0-25 11.2-25 25s11.2 25 25 25h79.3v48.5h-79.3c-13.8 0-25 11.2-25 25s11.2 25 25 25h79.3v60.7c0 13.8 11.2 25 25 25s25-11.2 25-25v-60.7H617c13.8 0 25-11.2 25-25s-11.2-25-25-25h-83.2v-48.5H617c13.8 0 25-11.2 25-25s-11.2-25-25-25h-53.8l83.4-83.4c9.8-9.8 9.8-25.6 0-35.4-9.6-9.7-25.5-9.7-35.2 0.1z"
                      fill="#e6e6e6" p-id="26103"></path>
                  </svg>
                </template>
              </card>
            </el-col>
            <el-col :span="8">
              <card :value="cardInfo.avgRecency" label="平均最近消费日期" background="#1296db" :is-num="true" to-fixed="0"
                suffix="天">
                <template #svgLeave>
                  <svg t="1686984267174" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="29251" width="45" height="45">
                    <path
                      d="M512 127c-212.19 0-384.2 172-384.2 384.2s172 384.2 384.2 384.2 384.2-172 384.2-384.2S724.16 127 512 127z m0 722.31c-186.73 0-338.1-151.37-338.1-338.1S325.24 173.1 512 173.1s338.1 151.37 338.1 338.1S698.7 849.3 512 849.3z"
                      fill="#1296db" p-id="29252"></path>
                    <path
                      d="M546.55 320.1a20 20 0 0 0-20 20v180.4H349.08A23.12 23.12 0 0 0 326 543.55a23.12 23.12 0 0 0 23.05 23.05h192.51a22.89 22.89 0 0 0 5.32-0.63 20 20 0 0 0 19.65-20V340.09a20 20 0 0 0-19.98-19.99z"
                      fill="#1296db" p-id="29253"></path>
                  </svg>
                </template>
                <template #svgmove>
                  <svg t="1686984267174" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="29251" width="45" height="45">
                    <path
                      d="M512 127c-212.19 0-384.2 172-384.2 384.2s172 384.2 384.2 384.2 384.2-172 384.2-384.2S724.16 127 512 127z m0 722.31c-186.73 0-338.1-151.37-338.1-338.1S325.24 173.1 512 173.1s338.1 151.37 338.1 338.1S698.7 849.3 512 849.3z"
                      fill="#e6e6e6" p-id="29252"></path>
                    <path
                      d="M546.55 320.1a20 20 0 0 0-20 20v180.4H349.08A23.12 23.12 0 0 0 326 543.55a23.12 23.12 0 0 0 23.05 23.05h192.51a22.89 22.89 0 0 0 5.32-0.63 20 20 0 0 0 19.65-20V340.09a20 20 0 0 0-19.98-19.99z"
                      fill="#e6e6e6" p-id="29253"></path>
                  </svg>
                </template>
              </card>
            </el-col>
            <el-col :span="7">
              <card :value="cardInfo.avgFrequency" label="用户群平均消费频率" background="#d4172c" :is-num="true" to-fixed="0"
                suffix="次">
                <template #svgLeave>
                  <svg t="1686984182013" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="27761" width="45" height="45">
                    <path
                      d="M658.285714 0m43.885715 0l277.942857 0q43.885714 0 43.885714 43.885714l0 0q0 43.885714-43.885714 43.885715l-277.942857 0q-43.885714 0-43.885715-43.885715l0 0q0-43.885714 43.885715-43.885714Z"
                      fill="#d4172c" p-id="27762"></path>
                    <path
                      d="M658.285714 197.485714m43.885715 0l277.942857 0q43.885714 0 43.885714 43.885715l0 0q0 43.885714-43.885714 43.885714l-277.942857 0q-43.885714 0-43.885715-43.885714l0 0q0-43.885714 43.885715-43.885715Z"
                      fill="#d4172c" p-id="27763"></path>
                    <path
                      d="M0 477.622857m43.885714 0l190.171429 0q43.885714 0 43.885714 43.885714l0 0q0 43.885714-43.885714 43.885715l-190.171429 0q-43.885714 0-43.885714-43.885715l0 0q0-43.885714 43.885714-43.885714Z"
                      fill="#d4172c" p-id="27764"></path>
                    <path
                      d="M746.057143 631.954286m43.885714 0l190.171429 0q43.885714 0 43.885714 43.885714l0 0q0 43.885714-43.885714 43.885714l-190.171429 0q-43.885714 0-43.885714-43.885714l0 0q0-43.885714 43.885714-43.885714Z"
                      fill="#d4172c" p-id="27765"></path>
                    <path
                      d="M173.601394 537.75186m21.942857-38.006143l175.542857-304.049148q21.942857-38.006143 59.949001-16.063286l0 0q38.006143 21.942857 16.063286 59.949l-175.542857 304.049148q-21.942857 38.006143-59.949001 16.063286l0 0q-38.006143-21.942857-16.063286-59.949Z"
                      fill="#d4172c" p-id="27766"></path>
                    <path
                      d="M441.554934 162.948034m11.358459 42.390344l204.452256 763.026207q11.358459 42.390345-31.031886 53.748804l0 0q-42.390345 11.358459-53.748804-31.031886l-204.452256-763.026207q-11.358459-42.390345 31.031886-53.748804l0 0q42.390345-11.358459 53.748804 31.031886Z"
                      fill="#d4172c" p-id="27767"></path>
                    <path
                      d="M554.694574 995.755459m21.942858-38.006144l175.542857-304.049147q21.942857-38.006143 59.949-16.063287l0 0q38.006143 21.942857 16.063287 59.949001l-175.542858 304.049147q-21.942857 38.006143-59.949 16.063287l0 0q-38.006143-21.942857-16.063286-59.949001Z"
                      fill="#d4172c" p-id="27768"></path>
                  </svg>
                </template>
                <template #svgmove>
                  <svg t="1686984182013" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="27761" width="45" height="45">
                    <path
                      d="M658.285714 0m43.885715 0l277.942857 0q43.885714 0 43.885714 43.885714l0 0q0 43.885714-43.885714 43.885715l-277.942857 0q-43.885714 0-43.885715-43.885715l0 0q0-43.885714 43.885715-43.885714Z"
                      fill="#e6e6e6" p-id="27762"></path>
                    <path
                      d="M658.285714 197.485714m43.885715 0l277.942857 0q43.885714 0 43.885714 43.885715l0 0q0 43.885714-43.885714 43.885714l-277.942857 0q-43.885714 0-43.885715-43.885714l0 0q0-43.885714 43.885715-43.885715Z"
                      fill="#e6e6e6" p-id="27763"></path>
                    <path
                      d="M0 477.622857m43.885714 0l190.171429 0q43.885714 0 43.885714 43.885714l0 0q0 43.885714-43.885714 43.885715l-190.171429 0q-43.885714 0-43.885714-43.885715l0 0q0-43.885714 43.885714-43.885714Z"
                      fill="#e6e6e6" p-id="27764"></path>
                    <path
                      d="M746.057143 631.954286m43.885714 0l190.171429 0q43.885714 0 43.885714 43.885714l0 0q0 43.885714-43.885714 43.885714l-190.171429 0q-43.885714 0-43.885714-43.885714l0 0q0-43.885714 43.885714-43.885714Z"
                      fill="#e6e6e6" p-id="27765"></path>
                    <path
                      d="M173.601394 537.75186m21.942857-38.006143l175.542857-304.049148q21.942857-38.006143 59.949001-16.063286l0 0q38.006143 21.942857 16.063286 59.949l-175.542857 304.049148q-21.942857 38.006143-59.949001 16.063286l0 0q-38.006143-21.942857-16.063286-59.949Z"
                      fill="#e6e6e6" p-id="27766"></path>
                    <path
                      d="M441.554934 162.948034m11.358459 42.390344l204.452256 763.026207q11.358459 42.390345-31.031886 53.748804l0 0q-42.390345 11.358459-53.748804-31.031886l-204.452256-763.026207q-11.358459-42.390345 31.031886-53.748804l0 0q42.390345-11.358459 53.748804 31.031886Z"
                      fill="#e6e6e6" p-id="27767"></path>
                    <path
                      d="M554.694574 995.755459m21.942858-38.006144l175.542857-304.049147q21.942857-38.006143 59.949-16.063287l0 0q38.006143 21.942857 16.063287 59.949001l-175.542858 304.049147q-21.942857 38.006143-59.949 16.063287l0 0q-38.006143-21.942857-16.063286-59.949001Z"
                      fill="#e6e6e6" p-id="27768"></path>
                  </svg>
                </template>
              </card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <ageRing height="240px" ref="ageRingRef"></ageRing>
          <genderPies height="240px" ref="genderPiesRef"></genderPies>
        </el-col>
        <el-col :span="11">
          <Map height="640px" @change="mapChange" @complete="mapComplete" @loadMapData="loadMapData"></Map>
        </el-col>
        <el-col :span="5">
          <clvInfoCards height="560px" ref="clvInfoCardsRef" @update="cardInfoUpdate"></clvInfoCards>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <diffChange height="400px" ref="diffChangeRef"></diffChange>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <timePeried height="400px" ref="timePeriedRef"></timePeried>
        </el-col>
      </el-row>
    </template>
  </Layout>
</template>

<script setup>
import rfmSelect from "@/components/echarts/commen/rfmSelect.vue";
import Layout from "@/layout/Layout.vue";
import { get } from "@/utils/axiosConfig/axios";
import { nextTick, onMounted, ref, watch } from "vue";
import ageRing from "@/components/echarts/picGroup/ageRing.vue";
import diffChange from "@/components/echarts/picGroup/diffChange.vue";
import timePeried from "@/components/echarts/picGroup/timePeried.vue";
import genderPies from "@/components/echarts/picGroup/genderPies.vue";
import { ElLoading } from "element-plus";
import clvInfoCards from "@/components/echarts/picGroup/clvInfoCards.vue";
import { setCardInfoConfig } from "@/utils/js/echartsConfig/picGroup/cardInfoConfig";
import { question as questionGPT } from "@/utils/js/gpt.js";
import {
  render,
  getBase64,
  resizeBase64,
} from "@/utils/js/generateReport/render";
let addressBind;
const diffChangeRef = ref();
const clvInfoCardsRef = ref();
const timePeriedRef = ref();
const genderPiesRef = ref();
const analysisVisible = ref(false);
const ageRingRef = ref();
const timeDisabled = ref(true);
const model = ref("1");
const rfm = ref("重要价值客户");
const load = ref(true);
const cardInfo = ref({
  avgFrequency: 0,
  avgConsumption: 0,
  avgRecency: 0,
});

const forecastGPT = ref({
  avgLoss: 0.0,
  sumPrice: 0.0,
  avgBack: 0.0,
  avgdiff: 0.0,
  personal_avg: 0,
});
const modelChange = (val) => {
  clvInfoCardsRef.value.chartDraw(addressBind, val, rfm.value);
  genderPiesRef.value.chartDraw(addressBind, val, rfm.value);
  ageRingRef.value.chartDraw(addressBind, val, rfm.value);
  diffChangeRef.value.chartDraw(addressBind, val, rfm.value);
  timePeriedRef.value.chartDraw(addressBind, val, rfm.value);
  loadCardInfo();
};
const rfmChange = (val) => {
  rfm.value = val;
  clvInfoCardsRef.value.chartDraw(addressBind, model.value, rfm.value);
  genderPiesRef.value.chartDraw(addressBind, model.value, rfm.value);
  ageRingRef.value.chartDraw(addressBind, model.value, rfm.value);
  diffChangeRef.value.chartDraw(addressBind, model.value, rfm.value);
  timePeriedRef.value.chartDraw(addressBind, model.value, rfm.value);
  loadCardInfo();
};
// 地图加载完成
const mapComplete = () => {
  timeDisabled.value = false;
};

// 加载地图数据，alldata填充数据，callback一定要返回填充后的alldata，mychart为charts实例
const loadMapData = (tNameFormat, tName, allData, myChart, callback) => {
  get({
    url: "/user-act-count/getTotalOrder",
    params: {
      address: tNameFormat,
    },
  }).then((data) => {
    myChart.showLoading({
      text: "正在加载" + tName + "的数据中...",
      color: "#4cbbff",
      textColor: "#4cbbff",
      maskColor: "rgba(0, 0, 0, 0.39)",
    });
    allData.push({
      name: tName,
      value: data[tNameFormat] == null ? 0 : data[tNameFormat],
    });
    callback(allData);
  });
};

const mapChange = (address, level) => {
  address = address == "全国" ? null : address;
  addressBind = address;
  clvInfoCardsRef.value.chartDraw(address, model.value, rfm.value);
  ageRingRef.value.chartDraw(address, model.value, rfm.value);
  diffChangeRef.value.chartDraw(address, model.value, rfm.value);
  timePeriedRef.value.chartDraw(address, model.value, rfm.value);
  loadCardInfo();
  if (level != 3) {
    genderPiesRef.value.chartDraw(address, model.value, rfm.value, level);
  }
};

const loadCardInfo = () => {
  load.value = true;
  get({
    url: "/getAvg",
    params: {
      address: addressBind,
      tag: rfm.value,
      time: model.value,
    },
  })
    .then((res) => {
      load.value = false;
      cardInfo.value = res;
    })
    .catch((err) => {
      load.value = false;
    });
};

const docxUpload = () => {
  document.getElementById("module").click();
};

const docxChange = (e) => {
  if (e.target.files[0] == null) {
    return;
  }
  const loading = ElLoading.service({
    lock: true,
    text: "导出中...",
    background: "rgba(0, 0, 0, 0.7)",
  });
  let proc = [];
  proc.push(
    new Promise((resolve, reject) => {
      loading.setText("正在获取用户性别/年龄分布...");
      let [echart, data] = ageRingRef.value.getEcharts();
      getBase64(echart, {
        maxHeight: 325,
        maxWidth: 670,
      })
        .then((base64) => {
          resolve({
            name: "ageRingRef",
            value: base64,
            data: data,
          });
        })
        .catch((err) => {
          resolve({
            name: "ageRingRef",
            value: "default",
            data: [],
          });
        });
    })
  );

  proc.push(
    new Promise((resolve, reject) => {
      loading.setText("正在预测用户信息...");
      let type = [1, 7, 14, 30, 60],
        tProc = [];
      type.forEach((e) => {
        tProc.push(
          new Promise((resolve1, reject1) => {
            setCardInfoConfig(addressBind, model.value, rfm.value, e).then(
              (res) => {
                resolve1({
                  time_window: e,
                  data: res,
                });
              }
            );
          })
        );
      });
      let forecastT = [];
      Promise.all(tProc).then((res) => {
        res.forEach((e) => {
          forecastT.push({
            sumPrice: parseFloat(e.data.sumPrice).toFixed(2),
            price: parseFloat(e.data.personal_avg).toFixed(2),
            loss: parseFloat(e.data.avgLoss).toFixed(2),
            back: parseFloat(e.data.avgBack).toFixed(2),
            time_window: e.time_window,
          });
        });

        resolve({
          name: "forecast",
          value: forecastT,
        });
      });
    })
  );
  Promise.all(proc).then(async (procData) => {
    let images = {
      calendarRef: {
        base64: null,
        userActionTable: [],
      },
      ageRingRef: {
        base64: null,
        description: "",
      },
      forecast: [],
    };
    for (let data of procData) {
      switch (data.name) {
        case "ageRingRef":
          data.data.age.sort((a, b) => b.value - a.value);
          data.data.gender.sort((a, b) => b.value - a.value);
          let age = data.data.age,
            gender = data.data.gender;
          let question = `你是一个用户分析专家，请为我分析一个用户群，他们的男性为${gender[0].value
            }人,女性为${gender[1].value}人，用户群年龄json数组为${JSON.stringify(
              age
            )}`;

          images.ageRingRef.base64 = data.value;
          var res = await questionGPT(question);
          images.ageRingRef.description = res;
          break;
        case "forecast":
          images.forecast = data.value;
          break;
      }
    }
    render(
      e.target.files[0],
      {
        consumption: cardInfo.value.avgConsumption,
        recency:  cardInfo.value.avgRecency,
        frequency:  cardInfo.value.avgFrequency,
        ageImg: images.ageRingRef.base64,
        ageDescribtioon: images.ageRingRef.description,
        forecast: images.forecast,
      },
      loading
    );
    loading.close();
  });
};

const cardInfoUpdate = (info) => {
  forecastGPT.value = info;
};

onMounted(() => {
  loadCardInfo();
});
</script>

<style scoped>
/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}

/deep/ input[type="number"] {
  -moz-appearance: textfield !important;
}

#module {
  opacity: 0;
  width: 0px;
}

button {
  color: #3280da;
  border: #3280da 1px solid;
  padding: 1px 6px 1px;
  font-size: 0.1rem;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
}
</style>
