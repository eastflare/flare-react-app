import { CommonYN } from "models/common/Common";
import { Crud } from "models/common/Edit";

export interface ApiUrlCondition {
  apiNm?: string;
  apiUrl?: string;
  useYn?: string;
}

export interface ApiUrl extends Crud {
  apiId: string;
  apiNm: string;
  apiUrl: string;
  httpMthdCd: string;
  useYn: CommonYN;
  apiRoles: string[];
  dataInsUserName: string;
  dataInsDtm: string;
  dataUpdUserName: string;
  dataUpdDtm: string;
}

export interface ShowingApiUrl extends Crud {
  no: string;
  apiId: string;
  apiNm: string;
  apiUrl: string;
  httpMthdCd: string;
  useYn: CommonYN;
  apiRoles: string[];
  dataInsUserName: string;
  dataInsDtm: string;
  dataUpdUserName: string;
  dataUpdDtm: string;
}
