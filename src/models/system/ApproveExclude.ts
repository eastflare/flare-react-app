import { Crud } from "@/models/common/Edit";
import { DmlResponse } from "@/models/common/RestApi";
import { Code } from "@/models/common/CommonCode";

export interface ApproveExcludeMaster extends Crud {
  aprExcTgtId: string;
  aprExcNm: string;
  dataInsUserId?: string;
  dataInsUserIp?: string;
  dataInsDtm?: string;
  dataUpdUserId?: string;
  dataUpdUserIp?: string;
  dataUpdDtm?: string;
}

export interface ApproveExcludeDetail extends Crud {
  aprExcTgtId: string;
  aprExcSeq?: number;
  aprExcDivsCd: string;
  aprExcUserId: string;
  aprExcUserInfo?: string;
  dataInsUserId?: string;
  dataInsUserIp?: string;
  dataInsDtm?: string;
  dataUpdUserId?: string;
  dataUpdUserIp?: string;
  dataUpdDtm?: string;
  delete?: boolean;
  userInfo?: string;
}

export interface ApprovalExcludeRequest {
  approvalExcludeMaster: ApproveExcludeMaster[];
  approvalExcludeDetail: ApproveExcludeDetail[];
}

export interface ApproveExcludeResponse {
  approvalExcludeMaster: DmlResponse;
  approvalExcludeDetail: DmlResponse;
}

export interface ApproveExcludeCode {
  divisionCode: Code[];
  jpsCode: Code[];
  jtiCode: Code[];
}
