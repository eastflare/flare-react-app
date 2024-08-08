import { CommonYN } from "models/common/Common";
import { Crud } from "models/common/Edit";
import { Nullable } from "models/common/FalsyGeneric";

export interface MessageCondition {
  msgCtn?: string;
  msgTxtCtn?: string;
  useYn?: string;
}

export interface Message extends Crud {
  msgCtn: Nullable<string>;
  langCd: Nullable<string>;
  msgTxtCtn: Nullable<string>;
  rmk: Nullable<string>;
  optValCtn1: Nullable<string>;
  optValCtn2: Nullable<string>;
  optValCtn3: Nullable<string>;
  useYn: Nullable<CommonYN>;
  dataInsUserId: Nullable<string>;
  dataInsUserIp: Nullable<string>;
  dataInsDtm: Nullable<string>;
  dataUpdUserId: Nullable<string>;
  dataUpdUserIp: Nullable<string>;
  dataUpdDtm: Nullable<string>;
}

export interface ShowingMessage extends Crud {
  msgCtn: Nullable<string>;
  msgTxtCtn1: Nullable<string>;
  msgTxtCtn2: Nullable<string>;
  msgTxtCtn3: Nullable<string>;
  msgTxtCtn4: Nullable<string>;
  msgTxtCtn5: Nullable<string>;
  rmk: Nullable<string>;
  optValCtn1: Nullable<string>;
  optValCtn2: Nullable<string>;
  optValCtn3: Nullable<string>;
  useYn: Nullable<CommonYN>;
  dataInsUserId: Nullable<string>;
  dataInsUserIp: Nullable<string>;
  dataInsDtm: Nullable<string>;
  dataUpdUserId: Nullable<string>;
  dataUpdUserIp: Nullable<string>;
  dataUpdDtm: Nullable<string>;
}

export interface MessageInfo {
  msgCtn: string;
  msgTxtCtn1: string;
  msgTxtCtn2: string;
  msgTxtCtn3: string;
  msgTxtCtn4: string;
  msgTxtCtn5: string;
  rmk: string;
  useYn: CommonYN;
}
