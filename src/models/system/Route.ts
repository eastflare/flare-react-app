import { CommonYN } from "@/models/common/Common";
import { Crud } from "@/models/common/Edit";

export interface RouteCondition {
  ruteId?: string;
  ruteNm?: string;
  ruteUrl?: string;
  useYn?: string;
}

export interface Route extends Crud {
  ruteId: string;
  ruteNm: string;
  ruteUrl: string;
  poupWthLen: number;
  poupVtcLen: number;
  useYn: CommonYN;
  ruteRoles: string[];
  dataInsUserName: string;
  dataInsDtm: string;
  dataUpdUserName: string;
  dataUpdDtm: string;
}

export interface ShowingRoute extends Crud {
  no: string;
  ruteId: string;
  ruteNm: string;
  ruteUrl: string;
  poupWthLen: number;
  poupVtcLen: number;
  useYn: CommonYN;
  ruteRoles: string[];
  dataInsUserName: string;
  dataInsDtm: string;
  dataUpdUserName: string;
  dataUpdDtm: string;
}
