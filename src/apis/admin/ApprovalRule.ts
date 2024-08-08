import { ApprovalRuleDetail, ApprovalRuleMaster } from "models/admin/Approval";
import { CommonRequest, CommonResponse, DmlResponse, Method, ServiceName } from "models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const getApprovalRuleMasters = async (aprRuleId: string, searchRuleNm: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/approval/rules",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({
      aprRuleId: aprRuleId,
      searchRuleNm: searchRuleNm,
    }),
  };
  const response: CommonResponse<ApprovalRuleMaster[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as ApprovalRuleMaster[];
};

export const setApprovalRuleMaster = async (saveData: ApprovalRuleMaster) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/approval/rule",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: saveData,
  };
  const response: CommonResponse<DmlResponse> = await callApi(request);

  return response as CommonResponse<DmlResponse>;
};

export const getApprovalRuleDetails = async (aprRuleId?: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/approval/rule/${aprRuleId}/details",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse<ApprovalRuleDetail[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as ApprovalRuleDetail[];
};

export const setApprovalRuleDetails = async (saveData: ApprovalRuleDetail[]) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/approval/rule/details",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: saveData,
  };
  const response: CommonResponse<DmlResponse> = await callApi(request);

  return response as CommonResponse<DmlResponse>;
};
