import { Env } from "config/env";
import MainRoutes from "./MainRoutes";
import styled from "@emotion/styled";
import WindowContainer from "components/cmn/Layout/WindowContainer";
import MainContainer from "components/cmn/Layout/MainContainer";
import useSessionStore from "@/stores/useSessionStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const env = Env.getInstance();
const isWindow = env.isWindow;
const PageContainer = isWindow ? WindowContainer : MainContainer;

const MainRouter = () => {
  const { userId } = useSessionStore();
  const isLogin = Boolean(userId);
  //const isLogin = true; //임시로 무조건 true
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);
  if (isLogin) {
    return (
      <StyledMainContainer>
        <PageContainer>
          <MainRoutes />
        </PageContainer>
      </StyledMainContainer>
    );
  }
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
