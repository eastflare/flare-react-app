/** @jsxImportSource @emotion/react */
import React from "react";
import { Box, Button, MenuItem, Select, Typography, BoxProps, SelectChangeEvent } from "@mui/material";

type SearchAreaProps = BoxProps & {
    searchButtonLabel?: string;
    isHidden?: boolean;
    myOptions?: string[];
    onSearch?: () => void;
    onResetCondition?: () => void;
    onSelectedMyOption?: (val?: string) => void;
    onSaveOption?: () => void;
    conditions?: React.ReactNode;
    extraConditions?: React.ReactNode;
};

export const SearchArea: React.FC<SearchAreaProps> = ({ searchButtonLabel = "Search", isHidden = false, sx, myOptions = [], onSearch, onResetCondition, onSaveOption, onSelectedMyOption, conditions, extraConditions, ...restBoxProps }) => {
    if (isHidden) return null;

    const handleOptionChange = (event: SelectChangeEvent<string>) => {
        if (onSelectedMyOption) {
            onSelectedMyOption(event.target.value);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, ...sx }} {...restBoxProps}>
            {conditions && <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>{conditions}</Box>}
            {extraConditions && <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>{extraConditions}</Box>}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: 2 }}>
                <Button variant='contained' color='primary' onClick={onSearch}>
                    {searchButtonLabel}
                </Button>
                {onResetCondition && (
                    <Button variant='outlined' color='secondary' onClick={onResetCondition}>
                        Reset
                    </Button>
                )}
                {onSaveOption && (
                    <Button variant='outlined' color='primary' onClick={onSaveOption}>
                        Save Option
                    </Button>
                )}
                {myOptions.length > 0 && (
                    <Select value='' displayEmpty onChange={handleOptionChange} sx={{ minWidth: 120 }}>
                        <MenuItem value='' disabled>
                            Select an option
                        </MenuItem>
                        {myOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            </Box>
        </Box>
    );
};
