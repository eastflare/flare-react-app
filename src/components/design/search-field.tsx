import React from "react";
import { DropdownField, DropdownFieldProps } from "./dropdown-field";
import { IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export type SearchFieldProps<T> = Omit<DropdownFieldProps<T>, "usecase"> & {
    type: "search";
    usecase: "text" | "chip-single" | "chips-multi";
    onSearchClick?: () => void;
};

export const SearchField = <T,>({ type, usecase, onSearchClick, ...props }: SearchFieldProps<T>) => {
    return (
        <DropdownField
            {...props}
            renderInput={params => (
                <div>
                    {params.InputProps?.startAdornment}
                    <input {...params.inputProps} />
                    <InputAdornment position='end'>
                        <IconButton onClick={onSearchClick}>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                </div>
            )}
        />
    );
};
