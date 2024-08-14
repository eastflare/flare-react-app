/** @jsxImportSource @emotion/react */
import React from "react";
import { Button, ButtonProps } from "@mui/material";

// 타입 정의
export type GridHeaderButtonType = "add" | "download" | "refresh" | "delete" | "setting" | "upload" | "custom";

export type GridHeaderButtonProps = ButtonProps & {
    buttonType: GridHeaderButtonType;
    label?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    customImage?: React.ReactNode;
    sx?: object;
};

// GridHeaderButton 컴포넌트 구현
export const GridHeaderButton: React.FC<GridHeaderButtonProps> = ({ buttonType, label, disabled, onClick, customImage, sx, ...rest }) => {
    return (
        <Button variant='contained' disabled={disabled} onClick={onClick} sx={sx} {...rest}>
            {customImage || label}
        </Button>
    );
};

export default GridHeaderButton;
