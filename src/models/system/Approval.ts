import { Crud } from "@/models/common/Edit";

export interface ApprovalRuleMaster {
  aprRuleId: string;
  aprRuleNm: string;
  aprLnAddPmitYn: string;
  aprRferAddPsblYn: string;
  aprLnRstbPmitYn: string;
  aprLnDuplPmitYn: string;
  aprExcTgtId: string;
  mstNtdkId: string;
}

export interface ApprovalRuleDetail {
  aprRuleId: string;
  aprLnId: string;
  aprTpDivsCd: string;
  prlYn: string;
  aprLnSnb: string;
  seq: string;
  aprLnRoleCd: string;
  deptCd: string;
  deptNm?: string;
  userId: string;
  userNm: string;
  userInfo?: string;
  aprLnChgPsblYn: string;
  aprLnDelPsblYn: string;
  crudKey?: string;
}

export interface ApprovalCommon {
  apiType: string;
  formId: string;
  apprTitle: string;
  reqUser: string;
  appkey01: string;
  appkey02: string;
  appkey03: string;
  appkey04: string;
  appkey05: string;
  formEditorData: string;
  formMobileData: string;
  apprSecurityType: string;
  apprDocNo: string;
  apprLineType: string;
  apprPeriodCd: string;
  fileLinkName: string;
  fileLinkUrl: string;
  fileSize: string;
  nextApprType: string;
  nextApprover: string;
  readUser: string;
  readDept: string;
  formData: string;
  isReturnApprId: string;
  appUrl: string;
  appWaitUrl: string;
  appMobileUrl: string;
  apprStatus: string;
  apprMessage: string;
  isAllDelete: string;
  deleteUser: string;
  nextApproverUrl: string;
  summaryData: string;
}

export interface ApprovalSetEntrust {
  apiType: string;
  reqUser: string;
  signUser: string;
  startDate: string;
  endDate: string;
}

export interface ApprovalCommonResponse {
  ifErrmsg: string;
  ifStatus: string;
}

export interface ApprovalDelegate extends Crud {
  aprDlgtNo: string;
  aprDlgtUserId: string;
  aprDlgtUserDisplay: string;
  dlgtUserDept: string;
  aprDeleUserId: string;
  aprDeleUserDisplay: string;
  deleUserDept: string;
  aprDlgtStDt: string;
  aprDlgtEndDt: string;
  status: string;
  useYn: string;
  dataInsUserId: string;
  dataInsDtm: string;
}
