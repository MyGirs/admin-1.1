<template>
  <div class="page">
    <ContentWrap class="mb-20">
      <el-form class="page-query" label-width="170px">
        <el-col :xl="6" :lg="8" :md="12" :sm="12" :xs="24">
          <el-form-item label="检查地点存在问题及隐患">
            <el-input v-model="requestData.problem" />
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12" :sm="12" :xs="24">
          <el-form-item label="完成情况">
            <el-select
              v-model="requestData.completeSituation"
              placeholder="Select"
            >
              <el-option label="全部" value="" />
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12" :sm="12" :xs="24">
          <el-form-item label="隐患等级">
            <el-select v-model="requestData.grade" placeholder="Select">
              <el-option label="全部" value="" />
              <el-option
                v-for="item in gradeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12" :sm="12" :xs="24">
          <div class="page-button">
            <el-button type="primary" @click="getResponseData">查询</el-button>
            <el-button type="success" @click="handleAdd">新增</el-button>
          </div>
        </el-col>
      </el-form>
    </ContentWrap>
    <ContentWrap title="事故隐患排查治理台账列表">
      <el-table v-loading="loading" :data="responseData.list" height="400">
        <el-table-column
          prop="problem"
          min-width="180px"
          show-overflow-tooltip
          label="检查地点存在问题及隐患"
        />
        <el-table-column prop="grade" min-width="100px" label="隐患等级">
          <template #default="{ row }">
            {{ setMapLabel("grade", row.grade) }}
          </template>
        </el-table-column>
        <el-table-column prop="type" min-width="180px" label="隐患类型" />
        <el-table-column
          prop="inspectTime"
          min-width="180px"
          label="排查日期"
        />
        <el-table-column
          prop="inspectUser"
          min-width="100px"
          label="排查人员"
        />
        <el-table-column
          prop="rectificationMeasures"
          min-width="150px"
          show-overflow-tooltip
          label="整改措施"
        />
        <el-table-column
          prop="rectificationTime"
          min-width="180px"
          label="整改时限"
        />
        <el-table-column
          prop="rectificationMoney"
          min-width="100px"
          label="整改金钱"
        />
        <el-table-column label="整改单位及责任人" min-width="150px">
          <template #default="{ row }"
            >{{ setMapLabel("riskDescription", row.rectificationUnit) }}
            {{
              row.rectificationPeople ? "-" + row.rectificationPeople : ""
            }}</template
          >
        </el-table-column>
        <el-table-column label="完成情况及验收人" min-width="150px">
          <template #default="{ row }"
            >{{ row.completeSituation == "1" ? "已完成" : "处理中"
            }}{{
              row.acceptancePerson ? "-" + row.acceptancePerson : ""
            }}</template
          >
        </el-table-column>
        <el-table-column label="督办单位及人员" min-width="150px">
          <template #default="{ row }"
            >{{ setMapLabel("supervision", row.supervisionUnit) }}
            {{
              row.supervisionPerson ? "-" + row.supervisionPerson : ""
            }}</template
          >
        </el-table-column>
        <el-table-column prop="cancelTime" min-width="180px" label="销号日期" />
        <el-table-column fixed="right" label="操作" width="80">
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="openDialog(row)"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="sizes,prev, pager, next"
        :total="responseData.total"
        :page-sizes="[10, 20, 30, 50]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </ContentWrap>
    <accidentDialog
      v-if="dialogVisible"
      v-model:dialogVisible="dialogVisible"
      :selectRow="selectRow"
      :gradeList="gradeList"
      :riskDescriptionMap="riskDescriptionMap"
      :supervisionMap="supervisionMap"
      @submit="getResponseData"
    />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, reactive, onMounted } from "vue";

import { ContentWrap } from "@/components/ContentWrap";
import accidentDialog from "./components/accident-dialog.vue";
import { getAdministerList, getMapApi } from "./api";
import { types } from "./commonField";
const loading = ref(false);
const requestData = reactive({
  pagesize: 10,
  pagenum: 1,
  problem: "",
  completeSituation: "",
  grade: ""
});
const responseData = reactive({
  list: [],
  total: 0
});
const handleSizeChange = (val: number) => {
  requestData.pagesize = val;
  getResponseData();
};
const handleCurrentChange = (val: number) => {
  requestData.pagenum = val;
  getResponseData();
};
const getResponseData = async () => {
  loading.value = true;
  try {
    let res = await getAdministerList(requestData);
    responseData.list = res.data;
    responseData.total = res.total;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    responseData.list = [];
    responseData.total = 0;
  }
};
const dialogVisible = ref(false);
const selectRow = ref();
const openDialog = row => {
  selectRow.value = row;
  dialogVisible.value = true;
};
const Router = useRouter();
const handleAdd = () => {
  Router.push({
    path: "accidentAdministerAdd"
  });
};
const gradeList = ref([]);
const riskDescriptionMap = ref([]);
const supervisionMap = ref([]);
const getMap = async () => {
  const { data } = await getMapApi();
  gradeList.value = data.gradeMap;
  riskDescriptionMap.value = data.riskDescriptionMap;
  supervisionMap.value = data.supervisionMap;
};
const setMapLabel = (type, value) => {
  let item = "";
  if (type == "grade") {
    item = gradeList.value.find(item => item.value == value);
  }
  if (type == "riskDescription") {
    item = riskDescriptionMap.value.find(item => item.value == value);
  }
  if (type == "supervision") {
    item = supervisionMap.value.find(item => item.value == value);
  }
  return item?.["label"] || "--";
};

onMounted(async () => {
  await getMap();
  await getResponseData();
});
</script>
<style scoped>
.mb-20 {
  margin-bottom: 20px;
}

.page-query {
  display: flex;
  flex-wrap: wrap;

  .el-form-item {
    margin-bottom: 10px;

    .el-input,
    .el-select {
      max-width: 300px !important;
    }
  }

  .page-button {
    text-align: end;
  }
}

.el-table {
  min-height: 200px;
}

.el-pagination {
  margin-top: 10px;
}
</style>
