import { ReadingTargetModel } from "@/models/system/ReadingTargets";
import { CommonRequest, CommonResponse, DmlResponse, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const getReadingTargets = async (leasWktDivsCd: string, leasWktIdnId: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/readingTarget",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({
      leasWktDivsCd: leasWktDivsCd,
      leasWktIdnIds: leasWktIdnId,
    }),
  };
  const response: CommonResponse<ReadingTargetModel[]> = await callApi(request);
  return (response.successOrNot === "Y" ? response.data : null) as ReadingTargetModel[];
};
export const insertReadingTargets = async (readingTarget: ReadingTargetModel[]) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/readingTarget",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: readingTarget,
  };
  const response: CommonResponse<DmlResponse> = await callApi(request);
  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};
