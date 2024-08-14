/** @jsxImportSource @emotion/react */
import React from "react";
import { SxProps, Theme, Box } from "@mui/material";
import { DotTagInfoProps, DotTagInfo } from "./dot-tag-info";
import { GridHeaderButtonType, GridHeaderButton } from "./data-grid-wrapper-header-button";

// 타입 정의
export type DataGridHeaderRightMember = {
    variant: GridHeaderButtonType;
    hide?: boolean;
    label?: string;
    disabled?: boolean;
    customImage?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    sx?: SxProps<Theme>; // 여기서 sx 속성을 추가합니다.
};

export type DataGridWrapperHeaderRightProps = {
    dotInfo?: DotTagInfoProps;
    buttonFamily?: DataGridHeaderRightMember[];
    sx?: SxProps<Theme>;
};

// DataGridWrapperHeaderRight 컴포넌트 구현
export const DataGridWrapperHeaderRight: React.FC<DataGridWrapperHeaderRightProps> = ({ dotInfo, buttonFamily, sx }) => {
    return (
        <Box sx={sx}>
            {dotInfo && <DotTagInfo {...dotInfo} />}
            <Box sx={{ display: "flex", alignItems: "center" }}>
                {buttonFamily?.map(
                    (button, index) =>
                        !button.hide && (
                            <GridHeaderButton
                                key={index}
                                buttonType={button.variant}
                                label={button.label}
                                disabled={button.disabled}
                                onClick={button.onClick}
                                customImage={button.customImage}
                                sx={{ marginLeft: "8px", ...button.sx }} // button.sx 추가
                            />
                        )
                )}
            </Box>
        </Box>
    );
};

export default DataGridWrapperHeaderRight;
