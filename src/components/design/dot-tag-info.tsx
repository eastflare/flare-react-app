// src/components/design/dot-tag-info.tsx
import React from "react";
import { SxProps, Theme, Typography, Box } from "@mui/material";

// DotTagInfo 타입 정의
export type DotTagInfo = {
    icon: React.ReactNode;
    label: string;
};

// DotTagInfoProps 타입 정의
export type DotTagInfoProps = {
    dots: DotTagInfo[];
    sx?: SxProps<Theme>;
};

// DotTagInfo 컴포넌트 구현
export const DotTagInfo: React.FC<DotTagInfoProps> = ({ dots, sx }) => {
    return (
        <Box sx={sx}>
            {dots.map((dot, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Box sx={{ mr: 1 }}>{dot.icon}</Box>
                    <Typography variant='body2'>{dot.label}</Typography>
                </Box>
            ))}
        </Box>
    );
};
