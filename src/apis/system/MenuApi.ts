import { CommonRequest, CommonResponse, Method, ServiceName } from "@/models/common/RestApi";
import { MenuRequest, MenuVO } from "@/models/system/Menu";
import { callApi } from "utils/ApiUtil";
import { Role } from "@/models/system/Role";
import { Employee } from "@/models/system/Employee";
import { Department } from "@/models/system/Department";

export const getAllMenus = async () => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/menus",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse<MenuVO[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as MenuVO[];
};

export const getMenu = async (mnuId: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/menu/${mnuId}",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse<MenuVO> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as MenuVO;
};

export const getMenusByRole = async (roleCd: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/role/${roleCd}/menus",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    // queryParams: new URLSearchParams({ roleCd: roleCd }),
  };
  const response: CommonResponse<MenuVO[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as MenuVO[];
};

export const saveMenusByRole = async (roleCd: string, mnuIdList: string[]) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/role/${roleCd}/menus",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: mnuIdList,
  };
  const response: CommonResponse = await callApi(request);

  return response.successOrNot === "Y" ? response : null;
};

export const getRolesByMenu = async (mnuId: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/menu/${mnuId}/roles",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    // queryParams: new URLSearchParams({ mnuId: mnuId }),
  };
  const response: CommonResponse<Role[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as Role[];
};

export const getEmployeesByMenu = async (mnuId: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/menu/${mnuId}/employees",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    // queryParams: new URLSearchParams({ mnuId: mnuId }),
  };
  const response: CommonResponse<Employee[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as Employee[];
};

export const getDepartmentsByMenu = async (mnuId: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/menu/${mnuId}/departments",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    // queryParams: new URLSearchParams({ mnuId: mnuId }),
  };
  const response: CommonResponse<Department[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as Department[];
};

export const deleteMenus = async (mnuId: string) => {
  const request: CommonRequest = {
    method: Method.DELETE,
    url: "/v1/menu/${mnuId}",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    // queryParams: new URLSearchParams({ mnuId: mnuId }),
  };
  const response: CommonResponse<number> = await callApi(request);

  return response.successOrNot === "Y" ? response.data : null;
};

export const createMenu = async (menu: MenuRequest) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/menu",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: menu,
  };
  const response: CommonResponse<MenuVO> = await callApi(request);

  return response.successOrNot === "Y" ? response.data : null;
};
