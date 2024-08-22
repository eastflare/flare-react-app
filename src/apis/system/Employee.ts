import { Employee, TeamLeaderInfo } from "@/models/system/Employee";
import { CommonRequest, CommonResponse, Method, ServiceName } from "@/models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const getEmployeeBySearchCondition = async (searchItem?: string, deptCd?: string, deptNm?: string, empNm?: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/employees`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({
      searchItem: searchItem ?? "",
      deptCd: deptCd ?? "",
      deptNm: deptNm ?? "",
      empNm: empNm ?? "",
    }),
  };
  const response: CommonResponse<any> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as Employee[];
};

export const getTeamLeaderIdByDeptCd = async (deptCd: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: `/v1/employee/teamLeaderId`,
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ deptCd }),
  };
  const response: CommonResponse<TeamLeaderInfo> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as TeamLeaderInfo;
};
