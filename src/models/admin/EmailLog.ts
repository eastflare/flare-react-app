import { PaginationRequest } from "models/common/Pagination";

export interface EmailLogRequest extends PaginationRequest {
  sedDtmFr: string;
  sedDtmTo: string;
  searchItem: string;
  searchEmlTpCd: string;
}

export interface EmailLog {
  emlSndoSeq: string;
  emlTpCd: string;
  restEmal: string;
  sedEmal: string;
  sedDtm: string;
  emlTrnmStatCd: string;
  emlTnmRltCtn: string;
  emlBdyCtn: string;
  emlRcvrLstCtn: string;
  aprReqId: string;
  optValNm1: string;
  optValNm2: string;
  optValNm3: string;
  optValNm4: string;
  optValNm5: string;
}
