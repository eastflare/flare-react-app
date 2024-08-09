import React from "react";
import { Typography, TypographyProps } from "@mui/material";

// HelperText의 usecase 타입 정의
export type HelperTextUsecase = "default" | "error" | "warning" | "confirmed" | "primary";

// HelperText의 Props 타입 정의
export type HelperTextProps = TypographyProps & {
    infoText: string;
    usecase?: HelperTextUsecase;
    isTitle?: boolean;
    leadingIcon?: boolean;
};

// HelperText 컴포넌트 구현
export const HelperText: React.FC<HelperTextProps> = ({ infoText, usecase = "default", isTitle = false, leadingIcon = false, ...rest }) => {
    // usecase에 따른 색상 설정
    let color: string;
    switch (usecase) {
        case "error":
            color = "red";
            break;
        case "warning":
            color = "orange";
            break;
        case "confirmed":
            color = "green";
            break;
        case "primary":
            color = "blue";
            break;
        default:
            color = "black";
    }

    return (
        <Typography variant={isTitle ? "h6" : "body2"} color={color} display='flex' alignItems='center' {...rest}>
            {leadingIcon && (
                <span style={{ marginRight: "8px" }}>🔍</span> // 적절한 아이콘으로 교체 가능
            )}
            {infoText}
        </Typography>
    );
};

export default HelperText;
