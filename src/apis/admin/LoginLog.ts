// import { ApiUrl, ApiUrlCondition } from 'models/admin/ApiUrl';
import { CommonRequest, CommonResponse, Method, ServiceName } from "models/common/RestApi";
import { callApi } from "utils/ApiUtil";
// import { MenuLog, MenuLogRequest } from 'models/admin/MenuLog';
import { PaginationResponse } from "models/common/Pagination";
import { LoginLog, LoginLogRequest } from "models/admin/LoginLog";

export const findLoginLogs = async (condition: LoginLogRequest) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/admin/login-log",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ ...condition }),
  };
  const response: CommonResponse<PaginationResponse<LoginLog>> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : []) as PaginationResponse<LoginLog>;
};
