import { ReactNode } from "react";
import styled from "@emotion/styled";

const WindowContainer = (props: { children: ReactNode }) => {
  const { children } = props;
  return <StyledMainPage>{children}</StyledMainPage>;
};

const StyledMainPage = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 0;
`;

export default WindowContainer;
