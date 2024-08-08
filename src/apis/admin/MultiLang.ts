// import { Message, MessageCondition } from 'models/admin/Message';
import {
  CommonRequest,
  CommonResponse,
  // DmlResponse,
  Method,
  ServiceName,
} from "models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const multiLangTest = async () => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/multiLanguageTest`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };

  const response: CommonResponse<string> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as string;
};
