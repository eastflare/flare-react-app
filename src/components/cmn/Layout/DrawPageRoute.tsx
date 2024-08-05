import { memo, useEffect } from "react";
import type { RoutesProps, PathRouteProps } from "react-router";
import styled from "@emotion/styled";
import usePage from "hooks/cmn/usePage";
import { PageProvider } from "contexts/cmn/PageContext";
import { PageItem } from "store/pageMapStore";
import PageModals from "./PageModals";
import useWindowDimensions from "hooks/cmn/useWindowDimensions";
import PageHeaderLayout from "./PageHeaderLayout";

interface DisplayRouteProps extends PathRouteProps {
  routesProps: RoutesProps;
  pageItem: PageItem;
  display?: boolean;
}

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
    minusHeight = topMenuL + topBarL;
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
        <StyledBodyElement windowHeight={height - minusHeight}>
          <PageHeaderLayout />
          {element}
        </StyledBodyElement>
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
