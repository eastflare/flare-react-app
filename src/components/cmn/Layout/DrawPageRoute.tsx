import { memo } from "react";
import type { RoutesProps, PathRouteProps } from "react-router";
import styled from "@emotion/styled";
import usePage from "hooks/cmn/usePage";
import { PageProvider } from "contexts/cmn/PageContext";

interface DisplayRouteProps extends PathRouteProps {
  routesProps: RoutesProps;
  display?: boolean;
}
function DrawPageRoute({ element, routesProps, display, ...props }: DisplayRouteProps) {
  //Page Id
  //Function 가공
  //페이지이동하는 함수

  //console.log("페이지에 넘어온 props", props);
  const { getPageProviderProps } = usePage();
  return (
    <StyledDisplayElement display={display ? `${display}` : undefined}>
      <PageProvider value={{ ...getPageProviderProps() }}>{element}</PageProvider>
    </StyledDisplayElement>
  );
}

const StyledDisplayElement = styled.div<{
  display?: string;
}>`
  display: ${props => (props.display ? "unset" : "none")};
`;

export default memo(DrawPageRoute);
