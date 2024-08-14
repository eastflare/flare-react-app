/** @jsxImportSource @emotion/react */
import React from "react";
import { Box, Typography, FormHelperText, BoxProps } from "@mui/material";

type FormFieldProps = {
    status?: "error" | "warning" | "confirmed" | "default";
};

type FormItemProps = BoxProps & {
    label?: string;
    helperText?: string;
    status?: "error" | "warning" | "confirmed" | "default";
    variant?: "horizontal" | "vertical";
    required?: boolean;
    showHelperTextIcon?: boolean;
    render: (props: FormFieldProps) => JSX.Element;
    labelSize?: "short" | "middle" | "long";
    labelAlign?: "left" | "right";
};

export const FormItem: React.FC<FormItemProps> = ({ variant = "vertical", label, required = false, helperText, showHelperTextIcon = false, status = "default", render, labelSize = "middle", labelAlign = "left", ...restBoxProps }) => {
    return (
        <Box
            {...restBoxProps}
            sx={{
                display: variant === "horizontal" ? "flex" : "block",
                alignItems: variant === "horizontal" ? "center" : "flex-start",
                ...restBoxProps.sx, // 추가적인 BoxProps 적용
            }}
        >
            {label && (
                <Typography
                    variant='body1'
                    component='label'
                    sx={{
                        fontWeight: required ? "bold" : "normal",
                        textAlign: labelAlign,
                        width: labelSize === "short" ? "100px" : labelSize === "middle" ? "200px" : "300px",
                        marginRight: variant === "horizontal" ? 2 : 0,
                        marginBottom: variant === "vertical" ? 1 : 0,
                    }}
                >
                    {label}
                    {required && <span style={{ color: "red" }}>*</span>}
                </Typography>
            )}
            <Box sx={{ flex: 1 }}>
                {render({ status })}
                {helperText && (
                    <FormHelperText
                        sx={{
                            marginTop: 1,
                            display: "flex",
                            alignItems: "center",
                            color: status === "error" ? "error.main" : status === "warning" ? "warning.main" : "text.secondary",
                        }}
                    >
                        {showHelperTextIcon && <span style={{ marginRight: 4 }}>ⓘ</span>}
                        {helperText}
                    </FormHelperText>
                )}
            </Box>
        </Box>
    );
};
