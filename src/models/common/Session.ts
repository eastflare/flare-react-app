import { Menu } from "models/admin/Menu";

export type LangType = "ko" | "en" | "zhC" | "zhT" | "pl";

export enum LanguageCode {
  ko = "ko",
  en = "en",
  pl = "pl",
  zhC = "zhC",
  zhT = "zhT",
}

export interface Session {
  userId?: string;
  empNm?: string;
  langCd?: LanguageCode;
  roleCodes?: string[];
  menus?: Menu[];
  timeZoneCd?: string;
  userCopCd?: string;
  userDeptCd?: string;
  empNo?: string;
  empEngNm?: string;
  empCngNm?: string;
  deptCd?: string;
  deptNm?: string;
  deptEngNm?: string;
  deptCngNm?: string;
  copCd?: string;
  jtiCd?: string;
  jtiNm?: string;
  jtiEngNm?: string;
  jtiCngNm?: string;
  jpsCd?: string;
  jpsNm?: string;
  jpsEngNm?: string;
  jpsCngNm?: string;
  upprEmpNo?: string;
  upprUserId?: string;
  onduRegnCd?: string;
  onduRegnNm?: string;
  ctryCd?: string;
  teamYn?: string;
  tldYn?: string;
  leasTeamYn?: string;
  leasTldYn?: string;
  gleasTeamYn?: string;
  gleasTldYn?: string;
  mgrDeptCd?: string;
}

export enum GridNoRowsTemplateData {
  ko = "조회 가능한 데이터가 없습니다.",
  en = "There is no data available to view.",
  pl = "Brak danych do wyświetlenia.",
  zhC = "没有可查看的数据。",
  zhT = "没有可供查看的数据。",
}
