/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { ColDef } from "ag-grid-community";
import { ExcelDownloadRequest } from "models/common/Excel";
import { LoginLogRequest } from "models/admin/LoginLog";
import { useLoginLogsQuery } from "@/hooks/queries/log/use-login-logs-query";
import { downLoadLogInLogListExcel } from "apis/admin/LogExcelDownload";
//import { GridHeight } from "@/components/data-grid";
import useLanguageStore from "@/stores/useLanguageStore";
//import { Spacer } from "@/components/ui/common-ui";
import { keepPreviousData } from "@tanstack/react-query";
//import { DataGrid, FormItem, InputField, SearchArea, DateRangePickerValueType } from "@lges/design-system";
import { Grid, Box } from "@mui/material";
import { isValidDateRangePickerValue } from "@/utils/DateUtil";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// type LoginLogSearchForm = {
//   dates: DateRangePickerValueType;
//   searchItem?: string;
// };

const LoginLogManagementPage = () => {
  // const { t } = useTranslation();

  // const { currentLanguage } = useLanguageStore();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [searchCondition, setSearchConditon] = useState<LoginLogRequest>({
  //   contDtmFr: dayjs().add(-1, "month").format("YYYYMMDD").toString(),
  //   contDtmTo: dayjs().format("YYYYMMDD").toString(),
  //   searchItem: "",
  //   pageSize: "20",
  // });

  // const { data: fetchedLoginLogs } = useLoginLogsQuery(searchCondition, {
  //   placeholderData: keepPreviousData,
  // });

  // useEffect(() => {
  //   if (!fetchedLoginLogs?.list?.length) {
  //     if (searchCondition.start) {
  //       setCurrentPage(1);
  //       setSearchConditon(() => {
  //         return {
  //           ...searchCondition,
  //           start: String(1),
  //         };
  //       });
  //     }
  //   }
  //   console.log("페이지 처음 실행!!!!!!!!!!!");
  // }, [fetchedLoginLogs]);

  // const [pageSize, setPageSize] = useState(20);

  // const DataRangePickerValue = z.custom<{ arg: DateRangePickerValueType }>(
  //   val => {
  //     return isValidDateRangePickerValue(val);
  //   },
  //   {
  //     message: `${t("menu-log.label.접속일자를 다시 선택해 주세요", "__접속일자를 다시 선택해 주세요")}`,
  //   }
  // );
  // const menuLogSearchSchema = z.object({
  //   dates: DataRangePickerValue,
  //   searchItem: z.string().optional(),
  // });

  // const {
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  //   getValues,
  // } = useForm<LoginLogSearchForm>({
  //   resolver: zodResolver(menuLogSearchSchema),
  //   defaultValues: {
  //     dates: [dayjs().add(-1, "month"), dayjs()],
  //     searchItem: "",
  //   },
  // });

  // const handleExcelDownload = async () => {
  //   const execelData: ExcelDownloadRequest<LoginLogRequest> = {
  //     fileName: "로그인로그.xlsx",
  //     sheetName: "로그인로그",
  //     header: [
  //       t("login-log.column.로그인 일시", "__로그인 일시"),
  //       t("login-log.column.사용자ID", "__사용자ID"),
  //       t("login-log.column.사용자명", "__사용자명"),
  //       t("login-log.column.부서명", "__부서명"),
  //       t("login-log.column.접속IP", "__접속IP"),
  //     ],
  //     //과부하 방지 10000건만 출력
  //     searchCondition: { ...searchCondition, pageSize: "10000", start: "0" },
  //   };
  //   downLoadLogInLogListExcel(execelData);
  // };

  // const onChangePageSize = (size: number) => {
  //   setPageSize(size);
  //   const condition: LoginLogRequest = {
  //     ...searchCondition,
  //     start: String(size * (currentPage - 1)),
  //     pageSize: String(size),
  //   };
  //   setCurrentPage(1);
  //   setSearchConditon(condition);
  // };
  // const onChangePage = (page: number) => {
  //   const condition: LoginLogRequest = {
  //     ...searchCondition,
  //     start: String(parseInt(searchCondition.pageSize ?? "20") * (page - 1)),
  //   };
  //   setSearchConditon(condition);
  //   setCurrentPage(page);
  // };

  // const handleSearch = handleSubmit(async ({ dates, searchItem }) => {
  //   setSearchConditon({
  //     ...searchCondition,
  //     contDtmFr:
  //       dayjs(dates ? dates[0] : getValues("dates")[0])
  //         .format("YYYYMMDD")
  //         .toString() || "",
  //     contDtmTo:
  //       dayjs(dates ? dates[1] : getValues("dates")[1])
  //         .format("YYYYMMDD")
  //         .toString() || "",
  //     searchItem: searchItem || "",
  //     start: "0",
  //   });
  //   setCurrentPage(1);
  //   console.log("조회 버튼 클릭!!!!!!!!!!");
  //   console.log(searchCondition);
  // });

  // const defaultColum: ColDef = {
  //   cellStyle: { textAlign: "center" },
  //   resizable: true,
  //   sortable: false,
  // };

  // const columnDefs: ColDef[] = [
  //   {
  //     headerName: String(t("login-log.column.로그인 일시", "__로그인 일시")),
  //     field: "contDtm",
  //     width: 300,
  //   },
  //   {
  //     headerName: String(t("login-log.column.사용자ID", "__사용자ID")),
  //     field: "contUserId",
  //     width: 220,
  //     cellStyle: { textAlign: "left" },
  //   },
  //   {
  //     headerName: String(t("login-log.column.사용자명", "__사용자명")),
  //     field: "empNm",
  //     width: 200,
  //     cellStyle: { textAlign: "left" },
  //   },
  //   {
  //     headerName: String(t("login-log.column.부서명", "__부서명")),
  //     field: "deptNm",
  //     width: 200,
  //     cellStyle: { textAlign: "left" },
  //   },
  //   {
  //     headerName: String(t("login-log.column.접속IP", "__접속IP")),
  //     field: "contIp",
  //     width: 200,
  //     flex: 1,
  //     cellStyle: { textAlign: "center" },
  //   },
  // ];

  // return (
  //   <>
  //     <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
  //       <Box width='100%'>
  //         <SearchArea
  //           conditions={
  //             <>
  //               <Grid item xs={6}>
  //                 <FormItem
  //                   label={`${t("login-log.label.접속일자", "__접속일자")}`}
  //                   labelAlign='right'
  //                   render={() => (
  //                     <Controller
  //                       control={control}
  //                       name='dates'
  //                       render={({ field: { ref, onChange, value, ...restField } }) => (
  //                         <InputField {...restField} type='date-range' value={value} onChange={onChange} afterDisable={dayjs()} size='medium' status={errors?.dates?.message ? "error" : "default"} />
  //                       )}
  //                     />
  //                   )}
  //                 />
  //               </Grid>
  //               <Grid item xs={6}>
  //                 <FormItem
  //                   label={`${t("login-log.label.사용자ID/명", "__사용자ID/명")}`}
  //                   labelAlign='right'
  //                   render={() => (
  //                     <Controller
  //                       control={control}
  //                       name='searchItem'
  //                       render={({ field: { ref, ...field } }) => (
  //                         <InputField
  //                           {...field}
  //                           inputRef={ref}
  //                           fullWidth
  //                           status={errors?.searchItem?.message ? "error" : "default"}
  //                           size='medium'
  //                           placeholder='입력하세요.'
  //                           onKeyUp={e => {
  //                             if (e.key === "Enter") handleSearch();
  //                           }}
  //                         />
  //                       )}
  //                     />
  //                   )}
  //                 />
  //               </Grid>
  //             </>
  //           }
  //           onSearch={handleSearch}
  //         />
  //       </Box>
  //       <Spacer type='h' size='12' />
  //       <DataGrid
  //         gridHeight={GridHeight.SearchArea.Line2}
  //         minGridHeight={GridHeight.SearchArea.Line2}
  //         totalCount={fetchedLoginLogs?.totalCount}
  //         currentPage={currentPage}
  //         onChangePage={onChangePage}
  //         title={String(t("login-log.label.로그인 로그 목록", "__로그인 로그 목록"))}
  //         isHeaderSectionEnabled={true}
  //         hasPageSizeArea={true}
  //         hasPaginationArea={true}
  //         pageSize={pageSize}
  //         rowHeight={25}
  //         onChangePageSize={onChangePageSize}
  //         headerButton={[{ variant: "download", onClick: handleExcelDownload }]}
  //         rowModelType='serverSide'
  //         animateRows={true}
  //         rowData={fetchedLoginLogs?.list}
  //         columnDefs={columnDefs}
  //         suppressPaginationPanel={true}
  //         defaultColDef={defaultColum}
  //         emptyLabel={t("common.label.조회 가능한 데이터가 없습니다.", "__조회 가능한 데이터가 없습니다.") ?? ""}
  //         sxOfWrapper={{
  //           display: "flex",
  //           flexDirection: "column",
  //           flex: "1 1 0%",
  //           width: "100%",
  //           height: "100%",
  //         }}
  //         sxOfGrid={{ display: "flex", flexDirection: "column", flex: "1 1 0%", height: "100%" }}
  //         language={currentLanguage}
  //       />
  //       <Spacer type='h' size='8' />
  //     </Box>
  //   </>
  // );
  return <></>;
};

export { LoginLogManagementPage };