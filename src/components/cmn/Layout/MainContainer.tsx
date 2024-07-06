import { ReactNode } from "react";
import TopMenu from "./TopMenu";
import LeftMenu from "./LeftMenu";
import styled from "@emotion/styled";
import PageTopBar from "./PageTopBar";

const MainContainer = (props: { children: ReactNode }) => {
  //메인 화면의 레이아웃 구성
  //상단메뉴, 좌측메뉴, 화면영역은 children : Routes 객체임

  const { children } = props;
  const isLeftCollapsed = false;
  const showPageTopBar = true;

  return (
    <StyledMainContainer>
      <StyledMainHeader>
        <TopMenu />
      </StyledMainHeader>
      <StyledMainBody>
        <StyledMainLeft isCollapsed={isLeftCollapsed}>
          <LeftMenu />
        </StyledMainLeft>
        <StyledMainRight isLeftCollapsed={isLeftCollapsed}>
          {showPageTopBar ? <PageTopBar /> : null}
          <StyledMainPage showPageTopBar={showPageTopBar}>{children}</StyledMainPage>
        </StyledMainRight>
      </StyledMainBody>
    </StyledMainContainer>
  );
};

const StyledMainHeader = styled.div``;

// border-left: 1px solid ${props => props.theme.palette.color.divider + "04"}; --> #32cd32
// border-right: 1px solid ${props => props.theme.palette.color.divider}; --> #800000

const StyledMainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #32cd32;
  border-right: 1px solid #800000;
`;

const StyledMainBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: calc(100%-50px);
`;

const StyledMainLeft = styled.div<{ isCollapsed: boolean }>`
  width: ${({ isCollapsed }) => (isCollapsed ? "0px" : "250px")};
  min-width: ${({ isCollapsed }) => (isCollapsed ? "0px" : "250px")};
  transition: all 0.2s ease-out;
  border-right: 1px solid #32cd32;
  background-color: #f0f0f0;
  box-shadow: 0 8px 8px #00000026;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
`;

const StyledMainRight = styled.div<{ isLeftCollapsed: boolean }>`
  flex-grow: 1;
  height: 100%;
  /* min-height는 StyleGlobalPage가 가짐 */
  width: ${({ isLeftCollapsed }) => (isLeftCollapsed ? "100%" : "calc(100% -250px)")};
  overflow-y: auto;
`;

const StyledMainPage = styled.div<{ showPageTopBar: boolean }>`
  width: 100%;
  height: ${({ showPageTopBar }) =>
    showPageTopBar ? "calc(100% -250px)" : "100%"}; //PageTopBar 높이 만큼 빼줌
  padding: 0;
`;

export default MainContainer;
