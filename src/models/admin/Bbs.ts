import { PaginationRequest } from "models/common/Pagination";
import { BbsReply } from "models/admin/BbsReply";
import { FileInfo } from "models/admin/FileInfo";

export interface BbsCondition extends PaginationRequest {
  bbsTpCd?: string;
  bbmTitNm?: string;
  bbmCtn?: string;
  searchType?: string;
  searchItem?: string;
}

export interface BbsPost {
  bbmNo: string;
  rank: string;
  bbsTpCd: string;
  bbsTpNm: string;
  bbmTitNm: string;
  atchFileExist: string;
  dataInsUserInfo: string;
  dataInsDtm: string;
  bbmVwct: string;
  bbmReplyct: string;
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

export interface BbsPostDetail {
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
  atchFiles?: FileInfo[];
  atchFileGrId?: string;
  replies?: BbsReply[];
  ptupEndDt?: string;
  dataUpdUserId?: string;
}

export type BbsPostRequest = {
  bbsTpCd: string;
  ptupTgtCopCd: string;
  bbmTitNm: string;
  bbmCtn: string;
  atchFileGrId: string;
  ptupEndDt: string;
};

export type BbsPostUpdateRequest = { bbmNo: string } & BbsPostRequest;
