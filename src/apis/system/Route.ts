import { Route, RouteCondition } from "@/models/system/Route";
import { CommonRequest, CommonResponse, DmlResponse, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const findRoutes = async (routeCondition: RouteCondition) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/routes",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ ...routeCondition }),
  };
  const response: CommonResponse<Route[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : []) as Route[];
};

export const saveRoutes = async (routes: Route[]) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/routes",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: routes,
  };
  const response: CommonResponse<DmlResponse> = await callApi(request);

  return response.successOrNot === "Y" ? response.data : null;
};
