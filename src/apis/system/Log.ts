import { CommonRequest, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const createMenuAccessLog = async (mnuId: string) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/log/menu-access`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: { mnuId: mnuId },
  };
  callApi(request);
};
