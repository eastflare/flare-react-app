import { Crud } from "@/models/common/Edit";

export interface ApprovalTemplate extends Crud {
  aprTplId: string;
  intgAprTpCd: string;
  aprTplNm: string;
  sortOrd: number;
  aprTplDesc: string;
  useYn: string;
  prsDesc: string;
  ntdkId: number;
  wcstUseYn: string;
  wcstDesc: string;
  notfUseYn: string;
  mgrUseYn: string;
}
