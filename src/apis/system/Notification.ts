import { NotificationCondition, NotificationGroup, NotificationGroupDivision, NotificationGroupUser } from "@/models/system/Notification";
import { CommonRequest, CommonResponse, Method, ServiceName } from "../../models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const getNotificationGroups = async (notificationCondition: NotificationCondition) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/notificationGroups`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ ntdkNm: notificationCondition.ntdkNm ?? "" }),
  };
  const response: CommonResponse<NotificationGroup[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as NotificationGroup[];
};

export const getNotificationGroupDivisions = async () => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/notificationGroup/divisions`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse<NotificationGroupDivision[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as NotificationGroupDivision[];
};

export const getNotificationGroupUsers = async (ntdkId: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/notificationGroup/${ntdkId}/users`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse<NotificationGroupUser[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as NotificationGroupUser[];
};

export const saveNotificationGroups = async (notificationGroups: NotificationGroup[]) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/notificationGroups`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: notificationGroups,
  };
  const response: CommonResponse<any> = await callApi(request);

  return response.successOrNot === "Y" ? response.data : null;
};

export const deleteNotificationGroup = async (ntdkId: string) => {
  const request: CommonRequest = {
    method: Method.PUT,
    url: `/v1/notificationGroup/${ntdkId}`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };

  const response: CommonResponse<any> = await callApi(request);

  return response.successOrNot === "Y" ? response.data : null;
};

export const saveNotificationGroupUsers = async (notificationGroupUsers: NotificationGroupUser[]) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: `/v1/notificationGroup/users`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: notificationGroupUsers,
  };
  const response: CommonResponse<any> = await callApi(request);

  return response.successOrNot === "Y" ? response.data : null;
};

export const getApprovalNotificationGroups = async (ntdkId: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/notificationGroup/${ntdkId}/approvals`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse<NotificationGroup[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as NotificationGroup[];
};
