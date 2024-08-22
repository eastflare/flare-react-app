import { Session } from "@/models/common/Session";
import { CommonRequest, CommonResponse, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const devLogin = async (userId: string, langCd: string) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/dev/login`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: { userId: userId, langCd: langCd },
  };
  const response: CommonResponse<Session> = await callApi(request);

  return response;
};

export const getSession = async () => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/session`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse<Session> = await callApi(request);

  return response;
};
