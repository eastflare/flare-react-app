import { CommonYN } from "@/models/common/Common";
import { Crud } from "@/models/common/Edit";

export interface RouteCondition {
  routeId?: string;
  routeNm?: string;
  routeUrl?: string;
  useYn?: string;
}

export interface Route extends Crud {
  routeId: string;
  routeNm: string;
  routeUrl: string;
  popupWthLen: number;
  popupVtcLen: number;
  useYn: CommonYN;
  routeRoles: string[];
  dataInsUserName: string;
  dataInsDtm: string;
  dataUpdUserName: string;
  dataUpdDtm: string;
}

export interface ShowingRoute extends Crud {
  no: string;
  routeId: string;
  routeNm: string;
  routeUrl: string;
  popupWthLen: number;
  popupVtcLen: number;
  useYn: CommonYN;
  routeRoles: string[];
  dataInsUserName: string;
  dataInsDtm: string;
  dataUpdUserName: string;
  dataUpdDtm: string;
}
