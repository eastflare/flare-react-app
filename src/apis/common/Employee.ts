// import React from 'react';
import { CommonRequest, CommonResponse, Method, ServiceName } from "models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const getUserInfo = async () => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/employee/userInfo`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse<string> = await callApi(request);

  return response.data as string;
};

export const getUserInfo2 = async () => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/employee/userInfo/short`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse<string> = await callApi(request);

  return response.data as string;
};
