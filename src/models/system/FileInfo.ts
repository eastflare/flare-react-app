import { Crud } from "@/models/common/Edit";

export interface FileInfo extends Crud {
  atchFileGrId: string;
  atchFileId: string;
  atchFileNm: string;
  sortOrd: string;
  atchFileSaveLocDivsCd: string;
  atchFileSaveNm: string;
  atchFileSize: number;
  atchFileEfnmNm: string;
  atchFileSavePathCtn: string;
  atchFileTpCd: string | null;
  optValCtn1: string | null;
  optValCtn2: string | null;
  optValCtn3: string | null;
  optValCtn4: string | null;
  optValCtn5: string | null;
  useYn: string;
  newYn?: boolean;
  file?: Blob;
}
export enum FileSaveResult {
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
  NONE = "NONE",
}

export interface FileSaveResponse {
  atchFileGrId: string;
  fileSaveResult: FileSaveResult;
}

export type FileUploadResponse = {
  insertedRows?: number;
  updatedRows?: number;
  deletedRows?: number;
};
