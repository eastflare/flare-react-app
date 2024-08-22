import { CommonRequest, CommonResponse, DmlResponse, Method, ServiceName } from "@/models/common/RestApi";
import { ApprovalDelegate } from "@/models/system/Approval";
import { ApprovalTemplate } from "@/models/system/ApprovalTemplate";
import { ApprovalCommon, ApprovalSetEntrust, ApprovalCommonResponse } from "@/models/system/Approval";
import { callApi } from "utils/ApiUtil";

export const getApprovalTemplate = async (aprTplNm: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/approval/templates`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ aprTplNm: aprTplNm }),
  };
  const response: CommonResponse<ApprovalTemplate[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as ApprovalTemplate[];
};

export const createApprovalTemplate = async (approvalTemplate: ApprovalTemplate) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/approval/template`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: approvalTemplate,
  };

  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};

export const modifyApprovalTemplate = async (approvalTemplate: ApprovalTemplate) => {
  const request: CommonRequest = {
    method: Method.PUT,
    url: `/v1/approval/template`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: approvalTemplate,
  };

  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};

export const deleteApprovalTemplate = async (aprTplId: string) => {
  const request: CommonRequest = {
    method: Method.DELETE,
    url: `/v1/approval/template`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ aprTplId: aprTplId }),
  };

  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};

export const approvalAuto = async (approvalCommon: ApprovalCommon) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/WebServiceRequestAuto`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: approvalCommon,
  };

  const response: CommonResponse<ApprovalCommonResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as ApprovalCommonResponse;
};

export const approvalList = async (approvalCommon: ApprovalCommon) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/WebServiceRequestList`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: approvalCommon,
  };

  const response: CommonResponse<ApprovalCommonResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as ApprovalCommonResponse;
};

export const approvalSetEntrust = async (approvalSetEntrust: ApprovalSetEntrust) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/WebServiceSetEntrust`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: approvalSetEntrust,
  };

  const response: CommonResponse<ApprovalCommonResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as ApprovalCommonResponse;
};

export const getApprovalDelegates = async (aprDlgtUserId: string, statusFlag: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/approval/delegates`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ aprDlgtUserId: aprDlgtUserId, statusFlag: statusFlag }),
  };
  const response: CommonResponse<ApprovalDelegate[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as ApprovalDelegate[];
};

export const saveApprovalDelegates = async (approvalDelegates: ApprovalDelegate[]) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/approval/delegates`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: approvalDelegates,
  };

  const response: CommonResponse<DmlResponse> = await callApi(request);

  return response as CommonResponse<DmlResponse>;
};
