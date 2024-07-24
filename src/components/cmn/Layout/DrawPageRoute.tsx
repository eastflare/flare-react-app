import { memo } from "react";
import type { RoutesProps, PathRouteProps } from "react-router";
import styled from "@emotion/styled";
import usePage from "hooks/cmn/usePage";
import { PageProvider } from "contexts/cmn/PageContext";
import { PageItem } from "store/pageMapStore";
import PageModals from "./PageModals";

interface DisplayRouteProps extends PathRouteProps {
  routesProps: RoutesProps;
  pageItem: PageItem;
  display?: boolean;
}

function DrawPageRoute({ element, pageItem, display, routesProps, ...props }: DisplayRouteProps) {
  //Page Id
  //Function 가공
  //페이지이동하는 함수

  console.log("페이지에 넘어온 routesProps 와 props", routesProps, props);
  const { getPageProviderProps } = usePage({ pageItem });
  return (
    <StyledDisplayElement display={display ? `${display}` : undefined}>
      <PageProvider value={{ ...getPageProviderProps() }}>
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

export default memo(DrawPageRoute);
