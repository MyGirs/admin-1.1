<template>
  <ContentWrap :title="title">
    <el-form :model="form" label-width="100">
      <el-col :xl="10" :lg="10" :md="12" :sm="12" :xs="24" v-for="(item, index) in formItemList" :key="index">
        <el-form-item :label="item.label">
          <el-input v-if="item.type == 'input'" :placeholder="item.tip || '请输入'" v-model="form[item.value]"
            :readonly="isDetail"></el-input>
          <el-input type="textarea" v-if="item.type == 'textarea'" v-model="form[item.value]"
            :placeholder="item.tip || '请输入'" :readonly="isDetail"></el-input>

          <el-date-picker style="width: 100%" v-if="item.type == 'time'" v-model="form[item.value]"
            value-format="YYYY-MM-DD HH:mm:ss" type="datetime" :placeholder="item.tip || '请选择时间'" :readonly="isDetail" />

          <el-select v-if="item.type == 'select'" v-model="form[item.value]" :placeholder="item.tip || '请选择'"
            style="width: 100%">
            <el-option v-for="item in item.options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
      <div class="page-button" v-loading="submitLoading">
        <el-button type="primary" @click="handleAdd" v-if="!isDetail">确定</el-button>
        <el-button @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </ContentWrap>
</template>
<script setup>
import { ElButton, ElForm, ElInput, ElFormItem, ElDatePicker, ElMessage } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { ref, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { addStatistics } from '../api'

const router = useRouter()
const route = useRoute()
const submitLoading = ref(false)
let isDetail = ref(false)
let title = ref('新增处置记录')

let form = ref({
  morningPlan: '',
  morningSituation: '',
  centrePlan: '',
  centreSituation: '',
  eveningPlan: '',
  eveningSituation: '',
  totalPlan: '',
  totalSituation: ''
})
const formItemList = [
  {
    type: 'textarea',
    value: 'morningPlan',
    label: '早班计划',
    tip: '请输入早班计划'
  },
  {
    type: 'textarea',
    value: 'morningSituation',
    label: '早班完成情况',
    tip: '请输入早班完成情况'
  },
  {
    type: 'textarea',
    value: 'centrePlan',
    label: '中班计划',
    tip: '请输入中班计划'
  },
  {
    type: 'textarea',
    value: 'centreSituation',
    label: '中班完成情况',
    tip: '请输入中班完成情况'
  },
  {
    type: 'textarea',
    value: 'eveningPlan',
    label: '晚班计划',
    tip: '请输入晚班计划'
  },
  {
    type: 'textarea',
    value: 'eveningSituation',
    label: '晚班完成情况',
    tip: '请输入晚班完成情况'
  },
  {
    type: 'textarea',
    value: 'totalPlan',
    label: '合计计划',
    tip: '请输入合计计划'
  },
  {
    type: 'textarea',
    value: 'totalSituation',
    label: '合计完成情况',
    tip: '请输入合计完成情况'
  }
]
onBeforeMount(() => {
  let query = route.query
  if (query.type == 'detail') {
    isDetail.value = true
    title.value = '处置记录详情'
    let params = JSON.parse(query.row)
    for (var key in params) {
      form.value[key] = params[key]
    }
  }
})
const handleAdd = async () => {
  submitLoading.value = true
  try {
    let res = await addStatistics(form.value)
    if (res.code == 200) {
      ElMessage.success('新增成功')
      submitLoading.value = false
      handleBack()
    }
  } catch (error) {
    submitLoading.value = false
  }

}

const handleBack = () => {
  router.push({
    path: '/infor/produce-statistics'
  })
}
</script>

<style  scoped>
.el-form {
  display: flex;
  flex-wrap: wrap;
}

.el-col {
  margin-right: 10px;
}

.page-button {
  width: 100%;
  text-align: center;

  .el-button {
    width: 100px;
  }
}
</style>
