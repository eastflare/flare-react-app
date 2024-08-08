//import { DateRangePickerValueType } from "@lges/design-system";
import dayjs from "dayjs";

// export const isValidDateRangePickerValue = (dateRange: DateRangePickerValueType | unknown) => {
//   return Array.isArray(dateRange) && dateRange.length === 2 && dateRange.every(date => dayjs(date).isValid()) && (dayjs(dateRange[0]).isSame(dayjs(dateRange[1])) || dayjs(dateRange[0]).isBefore(dayjs(dateRange[1])));
// };

//임시로 처리함
export const isValidDateRangePickerValue = (dateRange: any) => {
  return Array.isArray(dateRange) && dateRange.length === 2 && dateRange.every(date => dayjs(date).isValid()) && (dayjs(dateRange[0]).isSame(dayjs(dateRange[1])) || dayjs(dateRange[0]).isBefore(dayjs(dateRange[1])));
};
