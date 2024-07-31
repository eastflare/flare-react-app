import Grid from "components/Grid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { retrieveCars } from 'services/grid';
import useFetch from "hooks/cmn/useFetch";

const GridPage = () => {
  const data = useFetch(retrieveCars);

  return (
    <>
      <div>
        <h2>Grid page</h2>
        <p>The list of cars</p>
      </div>
      <Grid 
        data={data}
        options={{
          pagination: true,
          paginationPageSize: 5,
          onGridReady: () => console.log("READY!"),
        }}
      />
    </>
  );
};

export default GridPage;
