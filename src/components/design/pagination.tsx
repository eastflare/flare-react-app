/** @jsxImportSource @emotion/react */
import React from "react";
import { Pagination as MuiPagination, PaginationProps as MuiPaginationProps } from "@mui/material";

export type PaginationButtonType = "numbering" | "simple";

export type PaginationProps = MuiPaginationProps & {
  totalPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  paginationButtonType?: PaginationButtonType;
};

export const Pagination: React.FC<PaginationProps> = ({ totalPage, currentPage, onPageChange, paginationButtonType = "numbering", ...rest }) => {
  return <MuiPagination count={totalPage} page={currentPage} showFirstButton showLastButton onChange={(event, page) => onPageChange?.(page)} {...rest} />;
};

export default Pagination;
