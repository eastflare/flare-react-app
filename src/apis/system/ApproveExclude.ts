import { ApproveExcludeDetail, ApproveExcludeMaster, ApprovalExcludeRequest, ApproveExcludeResponse } from "@/models/system/ApproveExclude";
import {
  CommonRequest,
  CommonResponse,
  // DmlResponse,
  Method,
  ServiceName,
} from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const getAllApproveExcludeList = async (aprExcNm: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/approval/excludes`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({
      aprExcNm: aprExcNm ?? "",
    }),
  };
  const response: CommonResponse<any> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as ApproveExcludeMaster[];
};

export const getAllApproveExcludeDetails = async (aprExcTgtId: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/approval/exclude/${aprExcTgtId}/details`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    // queryParams: new URLSearchParams({
    //   aprExcTgtId: aprExcTgtId ?? '',
    // }),
  };
  const response: CommonResponse<any> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as ApproveExcludeDetail[];
};

export const saveApproveExcludeCud = async (crudRequest: ApprovalExcludeRequest) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/approval/exclude`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: crudRequest,
  };

  const response: CommonResponse<ApproveExcludeResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as ApproveExcludeResponse;
};

export const deleteApproveExcludeMaster = async (aprExcTgtId: string) => {
  const request: CommonRequest = {
    method: Method.DELETE,
    url: `/v1/approval/exclude/${aprExcTgtId}`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };

  const response: CommonResponse<ApproveExcludeResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as ApproveExcludeResponse;
};
