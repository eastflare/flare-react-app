import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { GridOptions } from 'ag-grid-community';

const Grid = ({data, option}) => {

  const gridOption: GridOptions = Object.assign({
    pagination: true,
    paginationPageSize: 5,
    paginationPageSizeSelector: false,
    paginationAutoPageSize: false,
    domLayout: 'normal',
    onGridReady: () => {},
  }, option);

  return (
    <div>
      <AgGridReact 
        className={"ag-theme-alpine"}
        columnDefs={data.columns}
        rowData={data.rows}
        pagination={gridOption.pagination}
        paginationPageSize={gridOption.paginationPageSize}
        paginationPageSizeSelector={gridOption.paginationPageSizeSelector}
        paginationAutoPageSize={gridOption.paginationAutoPageSize}
        domLayout={gridOption.domLayout}
        onGridReady={gridOption.onGridReady}
      />
    </div>
  );
};

export default Grid;