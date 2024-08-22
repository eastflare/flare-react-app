import { MailSendRequest } from "@/models/system/Mail";
import { CommonRequest, CommonResponse, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const getMailTemplate = async (templateType: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/emailTemplate`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({
      templateType: templateType,
    }),
  };
  const response: CommonResponse<any> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as string;
};

export const mailBatchTest = async () => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/mailBatchTest`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse<any> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as string;
};

export const sendMail = async (emailRequest: MailSendRequest) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/emailTest`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: emailRequest,
  };
  const response: CommonResponse<any> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as number;
};
