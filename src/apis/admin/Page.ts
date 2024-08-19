import { Page, PageCondition } from "models/admin/Page";
import { CommonRequest, CommonResponse, DmlResponse, Method, ServiceName } from "models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const findPages = async (pageCondition: PageCondition) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/pages",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ ...pageCondition }),
  };
  const response: CommonResponse<Page[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : []) as Page[];
};

export const savePages = async (pages: Page[]) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/pages",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: pages,
  };
  const response: CommonResponse<DmlResponse> = await callApi(request);

  return response.successOrNot === "Y" ? response.data : null;
};
