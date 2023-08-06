<template>
    <div>
        <h4 style="margin-top:20px;margin-bottom:20px  ">{{ title }}</h4>
        <el-table :data="tableData" :default-sort="{ prop: 'user', order: null }" style="width: 100%" v-loading="loading"
            @sort-change="sortChange" @current-change="handleRowChange">
            <el-table-column prop="user" label="用户ID" sortable="custom" width="140" />
            <el-table-column prop="gender" label="性别" width="180" />
            <el-table-column prop="age" sortable="custom" label="年龄" width="180" />
            <el-table-column prop="actDate" label="操作日期" width="180" />
            <el-table-column prop="actTime" label="操作时间" width="200" />
            <el-table-column prop="actType" sortable="custom" label="交易类型" width="180" />
            <el-table-column prop="sku" label="商品ID" width="200" />
            <el-table-column prop="price" sortable="custom" label="商品价格" width="180" />
            <el-table-column label="地址">
                <el-table-column prop="province" label="省份" width="120" />
                <el-table-column prop="city" label="城市" width="120" />
                <el-table-column prop="county" label="乡县" />
            </el-table-column>
        </el-table>
        <el-pagination style="margin-top: 20px" hide-on-single-page background layout="sizes,prev, pager, next,total"
            :total="total" v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="pageSizes"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="prevClick"
            @next-click="nextClick" />
    </div>
</template>

<script setup>
import { get, post } from "@/utils/axiosConfig/axios";
import Layout from "@/layout/Layout.vue";
import { ref, onMounted, defineProps } from "vue";

const props = defineProps({
    api: {
        type: String,
        default: "streaming-user-act",
    },
    title: {
        type: String,
        default: "存量更新详情"
    },
    pageSizes: {
        type: Array,
        default: [100, 200, 300, 400]
    },
    update: {
        type: Boolean,
        default: false
    }
});

let sortKey = {
    user: "user",
    actTime: "act_time",
    age: "age",
    price: "price",
    address: "address",
    actType: "act_type",
};

const loading = ref(true);
const tableData = ref();
const pageSize = ref(props.pageSizes[0]);
const total = ref(0);
const currentPage = ref(1);
const sort = ref({
    column: "user",
    asc: true,
});

const handleSizeChange = () => {
    getTableData();
};
const handleCurrentChange = () => {
    getTableData();
};

const tableRowClassName = ({ row: row, rowIndex: number }) => {
    if (row.actType == 1) {
        return "view";
    } else if (row.actType == 2) {
        return "buy";
    } else if (row.actType == 3) {
        return "fan";
    } else if (row.actType == 4) {
        return "comment";
    } else if (row.actType == 5) {
        return "cart";
    } else if (row.actType == 7) {
        return "complaint";
    } else if (row.actType == 6) {
        return "consult";
    } else return "consult";
};

const sortChange = (val) => {
    let asc = val.order == "ascending" ? true : false;
    sort.value = {
        column: sortKey[val.prop],
        asc: asc,
    };
    getTableData();
};
const handleRowChange = (val) => {
    router.push({
        name: "basePersonal",
        query: {
            id: val.userId,
        },
    });
};

const getTableData = () => {
    loading.value = true;
    get({
        url: encodeURI(
            `/${props.api}/page?` +
            `orders[0].asc=${sort.value.asc}&orders[0].column=${sort.value.column}`
        ),
        params: {
            current: currentPage.value,
            size: pageSize.value,
        },
    }).then((res) => {
        tableData.value = res.rows.map((e) => {
            e.actDate = e.actDate.join("-");
            e.actTime = e.actTime.join(":");
            return e;
        });
        total.value = res.total;
        loading.value = false;
    });
};

onMounted(async () => {
    getTableData();
    if(props.update){
        setInterval(() => {
            getTableData();
        }, 5000);
    }
});
</script>

<style lang="" scoped>
</style>