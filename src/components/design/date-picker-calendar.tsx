// import { DateCalendarProps } from "components/design/date-calendar";
// import { DatePickerProps } from "components/design/date-picker";
// import { DateRangePickerProps } from "components/design/date-range-picker";
// import { MonthPickerProps } from "components/design/month-picker";
// import { YearPickerProps } from "components/design/year-picker";
// import { Dayjs } from "dayjs";
// import { InputFieldStatus } from "components/design/input-field";

// export type DatePickerCalendarUseCase = "date" | "month" | "year" | "date-range-single" | "date-range-multi";
// export type DatePickerBaseProps<T> = {
//     size?: "large" | "medium" | "small";
//     status?: "error" | "warning" | "confirmed" | "default";
//     elevation?: boolean;
//     value?: T;
//     statusInfo?: InputFieldStatus;
//     readOnly?: boolean;
//     disabled?: boolean;
// };
// export type DatePickerCalendarProps = Omit<DatePickerProps<Dayjs>, "type"> | Omit<DateRangePickerProps, "type"> | MonthPickerProps | YearPickerProps | DateCalendarProps<Dayjs>;
// export declare const DatePickerCalendar: ({ ...props }: DatePickerCalendarProps) => import("react/jsx-runtime").JSX.Element;
