import { TypographyProps } from "@mui/material";

export type HelperTextUsecase = "default" | "error" | "warning" | "confirmed" | "primary";
export type HelperTextProps = TypographyProps & {
    infoText: string;
    usecase?: HelperTextUsecase;
    isTitle?: boolean;
    leadingIcon?: boolean;
};
export declare const HelperText: ({ infoText, usecase, isTitle, leadingIcon, ...rest }: HelperTextProps) => import("react/jsx-runtime").JSX.Element;
export default HelperText;
