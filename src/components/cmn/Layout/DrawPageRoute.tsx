import { memo } from "react";
import { Routes, Route } from "react-router-dom";
import type { RoutesProps, PathRouteProps } from "react-router";
import styled from "@emotion/styled";

interface DisplayRouteProps extends PathRouteProps {
  routesProps: RoutesProps;
  display?: boolean;
}
function DrawPageRoute({ element, routesProps, display, ...props }: DisplayRouteProps) {
  return (
    <>
      <StyledDisplayElement children={element} display={display ? "${display}" : undefined} />
      <Routes {...routesProps}>
        <Route {...props} element={null} />
      </Routes>
    </>
  );
}

const StyledDisplayElement = styled.div<{
  display?: string;
}>`
  display: ${props => (props.display ? "unset" : "none")};
`;

export default memo(DrawPageRoute);
