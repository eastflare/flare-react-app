import { Env } from "config/env";
import styled from "@emotion/styled";
import WindowContainer from "@/components/layout/WindowContainer";
import MainContainer from "@/components/layout/MainContainer";
import MainRoutes from "@/routers/MainRoutes";
import { MenuProvider } from "@/contexts/MenuContext";
import useMenuProvider from "@/hooks/layout/useMenuProvider";

const env = Env.getInstance();
const isWindow = env.isWindow;
const PageContainer = isWindow ? WindowContainer : MainContainer;

const MainRouter = () => {
  const { getMenuProviderProps } = useMenuProvider(undefined);

  return (
    <StyledMainContainer>
      <MenuProvider value={{ ...getMenuProviderProps() }}>
        <PageContainer>
          <MainRoutes />
        </PageContainer>
      </MenuProvider>
    </StyledMainContainer>
  );
};

const StyledMainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default MainRouter;
