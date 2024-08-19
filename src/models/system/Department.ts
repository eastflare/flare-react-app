import { Crud } from "@/models/common/Edit";

export interface Department extends Crud {
  deptCd: string;
  copCd: string;
  deptNm: string;
  deptEngNm: string;
  deptCngNm: string;
  temLdrUserId: string;
  temLdrUserNm?: string;
  upprDeptCd: string;
  useYn: string;
  isDeleted?: boolean;
  isUpdated?: boolean;
}

export interface DepartmentResponse {
  deptCd: string;
  children: any;
  useYn: any;
  deptNm: string;
  departmentList: Department[];
  userDeptCd: string;
}
