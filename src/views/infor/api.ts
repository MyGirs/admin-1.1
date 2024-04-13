import HttpClient from "@/utils/http";

const baseURL = "api/services/app/SafetyQualityStandardization";
// 值班记录列表查询
const getDutyList = (data): Promise<any> => {
  return HttpClient({
    url: baseURL + "/getDutyRecord",
    method: "get",
    params: data
  });
};
// 值班记录新增
const addDuty = (data): Promise<any> => {
  return HttpClient({
    url: baseURL + "/addDutyRecord",
    method: "post",
    data
  });
};
// 处置记录列表查询
const getDisposeList = (data): Promise<any> => {
  return HttpClient({
    url: baseURL + "/getDisposeRecord",
    method: "get",
    params: data
  });
};
// 处置记录新增
const addDispose = (data): Promise<any> => {
  return HttpClient({
    url: baseURL + "/addDisposeRecord",
    method: "post",
    data
  });
};
// 处置记录部门列表
const getOrgList = (): Promise<any> => {
  return HttpClient({
    url: baseURL + "/getDep",
    method: "get"
  });
};
// 生产记录列表查询
const getProductList = (data): Promise<any> => {
  return HttpClient({
    url: baseURL + "/getProduceRecord",
    method: "get",
    params: data
  });
};
// 生产记录新增
const addProduct = (data): Promise<any> => {
  return HttpClient({
    url: baseURL + "/addProduceRecord",
    method: "post",
    data
  });
};
// 生产统计列表查询
const getStatisticsList = (params): Promise<any> => {
  return HttpClient({
    url: baseURL + "/getProduceStatistic",
    method: "get",
    params
  });
};
// 生产统计新增
const addStatistics = (data): Promise<any> => {
  return HttpClient({
    url: baseURL + "/addProduceStatistic",
    method: "post",
    data
  });
};

export {
  getDutyList,
  addDuty,
  getDisposeList,
  addDispose,
  getOrgList,
  getProductList,
  addProduct,
  getStatisticsList,
  addStatistics
};
