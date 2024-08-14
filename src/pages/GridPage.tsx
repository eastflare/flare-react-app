import Grid from "components/Grid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { retrieveCars } from "@/mocks/gridHandlers";
import useFetch from "hooks/cmn/useFetch";
import { GreyButton } from "@/components/buttons/CustomButton";

const GridPage = () => {
  const data = useFetch(retrieveCars);

  const handleClickPopupGrid = () => {
    //TODO
  }
  
  return (
    <>
      <div>
        <GreyButton onClick={handleClickPopupGrid}>Popup Grid</GreyButton>
        <GreyButton onClick={handleClickPopupGrid}>Popup Grid</GreyButton>
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
