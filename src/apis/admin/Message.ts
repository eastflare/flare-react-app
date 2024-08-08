import { Message, MessageCondition } from "models/admin/Message";
import { CommonRequest, CommonResponse, DmlResponse, Method, ServiceName } from "models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const findMessages = async (messageCondition?: MessageCondition) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/message",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ ...messageCondition }),
  };

  const response: CommonResponse<Message[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as Message[];
};

export const findMessagesMsgCtn = async (messageCondition?: MessageCondition) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/messageMsgCtn",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ ...messageCondition }),
  };

  const response: CommonResponse<Message[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as Message[];
};

export const createMessage = async (message: Message) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/message",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: message,
  };

  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};

export const modifyMessage = async (message: Message) => {
  const request: CommonRequest = {
    method: Method.PUT,
    url: "/v1/message",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: message,
  };

  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};

export const deleteMessage = async (msgCtn: string, langCd: string) => {
  const request: CommonRequest = {
    method: Method.DELETE,
    url: "/v1/message",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ msgCtn: msgCtn, langCd: langCd }),
  };

  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};

export const saveMessages = async (messages: Message[]) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/messages",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: messages,
  };

  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};

export const reloadMessages = async () => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/reloadMessageCache",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };

  const response: CommonResponse<number> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as number;
};
