import { Role } from "@/models/system/Role";
import { CommonRequest, CommonResponse, DmlResponse, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const getRoles = async (roleNm: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/roles`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ roleNm: roleNm }),
  };
  const response: CommonResponse<Role[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as Role[];
};

export const setRoles = async (saveData: Role[]) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/roles`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: saveData,
  };
  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};
