<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-08-13 12:42:46
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-13 16:08:46
 * @FilePath: \vue-web\src\components\echarts\rfmValue\scoreChange.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-button text bg @click="dialogVisible = true">近月指标变化</el-button>
        <el-dialog v-model="dialogVisible" title="近月指标变化" width="70%" :before-close="handleClose">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="RFM指标变化" name="1">
                    <el-descriptions title="距上月RFM指标变化" :column="1" border>
                        <el-descriptions-item label="R值">
                            <el-text>
                                {{scoreAvg.rsd}}
                                <el-icon v-if="scoreAvg.rsd > 0" color="red">
                                    <Top />
                                </el-icon>
                                <el-icon v-else color="green">
                                    <Bottom />
                                </el-icon>
                            </el-text>
                        </el-descriptions-item>
                        <el-descriptions-item label="F值">
                            {{ scoreAvg.fsd }}
                            <el-icon v-if="scoreAvg.fsd > 0" color="red">
                                <Top />
                            </el-icon>
                            <el-icon v-else color="green">
                                <Bottom />
                            </el-icon>
                        </el-descriptions-item>
                        <el-descriptions-item label="M值">
                            {{ scoreAvg.ccd }}
                            <el-icon v-if="scoreAvg.ccd > 0" color="red">
                                <Top />
                            </el-icon>
                            <el-icon v-else color="green">
                                <Bottom />
                            </el-icon>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-collapse-item>
                <el-collapse-item title="用户群人数变化" name="2">
                    <el-descriptions title="距上月用户群人数变化" :column="3" size="large">
                        <el-descriptions-item v-for="item in tagChange" :key="item" >
                            <template #label>
                                <el-text>
                                    {{item.beforeTag}}
                                    <el-icon color="blue">
                                        <Right />
                                    </el-icon>
                                    {{item.afterTag}}
                                </el-text>
                            </template>
                            <span style="font-weight:800;">{{item.count}}人</span>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-collapse-item>
                <el-collapse-item title="用户群增长情况" name="3">
                    <el-descriptions title="距上月用户群增长情况" :column="2" size="large">
                        <el-descriptions-item v-for="item in tagDec" :key="item" >
                            <template #label>
                                <el-text>
                                {{item.tag}}
                                </el-text>
                            </template>
                            <span style="font-weight:800;">
                                {{ `${item.diff > 0?'增长':'减少'} ${Math.abs(item.diff)}人`}}
                                <el-icon v-if="item.diff > 0" color="red">
                                    <Top />
                                </el-icon>
                                <el-icon v-else color="green">
                                    <Bottom />
                                </el-icon>
                            </span>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-collapse-item>
            </el-collapse>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">
                        关闭
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Top, Bottom,Right } from '@element-plus/icons-vue'
import { get } from '@/utils/axiosConfig/axios'
const dialogVisible = ref(false);
const activeName = ref('1')
const tagChange = ref([])
const tagDec = ref([])
const scoreAvg = ref({
    "ccd": 0,
    "rsd": 0,
    "fsd": 0
})

const handleClose = (done) => {
    dialogVisible.value = false;
}

const getTagChange = ()=>{
    get({
        url:'/change-calculate/tagChange'
    }).then(res=>{
        tagChange.value = res
    })
}

const getScoreAVG = ()=>{
    get({
        url:'/change-calculate/scoreAvg'
    }).then(res=>{
        scoreAvg.value = res
    })
}


const getTagDec = ()=>{
    get({
        url:'/change-calculate/tagDec'
    }).then(res=>{
        tagDec.value = res
    })
}

onMounted(()=>{
    getTagChange()
    getScoreAVG()
    getTagDec()
})
</script>

<style scoped></style>