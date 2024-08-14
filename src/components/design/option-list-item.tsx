import React from "react";

export type OptionUseCaseType = "basic" | "recent" | "detailed" | "key-in" | undefined;

export type OptionListItemDefaultType = {
    label: string;
    value: string;
    multiLine?: "Yes" | "No";
    selected?: boolean;
    disabled?: boolean;
    children?: OptionListItemType[] | undefined;
    onClick?: (label?: string) => void;
};

export type OptionListItemAdditionalType = {
    figures?: number;
    statusColor?: string;
    icon?: React.ReactNode;
    highlightFilter?: {
        text: string;
        highlight: boolean;
    }[];
};

export type OptionListItemType = OptionListItemDefaultType & OptionListItemAdditionalType;

export type OptionListType = {
    selectedList?: string[];
    width?: number;
    maxHeight?: number;
    type?: "single" | "multiple" | "none";
    props?: React.HTMLAttributes<HTMLLIElement>;
    usecase?: OptionUseCaseType;
};

export const OptionListItem: React.FC<OptionListItemType & OptionListType> = ({ label, value, multiLine, selected, disabled, onClick, figures, statusColor, icon, highlightFilter, selectedList, width, maxHeight, type, props, usecase }) => {
    const handleClick = () => {
        if (onClick && !disabled) {
            onClick(label);
        }
    };

    return (
        <li
            {...props}
            onClick={handleClick}
            style={{
                cursor: disabled ? "not-allowed" : "pointer",
                backgroundColor: selected ? "lightgray" : "white",
                width: width,
                maxHeight: maxHeight,
            }}
        >
            {icon}
            {label}
            {figures && <span>{figures}</span>}
        </li>
    );
};
