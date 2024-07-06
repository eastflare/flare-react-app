import styled from "@emotion/styled";

const PageTopBar = () => {
  return <StyledMDIContainer></StyledMDIContainer>;
};

export default PageTopBar;

const StyledMDIContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 4px;
`;
