import { Region } from "@/models/system/Region";
import { CommonRequest, CommonResponse, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const getRegions = async (searchItem?: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/region`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({
      regnNm: searchItem ? searchItem : "",
    }),
  };
  const response: CommonResponse<Region[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as Region[];
};
