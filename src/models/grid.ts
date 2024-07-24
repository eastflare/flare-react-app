export interface GridOption {
  pagination: boolean,
  paginationPageSize?: number,
  paginationPageSizeSelector?: boolean,
  onGridReady: () => void,
}