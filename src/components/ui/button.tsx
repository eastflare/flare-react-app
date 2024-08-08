import { IconSize } from "components/icon/utils";
import { ButtonProps as MuiButtonProps } from "@mui/material";

export type ButtonSize = "large" | "medium" | "small";
export type ButtonAppearance = "contained" | "outlined" | "unfilled" | "unfilledInverse";
export type ButtonPriority = "primary" | "normal";
export type ButtonIconPosition = "leading" | "trailing";
export type ButtonProps = Omit<MuiButtonProps, "startIcon" | "endIcon" | "variant" | "color"> & {
    size?: ButtonSize;
    appearance?: ButtonAppearance;
    priority?: ButtonPriority;
    iconPosition?: ButtonIconPosition;
    iconComponent?: React.ReactNode;
    iconSize?: IconSize;
    buttonLabel?: React.ReactNode;
};
export declare const Button: (props: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export default Button;
