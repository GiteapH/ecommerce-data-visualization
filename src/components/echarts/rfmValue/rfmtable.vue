<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-06-30 12:27:45
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-07-01 20:25:24
 * @FilePath: \vue-web\src\components\echarts\rfmValue\rfmtable.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by GiteapH 1046664571@qq.com, All Rights Reserved. 
-->
<template>
    <div>
        <echartDecoration :title="title">
            <template #interactive>
                <rfmSelect @change="rfmChange" />
            </template>

            <el-table :data="tableData" :default-sort="{ prop: 'userId', order: null }" style="width: 100%" v-loading="loading" @sort-change="sortChange"
                @current-change="handleRowChange">
                <el-table-column prop="userId" label="用户ID" sortable="custom" width="140" />
                <el-table-column prop="gender" label="性别" width="180" />
                <el-table-column prop="rfmTag" label="群标签" width="180" />
                <el-table-column prop="consumptionCapacityNum" sortable="custom" label="累计消费" width="200" />
                <el-table-column prop="frequencyNum" sortable="custom" label="交易频率" width="180" />
                <el-table-column prop="recencyNum" sortable="custom" label="距离上次交易天数" width="180" />
                <el-table-column prop="consumptionCapacity" label="累计消费评分" width="200" />
                <el-table-column prop="frequency" label="交易频率评分" width="180" />
                <el-table-column prop="recency" label="距离上次交易天数评分" width="180" />
                <el-table-column label="地址" sortable="custom" :formatter="formatter">
                    <template #default="scope">
                        <p>{{ `${scope.row.province}${scope.row.city}${scope.row.county}` }}</p>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="margin-top:20px" hide-on-single-page background layout="sizes,prev, pager, next,total"
                :total="total" v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[100, 200, 300, 400]" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                @prev-click="prevClick" @next-click="nextClick" />
        </echartDecoration>
    </div>
</template>

<script setup>
import echartDecoration from '../../utils/echartDecoration.vue';
import { onMounted, getCurrentInstance, ref } from 'vue';
import { get } from '@/utils/axiosConfig/axios'
import rfmSelect from '@/components/echarts/commen/rfmSelect.vue'
import router from '@/router';
const { proxy } = getCurrentInstance()
let sortKey = {
    userId:'b.user_id',
    consumptionCapacityNum:'consumption_capacity_num',
    frequencyNum:"frequency_num",
    recencyNum:"recency_num",
    address:"address"

}
const loading = ref(true)
const title = ref('国内用户群详细人员')
const tableData = ref()
const pageSize = ref(100)
const total = ref(0)
const currentPage = ref(1)
let addressBind = null, rfmBind = '重要价值客户', timeBind = 1,sort = {
    asc:true,
    column:'b.user_id'
}

const handleSizeChange = () => {
    getTableData(addressBind,timeBind)
}
const handleCurrentChange = () => {
    getTableData(addressBind,timeBind)
}

const sortChange = (val)=>{
    let asc = val.order == 'ascending'?true:false
    sort = {
        column:sortKey[val.prop],
        asc:asc
    }
    getTableData(addressBind,timeBind)
}
const handleRowChange = (val) => {
    
    router.push({
        name: 'basePersonal',
        query: {
            id: val.userId
        }
    })
}
const prevClick = () => {

}
const nextClick = () => {

}
const rfmChange = (val) => {
    rfmBind = val

}
const getTableData = (address, time = 1) => {
    loading.value = true
    get({
        url: encodeURI('/page?'+`orders[0].asc=${sort.asc}&orders[0].column=${sort.column}`),
        params: {
            current: currentPage.value,
            rfmTag: rfmBind,
            address: address,
            size: pageSize.value,
            time: time
        }
    }).then(res => {
        tableData.value = res.rows
        total.value = res.total
        loading.value = false
    })
}


onMounted(() => {
    getTableData(addressBind, timeBind)

})

defineExpose({

})

</script>

<style scoped></style>