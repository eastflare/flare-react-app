import { styled } from "@mui/system";
import { BgColor } from "ui/theme/Color";
import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

// type TextFieldProps =

const CustomTextField = React.forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
  const { autoComplete = "off", ...otherProps }: TextFieldProps = props;
  return <TextField ref={ref} autoComplete={autoComplete} {...otherProps} />;
});

export const InputField = styled(CustomTextField)({
  ".MuiFormHelperText-root": {
    color: "red",
  },
  "background-color": `${BgColor.White}`,

  "& .MuiInputBase-input": {
    padding: 0,
  },
});

CustomTextField.displayName = "CustomTextField";
