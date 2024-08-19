import { CommonRequest, CommonResponse, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const getSample = async () => {
  // Mock Service Worker Test 용도
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/sample`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse<any> = await callApi(request);
  return response;
};

export const getHealthCheck = async () => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/health`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse<any> = await callApi(request);
  return response;
};
