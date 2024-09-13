import { Dayjs } from "dayjs";

export type DateRangePickerValueType = (Date | Dayjs | null) | [];

export type RapDateRangePickerValueType = [Date, Date] | null | undefined;

export type RapDatePickerValueType = Date | null | undefined;
