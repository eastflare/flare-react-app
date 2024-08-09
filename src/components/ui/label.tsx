// label.d.ts에서 제공하는 타입을 참고하여 Label 컴포넌트 작성
import React from "react";
import { Box, BoxProps } from "@mui/material";

// label.d.ts에서 정의된 Props를 가져옴
interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  isRequired?: boolean;
  depth?: "default" | "sub";
  labelText?: string;
  tooltipIcon?: boolean;
  tooltipTitle?: string;
  children?: React.ReactNode;
}

export type LabelProps = Props & Omit<BoxProps, keyof Props>;

export const Label: React.FC<LabelProps> = ({ isRequired, labelText, depth = "default", tooltipIcon, tooltipTitle, children, textAlign = "left", sx, ...rest }) => {
  return (
    <Box component='label' textAlign={textAlign} sx={{ ...sx }} {...rest}>
      {labelText} {isRequired && "*"}
      {children}
    </Box>
  );
};

export default Label;
