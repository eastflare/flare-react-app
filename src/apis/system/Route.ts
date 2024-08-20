import { Route, RouteCondition } from "@/models/system/Route";
import { CommonRequest, CommonResponse, DmlResponse, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const findRouteById = async (pageId: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/page/${pageId}",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,

  };
  const response: CommonResponse<Route> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as Route;
};

export const findRoutes = async (pageCondition: RouteCondition) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/pages",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ ...pageCondition }),
  };
  const response: CommonResponse<Route[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : []) as Route[];
};

export const saveRoutes = async (pages: Route[]) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/pages",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: pages,
  };
  const response: CommonResponse<DmlResponse> = await callApi(request);

  return response.successOrNot === "Y" ? response.data : null;
};
