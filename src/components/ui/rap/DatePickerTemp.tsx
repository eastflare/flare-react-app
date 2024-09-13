import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateValidationError, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { BorderColor } from "ui/theme/Color";
import dayjs, { Dayjs } from "dayjs";
import useSessionStore from "stores/useSessionStore";

import "dayjs/locale/en";
import "dayjs/locale/ko";
import "dayjs/locale/zh-cn";
import "dayjs/locale/zh-tw";
import "dayjs/locale/pl";
import { useMemo, useState } from "react";
import { Tooltip } from "@mui/material";

interface RapDatePickerProps {
  id?: string;
  date?: Dayjs | null;
  mindate?: Dayjs | "today";
  maxdate?: Dayjs | "today";
  changeDate?: (date: Dayjs, id: string) => void;
  readonly?: boolean;
  isBasic?: boolean;
  required?: boolean;
  shouldDisableDate?: (date: Dayjs) => boolean;
}

const CustomDatePicker = ({ id, date, mindate, maxdate, changeDate, readonly, isBasic = false, required = false, shouldDisableDate }: RapDatePickerProps) => {
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (value: Dayjs | null) => {
    if (changeDate) changeDate(value as Dayjs, id ?? "");
    setIsTouched(true);

    if (required && !value) {
      setError("필수 입력 항목입니다.");
    } else {
      setError(null);
    }
  };

  const min = mindate === "today" ? dayjs() : mindate;
  const max = maxdate === "today" ? dayjs() : maxdate;
  const lang = useSessionStore.getState().langCd || "ko";

  const getLocaleCd = (langCd: string) => {
    switch (langCd) {
      case "zhC":
        return "zh-cn";
      case "zhT":
        return "zh-tw";
      default:
        return langCd;
    }
  };

  const setLocaleDateFormat = (langCd: string) => {
    switch (langCd) {
      case "en":
      case "pl":
        return "MMMM YYYY";
      case "zhC":
      case "zhT":
        return "YYYY年 MM月";
      default:
        return "YYYY년 MM월";
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={getLocaleCd(lang)} dateFormats={{ fullDate: setLocaleDateFormat(lang) }}>
      <DemoContainer
        components={["DatePicker"]}
        sx={{
          overflow: "hidden",
          padding: "0",
          flex: "1 auto",
          width: "auto",
        }}
      >
        <Tooltip title={error || ""} open={!!error && isTouched} arrow>
          <div>
            <DatePicker
              readOnly={readonly}
              value={date ?? null}
              onChange={handleDateChange}
              minDate={min}
              maxDate={max}
              format='YYYY-MM-DD'
              shouldDisableDate={shouldDisableDate}
              // slotProps={{
              //   textField: {
              //     helperText: error,
              //   },
              // }}
              sx={{
                "&": {
                  minWidth: "0 !important",
                  backgroundColor: readonly ? "transparent" : "white",
                  ".MuiOutlinedInput-input": {
                    width: isBasic ? "287px !important" : "105px !important",
                    marginLeft: "0 !important",
                    padding: "5px 0 5px 14px",
                    fontSize: "13px",
                  },
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: readonly ? "transparent !important" : "${BorderColor.Form} !important",
                    borderRadius: "2px",
                  },
                  ".MuiSvgIcon-root": {
                    fontSize: "20px",
                    color: "#444",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "0",
                  color: "#666 !important",
                  fontWeight: "inherit",
                  height: "32px",
                },
                "& .Mui-focused": {
                  ".MuiOutlinedInput-notchedOutline": {
                    borderWidth: readonly ? "0 !important" : "1px !important",
                  },
                },
                "& .": {
                  ".MuiOutlinedInput-notchedOutline": {
                    borderWidth: readonly ? "0 !important" : "1px !important",
                  },
                },
                "& .MuiSvgIcon-root": {
                  fontSize: "20px",
                  color: "#444",
                  visibility: readonly ? "hidden" : "visible",
                  cursor: readonly ? "default" : "pointer",
                },
              }}
            />
          </div>
        </Tooltip>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export const RapFromToDatePicker = (props: RapDatePickerProps) => <CustomDatePicker {...props} isBasic={false} />;

export const RapBasicDatePicker = (props: RapDatePickerProps) => <CustomDatePicker {...props} isBasic={true} />;
