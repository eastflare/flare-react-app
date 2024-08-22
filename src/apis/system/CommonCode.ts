import { CommonRequest, CommonResponse, DmlResponse, Method, ServiceName } from "@/models/common/RestApi";
import { CommonCode, CommonCodeGroup, CommonCodeHeader } from "@/models/system/CommonCode";
import { Code, CommonCodeCondition } from "@/models/common/CommonCode";
import { callApi } from "utils/ApiUtil";

export const getCommonCodeGroups = async (searchGrCd: string, searchCode: string, searchUseYn: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/commonCodeGroups`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({
      searchGrCd: searchGrCd,
      searchCode: searchCode,
      searchUseYn: searchUseYn,
    }),
  };
  const response: CommonResponse<CommonCodeGroup[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as CommonCodeGroup[];
};

export const setCommonCodeGroups = async (saveData: CommonCodeGroup[]) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/commonCodeGroups`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: saveData,
  };
  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};

export const getCommonCodes = async (cmnGrCd: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/commonCodes`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ cmnGrCd: cmnGrCd }),
  };
  const response: CommonResponse<CommonCode[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as CommonCode[];
};

export const setCommonCodes = async (saveData: CommonCode[]) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/commonCodes`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: saveData,
  };
  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};

export const getCommonCodeHeader = async (cmnGrCd: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/commonCodeHeader`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ cmnGrCd: cmnGrCd }),
  };
  const response: CommonResponse<CommonCodeHeader> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as CommonCodeHeader;
};

export const getCommonCodeNames = async (cmnGrCd: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/commonCodeNames`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ cmnGrCd: cmnGrCd }),
  };

  const response: CommonResponse<Code[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as Code[];
};

export const getCommonCodeNamesWithCode = async (cmnGrCd: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/commonCodeNamesWithCode`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ cmnGrCd: cmnGrCd }),
  };

  const response: CommonResponse<Code[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as Code[];
};

export const getCommonCodeNamesCondition = async (condition: CommonCodeCondition) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/commonCodeNamesCondition`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ ...condition }),
  };

  const response: CommonResponse<Code[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as Code[];
};
