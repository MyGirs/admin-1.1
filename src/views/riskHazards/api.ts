import HttpClient from "@/utils/http";
const baseurl = "api/services/app/SafetyQualityStandardization";
export const getRiskHazardsApi = (params): Promise<any> => {
  return HttpClient({
    url: "/getRiskHazards",
    method: "get",
    params
  });
};

export const addRiskHazardsApi = (data): Promise<any> => {
  console.log(data);
  return HttpClient({
    url: "/addRiskHazards",
    method: "post",
    data
  });
};

export const updatedRiskHazardsApi = (data): Promise<any> => {
  return HttpClient({
    url: "/updateRiskHazards",
    method: "put",
    data
  });
};
// 事故隐患排查治理台账
export const getAdministerList = (params): Promise<any> => {
  return HttpClient({
    url: baseurl + "/getAdministerList",
    method: "get",
    params
  });
};
export const addAdministerApi = (data): Promise<any> => {
  return HttpClient({
    url: baseurl + "/addAdminister",
    method: "post",
    data
  });
};

export const updateAdministerApi = (data): Promise<any> => {
  return HttpClient({
    url: baseurl + "/updateAdminister",
    method: "put",
    data
  });
};
// 重大安全风险清单及管控措施台账
export const getMeasureListApi = (params): Promise<any> => {
  return HttpClient({
    url: baseurl + "/getMeasureList",
    method: "get",
    params
  });
};
export const addMeasureListApi = (data): Promise<any> => {
  return HttpClient({
    url: baseurl + "/addMeasureList",
    method: "post",
    data
  });
};
export const updateMeasureListApi = (data): Promise<any> => {
  return HttpClient({
    url: baseurl + "/updateMeasureList",
    method: "put",
    data
  });
};
export const getMapApi = (): Promise<any> => {
  // return Promise.resolve({
  //   code: 200,
  //   data: {
  //     rectificationMap: [
  //       { label: "调度室", value: "调度室" },
  //       { label: "机运队", value: "机运队" },
  //       { label: "掘进队", value: "掘进队" },
  //       { label: "洗煤厂", value: "洗煤厂" },
  //       { label: "综采队", value: "综采队" },
  //       { label: "安监科", value: "安监科" },
  //       { label: "技术科", value: "技术科" },
  //       { label: "综合科", value: "综合科" },
  //       { label: "矿领导", value: "矿领导" }
  //     ],
  //     supervisionMap: [
  //       "调度室",
  //       "机运队",
  //       "掘进队",
  //       "洗煤厂",
  //       "综采队",
  //       "安监科",
  //       "技术科",
  //       "综合科",
  //       "矿领导"
  //     ],
  //     responsibilityMap: [
  //       "调度室",
  //       "机运队",
  //       "掘进队",
  //       "洗煤厂",
  //       "综采队",
  //       "安监科",
  //       "技术科",
  //       "综合科",
  //       "矿领导"
  //     ],
  //     gradeMap: [
  //       {
  //         label: "A",
  //         value: "A"
  //       },
  //       {
  //         label: "B",
  //         value: "B"
  //       },
  //       {
  //         label: "C",
  //         value: "C"
  //       },
  //       {
  //         label: "D",
  //         value: "D"
  //       }
  //     ]
  //   }
  // });
  return HttpClient({
    url: baseurl + "/getMap",
    method: "get"
  });
};
