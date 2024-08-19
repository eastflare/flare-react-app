import { CommonYN } from "@/models/common/Common";
import { Crud } from "@/models/common/Edit";

export interface PageCondition {
  pageId?: string;
  pageNm?: string;
  pageUrl?: string;
  useYn?: string;
}

export interface Page extends Crud {
  pageId: string;
  pageNm: string;
  pageUrl: string;
  msgCtn: string;
  sysDivsCd: string;
  popupWthLen: number;
  popupVtcLen: number;
  useYn: CommonYN;
  pageRoles: string[];
  dataInsUserName: string;
  dataInsDtm: string;
  dataUpdUserName: string;
  dataUpdDtm: string;
}

export interface ShowingPage extends Crud {
  no: string;
  pageId: string;
  pageNm: string;
  pageUrl: string;
  msgCtn: string;
  sysDivsCd: string;
  popupWthLen: number;
  popupVtcLen: number;
  useYn: CommonYN;
  pageRoles: string[];
  dataInsUserName: string;
  dataInsDtm: string;
  dataUpdUserName: string;
  dataUpdDtm: string;
}
