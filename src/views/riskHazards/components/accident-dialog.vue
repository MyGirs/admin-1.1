<template>
  <el-dialog
    :model-value="dialogVisible"
    title="详情"
    width="90%"
    :before-close="handleClose"
  >
    <el-switch v-model="isUpdate" inactive-text="是否修改"> </el-switch>
    <el-form label-width="170" class="dialog-form">
      <el-col
        :xl="10"
        :lg="10"
        :md="12"
        :sm="12"
        :xs="24"
        v-for="(item, index) in optionsList"
        :key="index"
      >
        <el-form-item :label="item.label">
          <el-input
            v-if="item.type == 'input'"
            :placeholder="item.tip || '请输入'"
            v-model="form[item.value]"
            :readonly="!isUpdate"
          ></el-input>
          <el-input
            type="textarea"
            v-if="item.type == 'textarea'"
            v-model="form[item.value]"
            :readonly="!isUpdate"
            :placeholder="item.tip || '请输入'"
          ></el-input>
          <el-date-picker
            style="width: 100%"
            :readonly="!isUpdate"
            v-if="item.type == 'time'"
            v-model="form[item.value]"
            type="datetime"
            :placeholder="item.tip || '请选择时间'"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
          <el-select
            v-if="item.type == 'select'"
            v-model="form[item.value]"
            :readonly="!isUpdate"
            :placeholder="item.tip || '请选择'"
          >
            <el-option
              v-for="item in item.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input-number
            :readonly="!isUpdate"
            v-if="item.type == 'number'"
            v-model="form[item.value]"
          />
        </el-form-item>
      </el-col>
    </el-form>
    <div class="dialog-button" v-loading="submitLoading">
      <el-button type="primary" v-if="isUpdate" @click="handleUpdate"
        >修改</el-button
      >
      <el-button @click="handleClose">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script setup>
import { reactive, ref, watch, markRaw, onBeforeMount } from "vue";
import { ElRow, ElCol, ElMessage } from "element-plus";

import { updateAdministerApi, getMapApi } from "../api";
import { getAccidentConfig } from "../commonField";
const props = defineProps({
  selectRow: {
    type: Object
  },
  dialogVisible: {
    type: Boolean
  },
  supervisionMap: {
    type: Array
  },
  gradeList: {
    type: Array
  },
  riskDescriptionMap: {
    type: Array
  }
});
const $emit = defineEmits(["submit", "update:dialogVisible"]);
const isUpdate = ref(false);
const submitLoading = ref(false);
const optionsList = ref([]);
const form = ref({});

// watch(
//   () => props.selectRow,
//   newVal => {
//     for (var key in newVal) {
//       form.value[key] = newVal[key];
//     }
//     isUpdate.value = false;
//   },
//   { deep: true, immediate: true }
// );

const handleUpdate = async () => {
  submitLoading.value = true;
  try {
    let res = await updateAdministerApi(form.value);
    ElMessage.success("修改成功");
    submitLoading.value = false;
    $emit("submit");
    handleClose();
  } catch (error) {
    submitLoading.value = false;
  }
};
const handleClose = () => {
  $emit("update:dialogVisible", false);
};
const getOptions = () => {
  optionsList.value = getAccidentConfig(
    props.gradeList,
    props.riskDescriptionMap,
    props.supervisionMap
  );
};

onBeforeMount(() => {
  getOptions();
  for (var key in props.selectRow) {
    form.value[key] = props.selectRow[key];
  }
  isUpdate.value = false;
});
</script>
<style scoped>
.dialog-form {
  margin-top: 20px;
  max-height: 400px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
}

.el-input,
.el-select,
.el-input-number {
  width: 100% !important;
}

.dialog-button {
  text-align: center;
  width: 100%;
}
</style>
