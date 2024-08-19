import { PaginationRequest } from "@/models/common/Pagination";

export interface IfLogRequest extends PaginationRequest {
  ifLogDtmFr: string;
  ifLogDtmTo: string;
  searchItem: string;
}

export interface IfLog {
  ifLogSeq: string;
  ifLogDtm: string;
  ifNm: string;
  ifDivsCd: string;
  cmnCdNm: string;
  ifTrmtValCtn: string;
  ifRestValCtn: string;
  optValNm1: string;
  optValNm2: string;
  optValNm3: string;
  optValNm4: string;
  optValNm5: string;
}
