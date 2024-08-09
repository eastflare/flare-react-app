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
    children?: React.ReactNode; // children 속성 추가
};

export const Button: React.FC<ButtonProps> = ({
    size = "medium",
    appearance = "contained",
    priority = "normal",
    iconPosition = "leading",
    iconComponent,
    iconSize,
    children, // children을 받도록 설정
    ...rest
}) => {
    const variant = appearance === "contained" ? "contained" : appearance === "outlined" ? "outlined" : "text";
    const color = priority === "primary" ? "primary" : undefined;

    const startIcon = iconPosition === "leading" ? iconComponent : undefined;
    const endIcon = iconPosition === "trailing" ? iconComponent : undefined;

    return (
        <MuiButton variant={variant} color={color} size={size} startIcon={startIcon} endIcon={endIcon} {...rest}>
            {children} {/* children을 렌더링 */}
        </MuiButton>
    );
};

export default Button;
