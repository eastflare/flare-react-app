import { CommonRequest, CommonResponse, Method, ServiceName } from "models/common/RestApi.ts";
import { BbsCondition, BbsPost, BbsPostDetail } from "models/admin/Bbs";
import { PaginationResponse } from "models/common/Pagination";
import { callApi } from "utils/ApiUtil";

export const getBbsPosts = async (condition: BbsCondition): Promise<PaginationResponse<BbsPost>> => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/bbs/posts",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ ...condition }),
  };
  const response: CommonResponse<PaginationResponse<BbsPost>> = await callApi(request);
  return (response.successOrNot === "Y" ? response.data : null) as PaginationResponse<BbsPost>;
};

export const createBbsPost = async (bbs: BbsPostDetail): Promise<string> => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/bbs/post",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: bbs,
  };
  const response: CommonResponse<string> = await callApi(request);
  return (response.successOrNot === "Y" ? response.data : null) as string;
};

export const updateBbsPost = async (bbs: BbsPostDetail): Promise<string> => {
  const request: CommonRequest = {
    method: Method.PUT,
    url: "/v1/bbs/post",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: bbs,
  };
  const response: CommonResponse<string> = await callApi(request);
  return (response.successOrNot === "Y" ? response.data : null) as string;
};
