import { CommonYN } from "@/models/common/Common";
import { Crud } from "@/models/common/Edit";

export interface RouteCondition {
  ruteId?: string;
  ruteNm?: string;
  rutePathNm?: string;
  cpntPathNm?: string;
  lazyLodYn?: string;
  useYn?: string;
}

export interface Route extends Crud {
  ruteId: string;
  ruteNm: string;
  rutePathNm: string;
  cpntPathNm: string;
  poupWthLen: number;
  poupVtcLen: number;
  lazyLodYn: CommonYN;
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
  rutePathNm: string;
  cpntPathNm: string;
  poupWthLen: number;
  poupVtcLen: number;
  lazyLodYn: CommonYN;
  useYn: CommonYN;
  ruteRoles: string[];
  dataInsUserName: string;
  dataInsDtm: string;
  dataUpdUserName: string;
  dataUpdDtm: string;
}
