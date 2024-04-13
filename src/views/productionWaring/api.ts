import HttpClient from "@/utils/http";

const baseURL = "api/services/app/YieldSJH";
export const getProductionWaringApi = params => {
  return HttpClient({
    url: baseURL + "/getProductionWaring",
    method: "get",
    params
    //baseURL: 'http://a01.xmbygy.com/api/services/app/YieldSJH'
  });
};
