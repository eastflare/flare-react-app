export interface BbsReplyRequest {
  bbmNo: string;
  bbmReCtn: string;
}

export interface BbsReply {
  bbmNo: string;
  bbmReNo: string;
  bbmReCtn: string;
  dataInsDtm: string;
  dataInsUserId: string;
  empNm: string;
  deptNm: string;
  jtiNm: string;
  jpsNm: string;
}

export interface BbsReplyUpdateRequest {
  bbmNo: string;
  bbmReNo: string;
  bbmReCtn: string;
}
