import { GridOptions, RowClassParams, RowStyle } from "ag-grid-community";
import { CrudCode } from "models/common/Edit";

export const crudKeyRowStyle = (params: RowClassParams): RowStyle => {
  const crudKey = params["data"]["crudKey"];

  const backgroundColorMap: { [key in CrudCode]: string } = {
    C: "rgba(71, 96, 255, 0.05)",
    R: "",
    U: "rgba(17, 171, 17, 0.05)",
    D: "",
  };

  return {
    backgroundColor: backgroundColorMap[crudKey],
  } as RowStyle;
};

export const AgGridCommonConfig: GridOptions = {
  animateRows: true,
  singleClickEdit: true,
  stopEditingWhenCellsLoseFocus: true,
};

export const arrangeChangedGridData = (rowData: any[], id: string) => {
  return rowData.sort((a, b) => {
    if (a.crudKey !== CrudCode.READ && b.crudKey === CrudCode.READ) {
      return -1;
    }
    if (a.crudKey === CrudCode.READ && b.crudKey !== CrudCode.READ) {
      return 1;
    }
    if ((a[id] === null || a[id] === undefined) && b[id] !== null && b[id] !== undefined) {
      return -1;
    }
    if (a[id] !== null && a[id] !== undefined && (b[id] === null || b[id] === undefined)) {
      return 1;
    }
    return 0;
  });
};
