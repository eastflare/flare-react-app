import { memo, useEffect } from "react";
import type { RoutesProps, PathRouteProps } from "react-router";
import styled from "@emotion/styled";
import usePage from "hooks/cmn/usePage";
import { PageProvider } from "contexts/cmn/PageContext";
import { PageItem } from "store/pageMapStore";
import PageModals from "./PageModals";
import PageHeaderLayout from "./PageHeaderLayout";
<<<<<<< HEAD
import useWindowDimensions from "hooks/cmn/useWindowDimensions";
import { Env } from "config/env";
=======
>>>>>>> 63609065bb8b18b20e64fe36d472516b40cd129f

interface DisplayRouteProps extends PathRouteProps {
  routesProps: RoutesProps;
  pageItem: PageItem;
  display?: boolean;
}

const env = Env.getInstance();
const isMdi = env.isMdi;
const isWindow = env.isWindow;
let minusHeight = 0;

function DrawPageMdiRoute({ element, pageItem, display, routesProps, ...props }: DisplayRouteProps) {
  //Page Id
  //Function 가공
  //페이지이동하는 함수
  //const { delPageCallback } = usePageCallbackStore();

  useEffect(() => {
    //해당 페이지가 죽을때 callback 이 있으면 제거해 줘야함
    const topMenuL = document.getElementById("topMenu")?.offsetHeight ?? 0;
    const topBarL = document.getElementById("topBar")?.offsetHeight ?? 0;
    if (isMdi) {
      minusHeight = topMenuL + topBarL;
    } else if (!isMdi && !isWindow) {
      minusHeight = topMenuL + topBarL;
    }
    console.log("minusHeight", minusHeight);
    return () => {
      //delPageCallback(pageItem.id);
    };
  }, []);

  const { height } = useWindowDimensions();

  console.log("페이지에 넘어온 routesProps 와 props", routesProps, props);
  const { getPageProviderProps } = usePage({ pageItem });
  return (
    <StyledDisplayElement display={display ? `${display}` : undefined}>
      <PageProvider value={{ ...getPageProviderProps() }}>
<<<<<<< HEAD
        <StyledBodyElement windowHeight={height - minusHeight}>
          <PageHeaderLayout />
          {element}
        </StyledBodyElement>
=======
        <PageHeaderLayout />
        {element}
>>>>>>> 63609065bb8b18b20e64fe36d472516b40cd129f
        <PageModals />
      </PageProvider>
    </StyledDisplayElement>
  );
}

const StyledDisplayElement = styled.div<{
  display?: string;
}>`
  display: ${props => (props.display ? "unset" : "none")};
`;

const StyledBodyElement = styled.div<{ windowHeight?: number }>`
  height: ${props => props.windowHeight || 0}px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export default memo(DrawPageMdiRoute);
