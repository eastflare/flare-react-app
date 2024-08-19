import { PaginationRequest } from "@/models/common/Pagination";

export interface MenuLogRequest extends PaginationRequest {
  contDtmFr: string;
  contDtmTo: string;
  searchItem: string;
}

export interface MenuLog {
  acesLogId: string;
  contDtm: string;
  mnuId: string;
  mnuNm: string;
  contUserId: string;
  empNm: string;
  contIp: string;
}
