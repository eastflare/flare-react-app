/** @jsxImportSource @emotion/react */
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs, { Dayjs } from "dayjs";
import { ColDef } from "ag-grid-community";
import { ExcelDownloadRequest } from "@/models/common/Excel";
import { LoginLogRequest } from "@/models/system/LoginLog";
import { useLoginLogsQuery } from "@/hooks/queries/system/log/use-login-logs-query";
import { downLoadLogInLogListExcel } from "apis/system/LogExcelDownload";
import { GridHeight } from "components/design/grid-height";
import useLanguageStore from "@/stores/useLanguageStore";
import { Spacer } from "@/components/ui/common-ui";
import { keepPreviousData } from "@tanstack/react-query";
//import { FormItem } from "components/design/form-item";
//import InputField from "components/design/input-field";
//import { SearchArea } from "components/design/search-area";
import DataGrid from "components/design/data-grid";
import { DateRangePickerValueType, RapDatePickerValueType, RapDateRangePickerValueType } from "@/models/date/date-range-calendar";
import { Grid, Box, TextField, Button, InputLabel, Tooltip, Typography, Select, MenuItem } from "@mui/material";
import { getCalendarDate, getCalendarRange, isValidDateRangePickerValue } from "@/utils/DateUtil";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RapBasicDatePicker, RapFromToDatePicker } from "@/components/ui/rap/DatePickerTemp";
import { RapInputLabel } from "@/components/ui/rap/InputLabel";
import { RapTextField } from "@/components/ui/rap/TextField";
import "rsuite/dist/rsuite.min.css";
import { RapDateRangePicker } from "@/components/ui/rap/DateRangePicker";
import { RapDatePicker } from "@/components/ui/rap/DatePicker";
import { LanguageCode } from "@/models/common/Session";
import { RapSelect } from "@/components/ui/rap/Select";

type LoginLogSearchForm = {
  dates: RapDateRangePickerValueType;
  dates3: RapDatePickerValueType;
  searchItem?: string;
  langCd?: string | string[];
};

const LoginLogListPage = () => {
  const { t } = useTranslation();

  const { currentLanguage } = useLanguageStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCondition, setSearchConditon] = useState<LoginLogRequest>({
    contDtmFr: dayjs().add(-1, "month").format("YYYYMMDD").toString(),
    contDtmTo: dayjs().format("YYYYMMDD").toString(),
    searchItem: "",
    pageSize: "20",
  });

  const { data: fetchedLoginLogs } = useLoginLogsQuery(searchCondition, {
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!fetchedLoginLogs?.list?.length) {
      if (searchCondition.start) {
        setCurrentPage(1);
        setSearchConditon(() => {
          return {
            ...searchCondition,
            start: String(1),
          };
        });
      }
    }
  }, [fetchedLoginLogs]);

  const [pageSize, setPageSize] = useState(20);

  const DataRangePickerValue = z.custom<{ arg: DateRangePickerValueType | RapDateRangePickerValueType }>(
    val => {
      return isValidDateRangePickerValue(val);
    },
    {
      message: '${t("menu-log.label.접속일자를 다시 선택해 주세요", "__접속일자를 다시 선택해 주세요")}',
    }
  );
  const menuLogSearchSchema = z.object({
    dates: DataRangePickerValue,
    dates3: z
      .date()
      .nullable()
      .refine(val => val !== null, {
        message: "접속일자를 다시 선택해 주세요",
      }),
    searchItem: z.string().min(1, "사용자ID/명은 필수값 입니다"),
    langCd: z
      .nativeEnum(LanguageCode, {
        required_error: "언어를 반드시 선택하세요.",
      })
      .or(z.string().array().min(1, "언어를 반드시 선택하세요."))
      .or(z.string().min(1, "언어를 반드시 선택하세요.")),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    clearErrors,
    getValues,
  } = useForm<LoginLogSearchForm>({
    resolver: zodResolver(menuLogSearchSchema),
    defaultValues: {
      dates: getCalendarRange("month", -1),
      //dates2: [dayjs().add(-1, "month")],
      dates3: getCalendarDate("day", 0),
      searchItem: "",
      langCd: ["ko", "en"],
    },
  });

  const handleExcelDownload = async () => {
    //gridRef.current!.api.exportDataAsExcel();
    const execelData: ExcelDownloadRequest<LoginLogRequest> = {
      fileName: "로그인로그.xlsx",
      sheetName: "로그인로그",
      header: [
        t("login-log.column.로그인 일시", "__로그인 일시"),
        t("login-log.column.사용자ID", "__사용자ID"),
        t("login-log.column.사용자명", "__사용자명"),
        t("login-log.column.부서명", "__부서명"),
        t("login-log.column.접속IP", "__접속IP"),
      ],
      //과부하 방지 10000건만 출력
      searchCondition: { ...searchCondition, pageSize: "10000", start: "0" },
    };
    downLoadLogInLogListExcel(execelData);
  };

  const onChangePageSize = (size: number) => {
    setPageSize(size);
    const condition: LoginLogRequest = {
      ...searchCondition,
      start: String(size * (currentPage - 1)),
      pageSize: String(size),
    };
    setCurrentPage(1);
    setSearchConditon(condition);
  };
  const onChangePage = (page: number) => {
    const condition: LoginLogRequest = {
      ...searchCondition,
      start: String(parseInt(searchCondition.pageSize ?? "20") * (page - 1)),
    };
    setSearchConditon(condition);
    setCurrentPage(page);
  };

  const handleSearch = async (data: LoginLogSearchForm) => {
    const { dates, searchItem } = data;

    setSearchConditon({
      ...searchCondition,
      contDtmFr: dayjs(dates && dates[0] ? dates[0] : new Date())
        .format("YYYYMMDD")
        .toString(),
      contDtmTo: dayjs(dates && dates[1] ? dates[1] : new Date())
        .format("YYYYMMDD")
        .toString(),
      searchItem: searchItem || "",
      start: "0",
    });
    setCurrentPage(1);
  };

  const defaultColum: ColDef = {
    cellStyle: { textAlign: "center" },
    resizable: true,
    sortable: false,
  };

  const readOnly = true; //readonlyTest용

  const columnDefs: ColDef[] = [
    {
      width: 50,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "No",
      width: 60,
      cellStyle: { textAlign: "center" },
      cellRenderer: (params: any) => {
        return params.node.rowIndex + 1;
      },
    },
    {
      headerName: String(t("login-log.column.로그인 일시", "__로그인 일시")),
      field: "contDtm",
      width: 300,
    },
    {
      headerName: String(t("login-log.column.사용자ID", "__사용자ID")),
      field: "contUserId",
      width: 220,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: String(t("login-log.column.사용자명", "__사용자명")),
      field: "empNm",
      width: 200,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: String(t("login-log.column.부서명", "__부서명")),
      field: "deptNm",
      width: 200,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: String(t("login-log.column.접속IP", "__접속IP")),
      field: "contIp",
      width: 200,
      flex: 1,
      cellStyle: { textAlign: "center" },
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box component='form' onSubmit={handleSubmit(handleSearch)} mb={2} sx={{ border: "1px solid #dde0df", bgcolor: "#F7F9F8", padding: "20px 0px 20px 0", display: "flex", alignItems: "center" }}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Grid container spacing={2}>
                <Grid item xs={1} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                  <RapInputLabel htmlFor='userId' required={true}>
                    사용자ID/명
                  </RapInputLabel>
                </Grid>
                <Grid item xs={2}>
                  <Controller control={control} name='searchItem' render={({ field }) => <RapTextField {...field} id='userId' placeholder='업무는value값이겠죠(readonly)' readOnly={readOnly} />} />
                </Grid>
                <Grid item xs={1} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                  <RapInputLabel htmlFor='userId' required={true}>
                    사용자ID/명
                  </RapInputLabel>
                </Grid>
                <Grid item xs={2}>
                  <Controller control={control} name='searchItem' render={({ field }) => <RapTextField {...field} id='userId' placeholder='입력하세요' readOnly={false} />} />
                  {errors.searchItem && (
                    <Tooltip title={errors.searchItem.message} open={!!errors.searchItem} arrow>
                      <div></div>
                    </Tooltip>
                  )}
                </Grid>
                <Grid item xs={1} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                  <RapInputLabel htmlFor='selectTest' required={true}>
                    SELECT테스트
                  </RapInputLabel>
                </Grid>
                <Grid item xs={2}>
                  <Controller
                    control={control}
                    name='langCd'
                    render={({ field }) => (
                      <RapSelect
                        {...field}
                        id='selectTest'
                        label=''
                        value={field.value}
                        required={!!errors.langCd}
                        readonly={false}
                        message={errors.langCd?.message}
                        multiple={true}
                        selectItems={LanguageCode}
                        onValueChange={newValue => {
                          console.log("값이 변경되었습니다: ", newValue);
                        }}
                      ></RapSelect>
                    )}
                  />
                </Grid>
                <Grid item xs={1} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                  <RapInputLabel htmlFor='rangeCalendar' required={true}>
                    range달력rsuite
                  </RapInputLabel>
                </Grid>
                <Grid item xs={2}>
                  <Controller
                    control={control}
                    name='dates'
                    render={({ field }) => (
                      <RapDateRangePicker
                        {...field}
                        id='rangeCalendar'
                        date={field.value}
                        readonly={false}
                        required={!!errors.dates}
                        message={errors.dates?.message}
                        onValueChange={newValue => {
                          console.log("값이 변경되었습니다: ", newValue);
                        }}
                        changeDate={date => field.onChange(date)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={1} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                  <RapInputLabel htmlFor='singleCalendar' required={true}>
                    rsuite달력
                  </RapInputLabel>
                </Grid>
                <Grid item xs={2}>
                  <Controller
                    control={control}
                    name='dates3'
                    render={({ field }) => (
                      <RapDatePicker
                        {...field}
                        id='singleCalendar'
                        date={field.value}
                        readonly={false}
                        required={!!errors.dates3}
                        onValueChange={newValue => {
                          console.log("값이 변경되었습니다: ", newValue);
                        }}
                        changeDate={date => field.onChange(date)}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", paddingRight: "4px", flexDirection: "column", gap: "4px" }}>
              {/* flexDirection: direction === 'vertical' ? 'column' : 'row', */}
              <Button type='submit' variant='outlined' size='small' color='primary' sx={{ width: "70px" }}>
                검색
              </Button>
              <Button type='submit' variant='outlined' size='small' color='primary' sx={{ width: "70px" }}>
                검색2
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Spacer type='h' size='12' />
        <DataGrid
          gridHeight={GridHeight.SearchArea.Line4}
          minGridHeight={GridHeight.SearchArea.Line4}
          totalCount={fetchedLoginLogs?.totalCount}
          infoText={t("code.label.그리드 테스트 중 입니다.", "그리드 테스트 중 입니다.") ?? ""}
          currentPage={currentPage}
          onChangePage={onChangePage}
          title={String(t("login-log.label.로그인 로그 목록", "__로그인 로그 목록"))}
          isHeaderSectionEnabled={true}
          hasPageSizeArea={true}
          hasPaginationArea={true}
          pageSize={pageSize}
          rowHeight={30}
          onChangePageSize={onChangePageSize}
          animateRows={true}
          rowData={fetchedLoginLogs?.list}
          columnDefs={columnDefs}
          headerButton={[{ variant: "download", onClick: handleExcelDownload }]} //버튼 추가하고 싶으면 ','붙이면서 { variant: "add",label: '${t('common.label.행추가', '행추가')}', onClick: handleAdd } 이런거 추가하면 됨
          suppressPaginationPanel={true}
          defaultColDef={defaultColum}
          rowSelection='multiple'
          emptyLabel={t("common.label.조회 가능한 데이터가 없습니다.", "__조회 가능한 데이터가 없습니다.") ?? ""}
          sxOfWrapper={{
            display: "flex",
            flexDirection: "column",
            flex: "1 1 0%",
            width: "100%",
            height: "100%",
          }}
          sxOfGrid={{ display: "flex", flexDirection: "column", flex: "1 1 0%", height: "100%" }}
          language={currentLanguage}
        />
        <Spacer type='h' size='8' />
      </Box>
    </>
  );
  //return <></>;
};

export default LoginLogListPage;
