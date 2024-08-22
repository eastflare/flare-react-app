import { Env } from "config/env";
import MainRoutes from "./MainRoutes";
import styled from "@emotion/styled";
import WindowContainer from "@/components/layout/WindowContainer";
import MainContainer from "@/components/layout/MainContainer";

const env = Env.getInstance();
const isWindow = env.isWindow;
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

const StyledMainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default MainRouter;
