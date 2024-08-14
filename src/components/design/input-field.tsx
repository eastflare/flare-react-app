// import React from "react";
// import { TextField, TextFieldProps } from "./text-field";
// import { TimePicker, TimePickerProps } from "./time-picker";
// import { SearchField, SearchFieldProps } from "./search-field";
// import { DatePicker, DatePickerProps } from "./date-picker";
// import { DateRangePicker, DateRangePickerProps } from "./date-range-picker";

// export type InputFieldStatus = {
//     icon?: React.ReactNode;
//     color?: string;
//     borderColor?: string;
// };

// export type InputFieldBaseProps = {
//     readOnly?: boolean;
//     disabled?: boolean;
//     size?: "large" | "medium" | "small";
//     status?: "error" | "warning" | "confirmed" | "default";
// };

// export type InputFieldType = "text" | "textarea" | "search" | "date-range" | "date" | "time";

// export type InputFieldProps =
//     | (TextFieldProps & { type: "text" | "textarea" })
//     | (TimePickerProps & { type: "time" })
//     | (SearchFieldProps<any> & { type: "search" })
//     | (Omit<DatePickerProps<any>, "usecase"> & { type: "date" })
//     | (Omit<DateRangePickerProps, "usecase"> & { type: "date-range" });

// export const InputField: React.FC<InputFieldProps> = props => {
//     switch (props.type) {
//         case "text":
//         case "textarea":
//             return <TextField {...props} />;
//         case "time":
//             return <TimePicker {...props} />;
//         case "search":
//             return <SearchField {...props} />;
//         case "date":
//             return <DatePicker {...props} />;
//         case "date-range":
//             return <DateRangePicker {...props} />;
//         default:
//             return null;
//     }
// };

// export default InputField;
