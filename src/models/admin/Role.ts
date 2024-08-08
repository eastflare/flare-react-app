import { Crud } from "models/common/Edit";

export interface Role extends Crud {
  roleCd: string;
  roleNm: string;
  roleDesc: string;
  useYn: string;
}

export interface RoleEmployee extends Crud {
  userId: string;
  empNm: string;
  deptNm: string;
  officeNumber: string;
  emlSvrDmnIfoNm: string;
  isUpdated?: boolean;
}

export interface RoleDepartmentMutateRequest {
  roleCd: string;
  deptCdList: string[];
}

export interface RoleEmployeeMutateRequest {
  roleCd: string;
  userIdList: string[];
}
