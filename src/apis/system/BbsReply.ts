import { BbsReplyRequest, BbsReplyUpdateRequest } from "@/models/system/BbsReply";
import { CommonRequest, CommonResponse, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const createReply = async (bbsReplyRequest: BbsReplyRequest) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/bbs/reply",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: bbsReplyRequest,
  };
  const response: CommonResponse = await callApi(request);

  return response.successOrNot === "Y" ? true : false;
};

export const removeReply = async (bbmNo: string, bbmReNo: string) => {
  const request: CommonRequest = {
    method: Method.DELETE,
    url: "/v1/bbs/reply/${bbmNo}/${bbmReNo}",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse = await callApi(request);

  return response.successOrNot === "Y" ? true : false;
};

export const modifyReply = async (bbsReplyUpdateRequest: BbsReplyUpdateRequest) => {
  const request: CommonRequest = {
    method: Method.PUT,
    url: "/v1/bbs/reply",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: bbsReplyUpdateRequest,
  };
  const response: CommonResponse = await callApi(request);

  return response.successOrNot === "Y" ? true : false;
};
