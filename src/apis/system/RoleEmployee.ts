import { RoleEmployee, RoleEmployeeMutateRequest } from "@/models/system/Role";
import { CommonRequest, CommonResponse, DmlResponse, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const getRoleEmps = async (typeCode: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/role/${typeCode}/employees`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse<RoleEmployee[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as RoleEmployee[];
};

export const setRoleEmps = async (roleEmployeeMutateRequest: RoleEmployeeMutateRequest) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/role/${roleEmployeeMutateRequest.roleCd}/employees`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: roleEmployeeMutateRequest.userIdList,
  };
  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};

export const deleteRoleEmps = async (roleEmployeeMutateRequest: RoleEmployeeMutateRequest) => {
  const queryParams = new URLSearchParams();
  roleEmployeeMutateRequest.userIdList.forEach(userId => {
    queryParams.append("userIdList", userId);
  });

  const request: CommonRequest = {
    method: Method.DELETE,
    url: `/v1/role/${roleEmployeeMutateRequest.roleCd}/employees`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: queryParams,
  };
  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};
