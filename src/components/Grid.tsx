import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { GridOptions } from 'ag-grid-community';

const Grid = ({data, option}) => {

  const gridOption: GridOptions = Object.assign({
    onGridReady: () => {},
    pagination: true,
    paginationPageSize: 5,
    paginationPageSizeSelector: false,
    paginationAutoPageSize: false,
  }, option);

  return (
    <div>
      <AgGridReact 
        columnDefs={data.columns}
        rowData={data.rows}
        className={"ag-theme-alpine"}
        domLayout={'autoHeight'}
        onGridReady={gridOption.onGridReady}
        pagination={gridOption.pagination}
        paginationPageSize={gridOption.paginationPageSize}
        paginationPageSizeSelector={gridOption.paginationPageSizeSelector}
        paginationAutoPageSize={gridOption.paginationAutoPageSize}
      />
    </div>
  );
};

export default Grid;