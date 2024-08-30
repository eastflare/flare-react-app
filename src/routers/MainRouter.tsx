import { Env } from "config/env";
import WindowContainer from "@/components/layout/WindowContainer";
import MainContainer from "@/components/layout/MainContainer";
import { MenuProvider } from "@/contexts/MenuContext";
import useMenuProvider from "@/hooks/layout/useMenuProvider";
import PageContainer from "@/components/layout/PageContainer";

const env = Env.getInstance();
const isWindow = env.isWindow;
const PageLayoutContainer = isWindow ? WindowContainer : MainContainer;

const MainRouter = () => {
  const { getMenuProviderProps } = useMenuProvider();

  return (
    <MenuProvider value={{ ...getMenuProviderProps() }}>
      <PageLayoutContainer>
        <PageContainer />
      </PageLayoutContainer>
    </MenuProvider>
  );
};

export default MainRouter;
