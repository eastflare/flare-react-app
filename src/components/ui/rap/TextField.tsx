import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

type RapTextFieldProps = TextFieldProps & {
  id?: string;
  readOnly?: boolean;
};

const CustomTextField = forwardRef<HTMLInputElement, RapTextFieldProps>(({ id, readOnly = false, ...props }, ref) => {
  return (
    <TextField
      id={id}
      {...props}
      inputRef={ref}
      fullWidth
      inputProps={{
        ...props.inputProps,
        readOnly: readOnly,
      }}
      sx={{
        "& .MuiInputBase-root": {
          height: "28px",
          fontSize: "14px",
          backgroundColor: readOnly ? "transparent" : "#ffffff",
          border: readOnly ? "none" : undefined,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: readOnly ? "none" : undefined,
        },
      }}
    />
  );
});

export const RapTextField = forwardRef<HTMLInputElement, RapTextFieldProps>((props, ref) => <CustomTextField {...props} ref={ref} />);
