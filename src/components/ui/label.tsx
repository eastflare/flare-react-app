import React from "react";
import { Box, BoxProps, Typography } from "@mui/material";

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
    <Box component='label' display='inline-flex' alignItems='center' textAlign={textAlign} sx={{ ...sx }} {...rest}>
      {isRequired && (
        <Typography
          component='span'
          color='red'
          fontWeight='bold'
          fontSize='small'
          sx={{ mr: "4px" }} // 텍스트와 `*` 기호 사이의 간격 조정
        >
          *
        </Typography>
      )}
      <Typography variant='body2'>{labelText}</Typography>
      {children}
    </Box>
  );
};

export default Label;
