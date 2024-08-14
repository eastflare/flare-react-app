import { AutocompleteProps as MuiAutocompleteProps } from "@mui/material";
import { OptionListItemType, OptionUseCaseType } from "components/design/option-list-item";

export type DropdownOption = Omit<OptionListItemType, "selected" | "disabled" | "onClick" | "highlightFilter">;
export type DropdownUsecaseType = OptionUseCaseType | "input-field-search";
export type DropdownFieldProps<T> = Partial<Omit<MuiAutocompleteProps<T, boolean | undefined, boolean | undefined, boolean | undefined>, "size">> & {
    isInput?: boolean;
    options: T[];
    placeholder?: string;
    useClearIcon?: boolean;
    mandatory?: boolean;
    size?: "small" | "medium" | "large";
    usecase?: DropdownUsecaseType;
    inputSearchUsecase?: "text" | "chip-single" | "chips-multi";
    viewAllEvent?: () => void;
    status?: "error" | "warning" | "confirmed" | "default";
    optionWidth?: number;
    optionHeight?: number;
    onSearchClick?: () => void;
    onClick?: () => void;
    isOpenModal?: boolean;
};
export declare const DropdownField: <T>(props: DropdownFieldProps<T>) => import("react/jsx-runtime").JSX.Element;
export default DropdownField;
