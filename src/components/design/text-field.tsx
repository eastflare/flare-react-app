// import React from "react";
// import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";
// import { InputFieldBaseProps, InputFieldStatus } from "components/design/input-field";

// export type TextFieldProps = Omit<MuiTextFieldProps, "size" | "value"> &
//     InputFieldBaseProps & {
//         type?: "text" | "textarea" | "number";
//         statusInfo?: InputFieldStatus;
//         textAlign?: "left" | "right";
//         textLimit?: boolean;
//         limited?: number;
//         defaultValue?: string | number;
//         value?: string | number;
//         onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
//         isPassword?: boolean;
//         height?: number;
//     };

// export const TextField: React.FC<TextFieldProps> = ({ disabled, readOnly, status, size, type = "text", multiline, sx, value, textLimit, limited, textAlign = "left", statusInfo, defaultValue, onChange, isPassword, height, ...rest }) => {
//     return (
//         <MuiTextField
//             disabled={disabled}
//             value={value}
//             onChange={onChange}
//             inputProps={{
//                 readOnly,
//                 style: { textAlign: textAlign, height: height },
//                 maxLength: textLimit ? limited : undefined,
//             }}
//             type={isPassword ? "password" : type}
//             multiline={multiline}
//             sx={sx}
//             {...rest}
//         />
//     );
// };
