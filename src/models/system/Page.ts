import { CommonYN } from "@/models/common/Common";
import { Crud } from "@/models/common/Edit";

export interface PageCondition {
  pageId?: string;
  pageNm?: string;
  pageUrl?: string;
  rutePathNm?: string;
  cpntPathNm?: string;
  useYn?: string;
}

export interface Page extends Crud {
  pageId: string;
  pageNm: string;
  pageUrl: string;
  ruteId: string;
  msgCtn: string;
  sysDivsCd: string;
  popupWthLen: number;
  popupVtcLen: number;
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
  pageUrl: string;
  ruteId: string;
  rutePathNm: string;
  cpntPathNm: string;
  msgCtn: string;
  sysDivsCd: string;
  popupWthLen: number;
  popupVtcLen: number;
  useYn: CommonYN;
  dataInsUserName: string;
  dataInsDtm: string;
  dataUpdUserName: string;
  dataUpdDtm: string;
}
