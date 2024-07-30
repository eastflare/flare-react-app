import { Env } from "config/env";
import MainRoutes from "./MainRoutes";
import styled from "@emotion/styled";
import WindowContainer from "components/cmn/Layout/WindowContainer";
import MainContainer from "components/cmn/Layout/MainContainer";

console.log("최상원이 찍으라고해서 찍음 MainRouter");
const env = Env.getInstance();
const isWindow = env.isWindow;
console.log("이즈윈도우", isWindow);
const PageContainer = isWindow ? WindowContainer : MainContainer;

const MainRouter = () => {
  return (
    <StyledMainContainer>
      <PageContainer>
        <MainRoutes />
      </PageContainer>
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
