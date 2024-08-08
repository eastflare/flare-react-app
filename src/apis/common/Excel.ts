import { InfoForExcelConvertion } from "models/common/Excel";
import { CommonRequest, CommonResponse, Method, ServiceName } from "models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const downloadFile = (data: Blob, filename: string) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getExcelSample = async () => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/excel/download",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    headers: {
      Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    responseType: "blob",
  };
  const response: CommonResponse<Blob> = await callApi(request);
  if (response?.data) {
    downloadFile(response.data, "Sample.xlsx");
  }
};

export const convertToExcel = async (infoForExcelConvertion: InfoForExcelConvertion) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/excel/convert",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    headers: {
      Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Type": "application/json",
    },
    responseType: "blob",
    bodyParams: infoForExcelConvertion,
  };
  const response: CommonResponse<Blob> = await callApi(request);
  if (response?.data) {
    downloadFile(response.data, "${infoForExcelConvertion.fileName}");
  }
};
