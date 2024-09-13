import { DateRangePickerValueType, RapDatePickerValueType, RapDateRangePickerValueType } from "@/models/date/date-range-calendar";
import dayjs from "dayjs";

export const isValidDateRangePickerValue = (dateRange: DateRangePickerValueType | RapDateRangePickerValueType | unknown) => {
  return Array.isArray(dateRange) && dateRange.length === 2 && dateRange.every(date => dayjs(date).isValid()) && (dayjs(dateRange[0]).isSame(dayjs(dateRange[1])) || dayjs(dateRange[0]).isBefore(dayjs(dateRange[1])));
};

export const getCalendarRange = (type: "month" | "year" | "day", num: number): [Date, Date] => {
  const today = new Date();
  const startDate = new Date();

  switch (type) {
    case "month":
      startDate.setMonth(today.getMonth() + num);
      break;
    case "year":
      startDate.setFullYear(today.getFullYear() + num);
      break;
    case "day":
      startDate.setDate(today.getDate() + num);
      break;
    default:
      break;
  }

  return [startDate, today];
};

export const getCalendarDate = (type: "month" | "year" | "day", num: number): Date => {
  const today = new Date();
  const resultDate = new Date();

  switch (type) {
    case "month":
      resultDate.setMonth(today.getMonth() + num);
      break;
    case "year":
      resultDate.setFullYear(today.getFullYear() + num);
      break;
    case "day":
      resultDate.setDate(today.getDate() + num);
      break;
    default:
      break;
  }

  return resultDate;
};
