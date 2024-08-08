import { CommonRequest, CommonResponse, Method, ServiceName } from "models/common/RestApi";
import { reviewerContent } from "models/admin/Reviewer";
import { callApi } from "utils/ApiUtil";

export const getReviewers = async (empNm?: string, deptCd?: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/contract/review/reviewer`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({
      empNm: empNm ? empNm : "",
      deptCd: deptCd ? deptCd : "",
    }),
  };
  const response: CommonResponse<any> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as reviewerContent[];
};
