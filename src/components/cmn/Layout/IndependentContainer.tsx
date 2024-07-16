import { ReactNode } from "react";
import styled from "@emotion/styled";
import PageTopBar from "./PageTopBar";

const MainContainer = (props: { children: ReactNode }) => {
  //메인 화면의 레이아웃 구성
  //상단메뉴, 좌측메뉴, 화면영역은 children : Routes 객체임

  const { children } = props;
  const isLeftCollapsed = false;
  const showPageTopBar = false;

  return (
    <StyledMainContainer>
      <StyledMainBody>
        <StyledMainRight isLeftCollapsed={isLeftCollapsed}>
          {showPageTopBar ? <PageTopBar /> : null}
          <StyledMainPage showPageTopBar={showPageTopBar}>{children}</StyledMainPage>
        </StyledMainRight>
      </StyledMainBody>
    </StyledMainContainer>
  );
};

const StyledMainContainer = styled.div`
  /* width: 100%; */
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledMainBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: calc(100%-50px);
`;

const StyledMainRight = styled.div<{ isLeftCollapsed: boolean }>`
  flex-grow: 1;
  height: 100%;
  /* min-height는 StyleGlobalPage가 가짐 */
  width: ${({ isLeftCollapsed }) => (isLeftCollapsed ? "100%" : "calc(100% -150px)")};
  overflow-y: auto;
`;

const StyledMainPage = styled.div<{ showPageTopBar: boolean }>`
  width: 100%;
  height: ${({ showPageTopBar }) =>
    showPageTopBar ? "calc(100% -150px)" : "100%"}; //PageTopBar 높이 만큼 빼줌
  padding: 0;
`;

export default MainContainer;
