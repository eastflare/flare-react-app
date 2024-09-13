import React from "react";
import { SxProps, Theme, Box } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { Pagination } from "./pagination";
import { DotTagInfo, DotTagInfoProps } from "./dot-tag-info";
import { DataGridHeaderRightMember, DataGridWrapperHeaderRight } from "./wrapper-header";
import { DropdownOption } from "./dropdown-field";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { InfoOutlined } from "@mui/icons-material";

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
  totalCount?: number;
  hasTotalCountArea?: boolean;
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
  currentPage?: number;
  onChangePage?: (page: number) => void;
  stopEditingWhenCellsLoseFocus?: boolean;
  language?: LanguageType;
  animateRows?: boolean; // Add this line to support 'animateRows'
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
  totalCount,
  hasTotalCountArea = true,
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
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", ...sxOfHeaderLeft }}>
            {title && <h3>{title}</h3>}
            {totalCount !== undefined && hasTotalCountArea && (
              <p style={{ marginLeft: "4px", fontSize: "13px" }}>
                총<span style={{ color: "#2D9BB2" }}>{totalCount}</span>건
              </p>
            )}
            {infoText && (
              <>
                <InfoOutlined sx={{ fontSize: "1.1rem", color: "#979998" }} />
                <span style={{ color: "#979998" }}>{infoText}</span>
              </>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>{headerButton && <DataGridWrapperHeaderRight dotInfo={dotTagInfo} buttonFamily={headerButton} sx={sxOfHeaderRight} />}</Box>
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
      <div
        className='ag-theme-alpine'
        style={{
          height: gridHeight,
          minHeight: minGridHeight,
        }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection={rowSelection}
          pagination={pagination}
          overlayNoRowsTemplate={overlayNoRowsTemplate}
          stopEditingWhenCellsLoseFocus={stopEditingWhenCellsLoseFocus}
          onGridReady={onGridReady}
          onRowClicked={onRowClicked}
          onPaginationChanged={onPaginationChanged}
          rowHeight={rowHeight}
          suppressRowClickSelection={suppressRowClickSelection}
          {...restProps}
        />
      </div>
      {hasPaginationArea && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
          <Pagination totalPage={Math.ceil((totalCount ?? 0) / (pageSize ?? 15))} currentPage={currentPage} onPageChange={onChangePage} paginationButtonType={paginationButtonType} />
        </Box>
      )}
      {!rowData && <p>{emptyLabel}</p>}
    </Box>
  );
};

export default DataGrid;
