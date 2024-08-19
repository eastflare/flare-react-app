import { CommonRequest, CommonResponse, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";
import { PaginationResponse } from "@/models/common/Pagination";
import { EmailLogRequest, EmailLog } from "@/models/system/EmailLog";

export const findEmailLogs = async (condition: EmailLogRequest) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/admin/email-log`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ ...condition }),
  };
  const response: CommonResponse<PaginationResponse<EmailLog>> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : []) as PaginationResponse<EmailLog>;
};
