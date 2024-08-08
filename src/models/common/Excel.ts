export interface InfoForExcelConvertion {
  fileName: string;
  sheetName: string;
  header: string[];
  data: string[][];
}

export interface ExcelDownloadRequest<T> {
  fileName: string;
  sheetName: string;
  header: string[];
  searchCondition: T;
}
