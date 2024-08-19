import { PaginationRequest } from "@/models/common/Pagination";
import { FileInfo } from "@/models/system/FileInfo";

export interface NoticeCondition extends PaginationRequest {
  bbsTpCd?: string;
  bbmTitNm?: string;
  bbmCtn?: string;
}

export interface NoticePost {
  bbmNo: string;
  rank: string;
  bbsTpCd: string;
  bbsTpNm: string;
  bbmTitNm: string;
  bbmCtn: string;
  atchFileExist: string;
  atchFileGrId: string;
  dataInsUserId: string;
  dataInsUserInfo: string;
  dataInsDtm: string;
  bbmVwct: string;
}

export interface BbsEmployee {
  userId: string;
  empNm: string;
  deptNm: string;
  jtiNm: string;
  jpsNm: string;
  ofcTanoPhn: string;
  email: string;
}

export interface NoticePostDetail {
  bbmNo: string;
  bbmVwct?: string;
  dataInsUser: BbsEmployee;
  dataInsDtm: string;
  dataUpdUser: BbsEmployee;
  dataUpdDtm: string;
  bbsTpCd: string;
  bbsTpNm: string;
  ptupTgtCopCd?: string;
  ptupTgtCopNm?: string;
  bbmTitNm: string;
  bbmCtn: string;
  atchFiles: FileInfo[];
  atchFileGrId?: string;
  ptupEndDt?: string;
  poupStDt?: string;
  poupEndDt?: string;
  poupStTm?: string;
  poupEndTm?: string;
  poupStDtm?: string;
  poupEndDtm?: string;
  poupEpsNuseDdn?: string;
}

export type NoticePostRequest = {
  bbsTpCd: string;
  ptupTgtCopCd: string;
  bbmTitNm: string;
  bbmCtn: string;
  atchFileGrId: string;
  ptupEndDt: string;
  poupStDtm: string;
  poupEndDtm: string;
  poupEpsNuseDdn: string;
};

export type NoticePostUpdateRequest = { bbmNo: string } & NoticePostRequest;
