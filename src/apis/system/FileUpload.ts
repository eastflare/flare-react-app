import { CommonRequest, CommonResponse, Method, ServiceName } from "@/models/common/RestApi";
import { FileInfo, FileUploadResponse } from "@/models/system/FileInfo";
import { callApi } from "utils/ApiUtil";
import axios from "axios";

export const findFiles = async (atchFileGrId: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/files",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    headers: {},
    queryParams: new URLSearchParams({ atchFileGrId: atchFileGrId }),
  };
  const response: CommonResponse<FileInfo[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as FileInfo[];
};

export const uploadFiles = async (formData: FormData) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/file/upload",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: formData,
  };

  const response: CommonResponse<FileUploadResponse> = await callApi(request);

  return response.successOrNot === "Y" ? response.data : null;
};

export const uploadFileWithNewGroupId = async (formData: FormData) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/file/upload/new",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: formData,
  };

  const response: CommonResponse<any> = await callApi(request);

  return response.successOrNot === "Y" ? response.data : null;
};

export const modifyFiles = async (files: FileInfo[]) => {
  const request: CommonRequest = {
    method: Method.PUT,
    url: "/v1/files",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: files,
  };

  const response: CommonResponse<any> = await callApi(request);

  return response.successOrNot === "Y" ? response.data : null;
};

export const modifyFilesWithNewGroupId = async (atchFileGrId: string, files: FileInfo[]) => {
  const request: CommonRequest = {
    method: Method.PUT,
    url: "/v1/files/new",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: {
      atchFileGrId: atchFileGrId,
      files: files,
    },
  };

  const response: CommonResponse<any> = await callApi(request);

  return response.successOrNot === "Y" ? response.data : null;
};

export const downloadFile = async (atchFileGrId: string, atchFileId: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/file/download",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ atchFileGrId: atchFileGrId, atchFileId: atchFileId }),
  };

  const response = await callApi(request);

  return response.data;
};

export const downloadAllFiles = async (atchFileGrId: string) => {
  try {
    const isSsl = window.location.protocol === "https:";
    const baseURL = isSsl ? `${process.env.SSL_BASE_URL}` : `${process.env.API_BASE_URL}`;
    const response = await axios.get(`${baseURL}/api/v1/file/download/all?atchFileGrId=${atchFileGrId}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", atchFileGrId + ".zip");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.log(error);
  }
};
