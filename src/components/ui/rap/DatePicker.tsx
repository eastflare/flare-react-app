import { Tooltip, Typography } from "@mui/material";
import { forwardRef, useState } from "react";
import { DatePicker } from "rsuite";
import "@/components/ui/rap/pickerStyle.css";

interface RapDatePickerProps {
  id?: string;
  date?: Date | null;
  readonly?: boolean;
  required?: boolean;
  message?: string;
  onValueChange?: (value: Date) => void;
  changeDate?: (date: Date, id: string) => void;
}

const CustomDatePicker = forwardRef<HTMLInputElement, RapDatePickerProps>(({ id, date, readonly = false, required = false, message, onValueChange, changeDate }, ref) => {
  const handleDateChange = (value: Date | null) => {
    if (changeDate) changeDate(value as Date, id ?? "");
    if (onValueChange) onValueChange(value as Date);
  };
  return (
    <div>
      <DatePicker id={id} plaintext={readonly} value={date} onChange={handleDateChange} size='sm' style={{ width: "500px" }} />
      {required && (
        <Typography fontSize={"13px"} color={"#f54245"}>
          {message || "날짜를 입력해주세요"}
        </Typography>
      )}
    </div>
  );
});

export const RapDatePicker = forwardRef<HTMLInputElement, RapDatePickerProps>((props, ref) => <CustomDatePicker {...props} ref={ref} />);
