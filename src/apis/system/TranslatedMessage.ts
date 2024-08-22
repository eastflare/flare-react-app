import { CommonRequest, CommonResponse, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const deployTranslatedMessages = async () => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/translated-messages/deploy`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse = await callApi(request);
  return response;
};

export const getTranslatedMessages = async (langCd: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/translated-messages`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ langCd: langCd }),
  };

  const response: CommonResponse<{ [key: string]: string }> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as { [key: string]: string };
};

export const changeSessionLangCd = async (langCd: string) => {
  const request: CommonRequest = {
    method: Method.PUT,
    url: `/v1/session/langCd`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: {
      langCd: langCd,
    },
  };

  const response: CommonResponse = await callApi(request);
  return response;
};
