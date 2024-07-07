import MainRoutes from "./MainRoutes";
import styled from "@emotion/styled";

const MainRouter = () => {
  return (
    <StyledMainContainer>
      <MainRoutes />
    </StyledMainContainer>
  );
};

// const StyledGlobalContainer = styled.div`
//   height: "inherit";
//   min-height: "inherit";
//   max-width: "100%";
//   width: 100%;
//   min-width: "800px";
//   padding: 0;
// `;

const StyledMainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default MainRouter;
