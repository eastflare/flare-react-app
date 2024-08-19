import { CommonYN } from "@/models/common/Common";
import { Crud } from "@/models/common/Edit";

export interface NotificationCondition {
  ntdkNm?: string;
  ntdkId?: string;
  useYn?: string;
}

export interface NotificationGroup extends Crud {
  ntdkId: string;
  ntdkNm?: string;
  ntdkDesc?: string;
  useYn?: CommonYN;
}

export interface NotificationGroupDivision extends Crud {
  ntdkDivsCd: string;
  ntdkDivsNm?: string;
}

export interface NotificationGroupUser extends Crud {
  aprNotfUserId: string;
  empNm?: string;
  jtiNm?: string;
  deptNm?: string;
  ofcPhn?: string;
  emlSvrDmnIfoNm?: string;
  ntdkSeq: number;
  ntdkDivsCd?: string;
  ntdkId: string;
  sortOrd?: string;
  useYn?: string;
}
