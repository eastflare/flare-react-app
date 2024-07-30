import { memo, useEffect } from "react";
import type { RoutesProps, PathRouteProps } from "react-router";
import styled from "@emotion/styled";
import usePage from "hooks/cmn/usePage";
import { PageProvider } from "contexts/cmn/PageContext";
import { PageItem } from "store/pageMapStore";
import PageModals from "./PageModals";
import PageHeaderLayout from "./PageHeaderLayout";

interface DisplayRouteProps extends PathRouteProps {
  routesProps: RoutesProps;
  pageItem: PageItem;
  display?: boolean;
}

function DrawPageMdiRoute({ element, pageItem, display, routesProps, ...props }: DisplayRouteProps) {
  //Page Id
  //Function 가공
  //페이지이동하는 함수
  //const { delPageCallback } = usePageCallbackStore();

  useEffect(() => {
    //해당 페이지가 죽을때 callback 이 있으면 제거해 줘야함
    return () => {
      //delPageCallback(pageItem.id);
    };
  }, []);

  console.log("페이지에 넘어온 routesProps 와 props", routesProps, props);
  const { getPageProviderProps } = usePage({ pageItem });
  return (
    <StyledDisplayElement display={display ? `${display}` : undefined}>
      <PageProvider value={{ ...getPageProviderProps() }}>
        <PageHeaderLayout />
        {element}
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

export default memo(DrawPageMdiRoute);
