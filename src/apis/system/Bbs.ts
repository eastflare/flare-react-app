import { BbsCondition, BbsPost, BbsPostDetail, BbsPostRequest, BbsPostUpdateRequest } from "@/models/system/Bbs";
import { PaginationResponse } from "@/models/common/Pagination";
import { CommonRequest, CommonResponse, DmlResponse, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const findBbsPosts = async (bbsCondition?: BbsCondition) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/bbs/posts`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ ...bbsCondition }),
  };
  const response: CommonResponse<PaginationResponse<BbsPost>> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as PaginationResponse<BbsPost>;
};

export const findBbsPost = async (bbmNo: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/bbs/post/${bbmNo}`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse<BbsPostDetail> = await callApi(request);

  return response.successOrNot === "Y" ? response.data : null;
};

export const createBbs = async (bbs: BbsPostRequest) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/bbs/post`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: bbs,
  };

  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};

export const createBbsOld = async (bbs: BbsPostDetail) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/bbs/post`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: bbs,
  };

  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};

export const modifyBbs = async (bbs: BbsPostUpdateRequest) => {
  const request: CommonRequest = {
    method: Method.PUT,
    url: `/v1/bbs/post`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: bbs,
  };

  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};

export const modifyBbsOld = async (bbs: BbsPostDetail) => {
  const request: CommonRequest = {
    method: Method.PUT,
    url: `/v1/bbs/post`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: bbs,
  };

  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};

export const deleteBbs = async (bbmNo: string) => {
  const request: CommonRequest = {
    method: Method.PATCH,
    url: `/v1/bbs/post`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: new Number(bbmNo),
  };

  const response: CommonResponse<any> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};
