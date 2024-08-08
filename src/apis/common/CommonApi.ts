import { CommonRequest, CommonResponse, Method, ServiceName } from "@/models/common/RestApi.ts";
import { Code } from "@/models/common/CommonCode";
import { callApi } from "@/utils/ApiUtil";

export const getCommonCodeNames = async (cmnGrCd: string): Promise<Code[]> => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/commonCodeNames`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ cmnGrCd: cmnGrCd }),
  };
  const response: CommonResponse<Code[]> = await callApi(request);
  return (response.successOrNot === "Y" ? response.data : null) as Code[];
};
