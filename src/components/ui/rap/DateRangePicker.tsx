import { Tooltip, Typography } from "@mui/material";
import { forwardRef, useState } from "react";
import { DateRangePicker } from "rsuite";
import "@/components/ui/rap/pickerStyle.css";

interface RapDateRangePickerProps {
  id?: string;
  date?: [Date, Date] | null;
  readonly?: boolean;
  required?: boolean;
  message?: string;
  onValueChange?: (value: [Date, Date]) => void;
  changeDate?: (date: [Date, Date], id: string) => void;
}

const CustomDateRangePicker = forwardRef<HTMLDivElement, RapDateRangePickerProps>(({ id, date, readonly = false, required = false, message, onValueChange, changeDate }, ref) => {
  const handleDateChange = (value: [Date, Date] | null) => {
    if (changeDate) changeDate(value as [Date, Date], id ?? "");
    if (onValueChange) onValueChange(value as [Date, Date]);
  };
  return (
    <div ref={ref}>
      <DateRangePicker id={id} plaintext={readonly} value={date} onChange={handleDateChange} />
      {required && (
        <Typography fontSize={"13px"} color={"#f54245"}>
          {message || "날짜를 입력해주세요"}
        </Typography>
      )}
    </div>
  );
});

export const RapDateRangePicker = forwardRef<HTMLDivElement, RapDateRangePickerProps>((props, ref) => <CustomDateRangePicker {...props} ref={ref} />);
