import React from "react";
import { SxProps, Theme, Box } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { Pagination } from "./pagination";
import { DotTagInfo, DotTagInfoProps } from "./dot-tag-info";
import { DataGridHeaderRightMember, DataGridWrapperHeaderRight } from "./wrapper-header";
import { DropdownOption } from "./dropdown-field";
import "ag-grid-community/styles/ag-grid.css";

export type LanguageType = "ko" | "en" | "zhC" | "zhT" | "pl";

export type DataGridProps = {
    gridRef?: React.RefObject<AgGridReact>;
    isHeaderSectionEnabled?: boolean;
    isPageSizeInput?: boolean;
    title?: string;
    hasPageSizeArea?: boolean;
    pageSize?: number;
    pageSizeOptions?: DropdownOption[];
    infoText?: string;
    dotTagInfo?: DotTagInfoProps;
    headerButton?: DataGridHeaderRightMember[];
    hasPaginationArea?: boolean;
    paginationButtonType?: "numbering" | "simple";
    suppressRowClickSelection?: boolean;
    removeSizeColumnsToFit?: boolean;
    sxOfWrapper?: SxProps<Theme>;
    sxOfHeaderLeft?: SxProps<Theme>;
    sxOfHeaderRight?: SxProps<Theme>;
    sxOfHeaderPageSize?: SxProps<Theme>;
    sxOfGrid?: SxProps<Theme>;
    gridHeight?: string;
    minGridHeight?: string;
    onChangePageSize?: (size: number) => void;
    rowHeight?: number;
    rowSelection?: "single" | "multiple";
    rowData?: any[];
    columnDefs?: any[];
    pagination?: boolean;
    overlayNoRowsTemplate?: string;
    emptyLabel?: string;
    onPaginationChanged?: () => void;
    onRowClicked?: () => void;
    onGridReady?: () => void;
    totalCount?: number;
    hasTotalCountArea?: boolean;
    currentPage?: number;
    onChangePage?: (page: number) => void;
    stopEditingWhenCellsLoseFocus?: boolean;
    language?: LanguageType;
    animateRows?: boolean; // Add this line to support `animateRows`
    suppressPaginationPanel?: boolean;
    defaultColDef?: any;
};

export const DataGrid: React.FC<DataGridProps> = ({
    gridRef,
    isHeaderSectionEnabled = true,
    isPageSizeInput = true,
    title,
    hasPageSizeArea,
    pageSizeOptions,
    pageSize = 15,
    infoText,
    dotTagInfo,
    headerButton,
    hasPaginationArea = true,
    paginationButtonType = "numbering",
    suppressRowClickSelection = false,
    removeSizeColumnsToFit = false,
    sxOfWrapper,
    sxOfHeaderLeft,
    sxOfHeaderRight,
    sxOfHeaderPageSize,
    sxOfGrid,
    gridHeight = "auto",
    minGridHeight = "calc(50vh)",
    onChangePageSize,
    rowHeight,
    rowSelection,
    rowData,
    columnDefs,
    pagination,
    overlayNoRowsTemplate,
    emptyLabel,
    onPaginationChanged,
    onRowClicked,
    onGridReady,
    totalCount,
    hasTotalCountArea = true,
    currentPage,
    onChangePage,
    stopEditingWhenCellsLoseFocus,
    language,
    animateRows,
    suppressPaginationPanel,
    defaultColDef,
    ...restProps
}) => {
    return (
        <Box sx={sxOfWrapper}>
            {isHeaderSectionEnabled && (
                <Box sx={sxOfHeaderLeft}>
                    {title && <h1>{title}</h1>}
                    {infoText && <p>{infoText}</p>}
                </Box>
            )}
            {hasPageSizeArea && (
                <Box sx={sxOfHeaderPageSize}>
                    {pageSizeOptions && (
                        <select value={pageSize} onChange={e => onChangePageSize?.(parseInt(e.target.value))}>
                            {pageSizeOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                </Box>
            )}
            {dotTagInfo && <DotTagInfo {...dotTagInfo} sx={sxOfHeaderRight} />}
            {headerButton && <DataGridWrapperHeaderRight dotInfo={dotTagInfo} buttonFamily={headerButton} sx={sxOfHeaderRight} />}
            <div
                style={{
                    height: gridHeight,
                    minHeight: minGridHeight,
                }}
            >
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    rowHeight={rowHeight}
                    rowSelection={rowSelection}
                    pagination={pagination}
                    overlayNoRowsTemplate={overlayNoRowsTemplate}
                    stopEditingWhenCellsLoseFocus={stopEditingWhenCellsLoseFocus}
                    onGridReady={onGridReady}
                    onRowClicked={onRowClicked}
                    onPaginationChanged={onPaginationChanged}
                    {...restProps}
                />
            </div>
            {hasPaginationArea && <Pagination totalPage={Math.ceil((totalCount ?? 0) / (pageSize ?? 15))} currentPage={currentPage} onPageChange={onChangePage} paginationButtonType={paginationButtonType} />}
            {emptyLabel && <p>{emptyLabel}</p>}
        </Box>
    );
};

export default DataGrid;
