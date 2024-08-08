import { PaginationRequest } from "models/common/Pagination";

export interface LoginLogRequest extends PaginationRequest {
  contDtmFr: string;
  contDtmTo: string;
  searchItem: string;
}

export interface LoginLog {
  contLogId: string;
  contDtm: string;
  contUserId: string;
  empNm: string;
  deptNm: string;
  contIp: string;
}
