import { ApiUrl, ApiUrlCondition } from "@/models/system/ApiUrl";
import { CommonRequest, CommonResponse, DmlResponse, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const findApiUrls = async (apiUrlCondition: ApiUrlCondition) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/apiUrls`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ ...apiUrlCondition }),
  };
  const response: CommonResponse<ApiUrl[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : []) as ApiUrl[];
};

export const saveApiUrls = async (apiUrls: ApiUrl[]) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/apiUrls`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: apiUrls,
  };
  const response: CommonResponse<DmlResponse> = await callApi(request);

  return response.successOrNot === "Y" ? response.data : null;
};
