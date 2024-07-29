import { Env } from "config/env";
import MainRoutes from "./MainRoutes";
import styled from "@emotion/styled";
import WindowContainer from "components/cmn/Layout/WindowContainer";
import MainContainer from "components/cmn/Layout/MainContainer";

const MainRouter = () => {
  const env = Env.getInstance();

  const isWindow = env.isWindow;
  const isMdi = isWindow ? false : env.isMdi;

  return (
    <StyledMainContainer>
      {isWindow ? (
        <WindowContainer>
          <MainRoutes isMdi={isMdi} />
        </WindowContainer>
      ) : (
        <MainContainer>
          <MainRoutes isMdi={isMdi} />
        </MainContainer>
      )}
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
