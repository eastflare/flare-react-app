import { ExcelDownloadRequest } from "@/models/common/Excel";
import { CommonRequest, CommonResponse, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";
import { downloadFile } from "apis/common/Excel";
import { LoginLogRequest } from "@/models/system/LoginLog";
import { EmailLogRequest } from "@/models/system/EmailLog";
import { MenuLogRequest } from "@/models/system/MenuLog";
import { IfLogRequest } from "@/models/system/IfLog";

export const downLoadLogInLogListExcel = async (condition: ExcelDownloadRequest<LoginLogRequest>) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/login/list/excel-download`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: condition,
    headers: {
      Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Type": "application/json",
    },
    responseType: "blob",
  };
  const response: CommonResponse<Blob> = await callApi(request);
  if (response?.data) downloadFile(response.data, `${condition.fileName}`);
};

export const downLoadEmailLogListExcel = async (condition: ExcelDownloadRequest<EmailLogRequest>) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/email/list/excel-download`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: condition,
    headers: {
      Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Type": "application/json",
    },
    responseType: "blob",
  };
  const response: CommonResponse<Blob> = await callApi(request);
  if (response?.data) downloadFile(response.data, `${condition.fileName}`);
};

export const downLoadMenuAccessLogListExcel = async (condition: ExcelDownloadRequest<MenuLogRequest>) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/menu/list/excel-download`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: condition,
    headers: {
      Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Type": "application/json",
    },
    responseType: "blob",
  };
  const response: CommonResponse<Blob> = await callApi(request);
  if (response?.data) downloadFile(response.data, `${condition.fileName}`);
};

export const downLoadIFLogListExcel = async (condition: ExcelDownloadRequest<IfLogRequest>) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/if/list/excel-download`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: condition,
    headers: {
      Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Type": "application/json",
    },
    responseType: "blob",
  };
  const response: CommonResponse<Blob> = await callApi(request);
  if (response?.data) downloadFile(response.data, `${condition.fileName}`);
};
