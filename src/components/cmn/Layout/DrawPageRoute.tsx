import { ReactElement, cloneElement, memo } from "react";
import { Routes, Route } from "react-router-dom";
import type { RoutesProps, PathRouteProps } from "react-router";
import styled from "@emotion/styled";

interface DisplayRouteProps extends PathRouteProps {
  routesProps: RoutesProps;
  display?: boolean;
}
function DrawPageRoute({ element, routesProps, display, ...props }: DisplayRouteProps) {
  console.log("display확인", display);

  const clonedElement = element && cloneElement(element as ReactElement, props);
  return (
    <>
      <StyledDisplayElement display={display ? `${display}` : undefined}>
        {clonedElement}
      </StyledDisplayElement>
    </>
  );
}

const StyledDisplayElement = styled.div<{
  display?: string;
}>`
  display: ${props => (props.display ? "unset" : "none")};
`;

export default memo(DrawPageRoute);
