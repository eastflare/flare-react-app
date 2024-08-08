import { CommonRequest, CommonResponse, Method, ServiceName } from "models/common/RestApi";
import { callApi } from "utils/ApiUtil";
import { MenuLog, MenuLogRequest } from "../../models/admin/MenuLog";
import { PaginationResponse } from "models/common/Pagination";

export const findMenuLogs = async (condition: MenuLogRequest) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/admin/menu-log`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ ...condition }),
  };
  const response: CommonResponse<PaginationResponse<MenuLog>> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : []) as PaginationResponse<MenuLog>;
};
