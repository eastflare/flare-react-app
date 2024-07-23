import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Grid = ({data, option}) => {

  const gridOption = Object.assign({
    style: "ag-theme-alpine",
    pagination: false,
    paginationPageSize: 10,
    paginationPageSizeSelector: false,
    domLayout: 'autoHeight',
    onGridReady: () => {},
  }, option);

  return (
    <div>
      <AgGridReact 
        className={gridOption.style}
        columnDefs={data.columns}
        rowData={data.rows}
        pagination={gridOption.pagination}
        paginationPageSize={gridOption.paginationPageSize}
        paginationPageSizeSelector={gridOption.paginationPageSelector}
        domLayout={gridOption.domLayout}
        onGridReady={gridOption.onGridReady}
      />
    </div>
  );
};

export default Grid;