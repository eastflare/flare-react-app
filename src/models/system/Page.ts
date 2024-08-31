import { CommonYN } from "@/models/common/Common";
import { Crud } from "@/models/common/Edit";

export interface PageCondition {
  pageId?: string;
  pageNm?: string;
  pagePathNm?: string;
  useYn?: string;
}

export interface Page extends Crud {
  pageId: string;
  pageNm: string;
  pagePathNm: string;
  msgCtn: string;
  poupWthLen: number;
  poupVtcLen: number;
  useYn: CommonYN;
  dataInsUserName: string;
  dataInsDtm: string;
  dataUpdUserName: string;
  dataUpdDtm: string;
}

export interface ShowingPage extends Crud {
  no: string;
  pageId: string;
  pageNm: string;
  pagePathNm: string;
  msgCtn: string;
  popupWthLen: number;
  popupVtcLen: number;
  useYn: CommonYN;
  dataInsUserName: string;
  dataInsDtm: string;
  dataUpdUserName: string;
  dataUpdDtm: string;
}
