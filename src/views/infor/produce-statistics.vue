<template>
  <div>
    <ContentWrap class="mb-20">
      <el-button type="success" @click="handleAdd">新增</el-button>
    </ContentWrap>
    <ContentWrap title="生产统计表">
      <el-table v-loading="loading" :data="responseData.list" height="400">
        <el-table-column
          prop="morningPlan"
          label="早班计划"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="morningSituation"
          label="早班完成情况"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="centrePlan"
          label="中班计划"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="centreSituation"
          label="中班完成情况"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="eveningPlan"
          label="晚班计划"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="eveningSituation"
          label="晚班完成情况"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="totalPlan"
          label="合计计划"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="totalSituation"
          label="合计完成情况"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column fixed="right" label="操作" width="80">
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="openDetail(row)"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="responseData.pagenum"
        v-model:page-size="responseData.pagesize"
        layout="sizes,prev, pager, next"
        :total="responseData.total"
        :page-sizes="[10, 20, 30, 50]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </ContentWrap>
  </div>
</template>
<script setup lang="ts">
import { ElButton } from "element-plus";
import { ContentWrap } from "@/components/ContentWrap";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getStatisticsList } from "./api";

const loading = ref(false);

const responseData = reactive({
  list: [],
  total: 0,
  pagesize: 10,
  pagenum: 1,
  type: 1
});

const router = useRouter();

const handleSizeChange = (val: number) => {
  responseData.pagesize = val;
  getResponseData();
};
const handleCurrentChange = (val: number) => {
  responseData.pagenum = val;
  getResponseData();
};

onMounted(() => {
  getResponseData();
});

const getResponseData = async () => {
  loading.value = true;
  let res = await getStatisticsList({
    pagesize: responseData.pagesize,
    pagenum: responseData.pagenum
  });
  loading.value = false;
  if (res.code == 200) {
    responseData.list = res.data;
    responseData.total = res.total;
  } else {
    responseData.list = [];
    responseData.total = 0;
  }
};

const openDetail = row => {
  router.push({
    path: "/infor/add-produce-statistics",
    query: {
      type: "detail",
      row: JSON.stringify(row)
    }
  });
};

const handleAdd = () => {
  router.push("/infor/add-produce-statistics");
};
</script>
<style scoped>
.mb-20 {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.el-pagination {
  margin-top: 10px;
}
</style>
