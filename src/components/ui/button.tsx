import React from "react";
import { Button as MuiButton } from "@mui/material";
import { ButtonProps as MuiButtonProps } from "@mui/material";
import { IconSize } from "components/icon/utils";

export type ButtonSize = "large" | "medium" | "small";
export type ButtonAppearance = "contained" | "outlined" | "unfilled" | "unfilledInverse";
export type ButtonPriority = "primary" | "normal";
export type ButtonIconPosition = "leading" | "trailing";

// ButtonProps 타입 정의
export type ButtonProps = Omit<MuiButtonProps, "startIcon" | "endIcon" | "variant" | "color"> & {
    size?: ButtonSize;
    appearance?: ButtonAppearance;
    priority?: ButtonPriority;
    iconPosition?: ButtonIconPosition;
    iconComponent?: React.ReactNode;
    iconSize?: IconSize;
    buttonLabel?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ size = "medium", appearance = "contained", priority = "normal", iconPosition = "leading", iconComponent, iconSize, buttonLabel, ...rest }) => {
    // MUI Button의 variant와 color를 appearance와 priority에 따라 설정
    const variant = appearance === "contained" ? "contained" : appearance === "outlined" ? "outlined" : "text";
    const color = priority === "primary" ? "primary" : undefined; // "default" 대신 undefined 사용

    // 아이콘 위치 설정
    const startIcon = iconPosition === "leading" ? iconComponent : undefined;
    const endIcon = iconPosition === "trailing" ? iconComponent : undefined;

    return (
        <MuiButton variant={variant} color={color} size={size} startIcon={startIcon} endIcon={endIcon} {...rest}>
            {buttonLabel}
        </MuiButton>
    );
};

export default Button;
