import { InputLabel } from "@mui/material";

interface RapInputLabelProps {
  required?: boolean;
  htmlFor?: string;
  children?: string;
}
const CustomInputLabel = ({ required = false, htmlFor, children }: RapInputLabelProps) => {
  return (
    <InputLabel
      required={required}
      htmlFor={htmlFor}
      sx={{
        display: "flex",
        alignItems: "center",
        paddingLeft: "4px",
        fontSize: "12px",
        "& .MuiInputLabel-asterisk": {
          display: "none",
        },
      }}
    >
      {required && <span style={{ color: "red", marginRight: "4px" }}>*</span>}
      {children}
    </InputLabel>
  );
};
export const RapInputLabel = (props: RapInputLabelProps) => <CustomInputLabel {...props} />;
