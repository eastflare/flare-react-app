import { RoleDepartmentMutateRequest } from "@/models/admin/Role";
import { Department } from "../../models/admin/Department";
import { CommonRequest, CommonResponse, Method, ServiceName } from "../../models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const getRoleDepartment = async (roleCd: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/role/${roleCd}/departments",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ roleCd: roleCd }),
  };
  const response: CommonResponse<Department[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as Department[];
};

export const insertRoleDepartment = async (roleDepartmentMutateRequest: RoleDepartmentMutateRequest) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/role/${roleDepartmentMutateRequest.roleCd}/departments",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: roleDepartmentMutateRequest.deptCdList,
  };
  const response: CommonResponse<any> = await callApi(request);

  return response.successOrNot === "Y" ? response.data : null;
};

export const deleteRoleDepartment = async (roleDepartmentMutateRequest: RoleDepartmentMutateRequest) => {
  const queryParams = new URLSearchParams();
  roleDepartmentMutateRequest.deptCdList.forEach(deptCd => {
    queryParams.append("deptCdList", deptCd);
  });

  const request: CommonRequest = {
    method: Method.DELETE,
    url: "/v1/role/${roleDepartmentMutateRequest.roleCd}/departments",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: queryParams,
  };
  const response: CommonResponse<any> = await callApi(request);

  return response.successOrNot === "Y" ? response.data : null;
};
