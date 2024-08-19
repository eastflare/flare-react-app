import { CommonRequest, CommonResponse, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";
import { PaginationResponse } from "@/models/common/Pagination";
import { IfLogRequest, IfLog } from "@/models/system/IfLog";

export const findIfLogs = async (condition: IfLogRequest) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/admin/if-log`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ ...condition }),
  };
  const response: CommonResponse<PaginationResponse<IfLog>> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : []) as PaginationResponse<IfLog>;
};
