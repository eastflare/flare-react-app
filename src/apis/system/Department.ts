import { DepartmentResponse } from "@/models/system/Department";
import { CommonRequest, CommonResponse, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const getDepartments = async (searchItem?: string, deptNm?: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/departments`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({
      searchItem: searchItem ? searchItem : "",
      deptNm: deptNm ?? "",
    }),
  };
  const response: CommonResponse<any> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DepartmentResponse;
};

export const getAllDepartments = async () => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/departments`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse<any> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DepartmentResponse;
};

export const getParentDepartment = async () => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/department/parent`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse<string> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as string;
};
