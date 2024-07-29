import useToast from "hooks/cmn/useToast";
import { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { CellClickedEvent, ColDef } from "ag-grid-community";
import { usePageContext } from "contexts/cmn/PageContext";
import { BlueButton } from "components/buttons/CustomButton";

const MyModal = () => {
  const [text, setText] = useState("");
  const { myToast } = useToast();
  const { callback, close } = usePageContext();
  const [rowData, setRowData] = useState();
  const gridRef = useRef<AgGridReact>(null);

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then(result => result.json())
      .then(rowData => setRowData(rowData));
    console.log("최루팡 렌더링가링가링......");
    return () => {
      console.log("최루팡 다이");
    };
  }, []);

  const columns: ColDef[] = [
    {
      width: 50,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "No",
      width: 80,
      cellStyle: { textAlign: "center" },
      cellRenderer: (params: any) => {
        return params.node.rowIndex + 1;
      },
    },
    {
      field: "make",
      headerName: "메이커",
      width: 150,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "model",
      headerName: "모델명",
      width: 200,
      cellStyle: { textAlign: "left" },
      flex: 1,
    },
    {
      field: "price",
      headerName: "가격",
      width: 200,
      cellStyle: { textAlign: "right" },
    },
  ];

  const defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  const cellClickedListener = (e: CellClickedEvent) => {
    if (e.colDef.field === "price") {
      console.log(e.api.getSelectedRows());
      alert(e.colDef.field + "클릭함!!");
    }
  };

  const handleClickSubmit = () => {
    callback();
    myToast("saved");
    close();
  };

  const handleClickCancel = () => {
    close();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <>
      <h1>최XX</h1>
      <input type='text' value={text} onChange={onChange} />
      <h2>이력 : </h2>
      <ul>
        <li>도토리 받고 개발 전문</li>
        <li>알고리즘 전문가</li>
        <li>기본이 된사람</li>
      </ul>
      <h2>별명 : </h2>
      <ul>
        <li>개NullNull</li>
        <li>월급루팡</li>
        <li>걸어다니는 리액트 백과사전</li>
      </ul>
      <div>
        <BlueButton onClick={handleClickSubmit} onGotPointerCapture={handleClickSubmit}>
          확인
        </BlueButton>
        <BlueButton onClick={handleClickCancel} onGotPointerCapture={handleClickCancel}>
          취소
        </BlueButton>
      </div>
      <div className='ag-theme-alpine' style={{ width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection='multiple'
          onCellClicked={cellClickedListener}
          domLayout='autoHeight'
          pagination={true}
          paginationPageSize={10}
        ></AgGridReact>
      </div>
    </>
  );
};

export default MyModal;
