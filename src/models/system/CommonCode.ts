import { Crud } from "@/models/common/Edit";

export interface CommonCode extends Crud {
  cmnGrCd?: string;
  cmnCd?: string;
  cmnCdNm?: string;
  cmnCdDesc?: string;
  upprCmnCd?: string;
  sortOrd?: string;
  useYn?: string;
  msgCtn?: string;
  optValCtn1?: string;
  optValCtn2?: string;
  optValCtn3?: string;
  optValCtn4?: string;
  optValCtn5?: string;
  optValCtn6?: string;
  optValCtn7?: string;
  optValCtn8?: string;
  optValCtn9?: string;
  optValCtn10?: string;
  optValCtn11?: string;
  optValCtn12?: string;
  optValCtn13?: string;
  optValCtn14?: string;
  optValCtn15?: string;
  dataInsUserId?: string;
  dataInsUserIp?: string;
  dataInsDtm?: string;
  dataUpdUserId?: string;
  dataUpdUserIp?: string;
  dataUpdDtm?: string;
}

export interface CommonCodeGroup extends Crud {
  cmnGrCd: string;
  cmnGrCdNm: string;
  cmnGrCdDesc: string;
  wktAreaDivsCd: string;
  sortOrd: string;
  optValNm1: string;
  optValNm2: string;
  optValNm3: string;
  optValNm4: string;
  optValNm5: string;
  optValNm6: string;
  optValNm7: string;
  optValNm8: string;
  optValNm9: string;
  optValNm10: string;
  optValNm11: string;
  optValNm12: string;
  optValNm13: string;
  optValNm14: string;
  optValNm15: string;
  msgCtn: string;
  rmk: string;
  useYn: string;
}

export interface CommonCodeHeader {
  optValNm1?: string;
  optValNm2?: string;
  optValNm3?: string;
  optValNm4?: string;
  optValNm5?: string;
  optValNm6?: string;
  optValNm7?: string;
  optValNm8?: string;
  optValNm9?: string;
  optValNm10?: string;
  optValNm11?: string;
  optValNm12?: string;
  optValNm13?: string;
  optValNm14?: string;
  optValNm15?: string;
}
