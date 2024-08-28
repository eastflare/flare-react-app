import { ReactNode, useState } from "react";
import TopMenu from "./TopMenu";
import LeftMenu from "./LeftMenu";
import styled from "@emotion/styled";
import PageTabBar from "./PageTabBar";
import { BgColor } from "ui/theme/Color";
import { Env } from "config/env";
import { useMenuContext } from "@/contexts/MenuContext";

const env = Env.getInstance();
const isMdi = env.isMdi;

const MainContainer = (props: { children: ReactNode }) => {
  //메인 화면의 레이아웃 구성
  //상단메뉴, 좌측메뉴, 화면영역은 children : Routes 객체임

  const { children } = props;
  const { showLeftMenu, setShowLeftMenu } = useMenuContext();

  const handleToggleLeftMenu = () => {
    setShowLeftMenu(prevState => !prevState);
  };

  return (
    <StyledMainContainer>
      <StyledMainHeader>
        <TopMenu onToggleLeftMenu={handleToggleLeftMenu} />
      </StyledMainHeader>
      <StyledMainBody>
        <StyledMainLeft id='leftMenu' showLeftMenu={showLeftMenu} showPageTabBar={isMdi}>
          <LeftMenu />
        </StyledMainLeft>
        <StyledMainRight showLeftMenu={showLeftMenu}>
          {isMdi ? <PageTabBar /> : null}
          <StyledMainPage id='mainBody' showPageTabBar={isMdi}>
            {children}
          </StyledMainPage>
        </StyledMainRight>
      </StyledMainBody>
    </StyledMainContainer>
  );
};

const StyledMainHeader = styled.div``;

// border-left: 1px solid ${props => props.theme.palette.color.divider + "04"}; --> #32cd32
// border-right: 1px solid ${props => props.theme.palette.color.divider}; --> #800000

const StyledMainContainer = styled.div`
  /* width: 100%; */
  height: 100%;
  display: flex;
  flex-direction: column;
  /* border-left: 1px solid #32cd32;
  border-right: 1px solid #800000; */
`;

const StyledMainBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: calc(100vh - 50px);
`;

const StyledMainLeft = styled.div<{ showLeftMenu: boolean; showPageTabBar: boolean }>`
  width: ${({ showLeftMenu }) => (showLeftMenu ? "0px" : "150px")};
  min-width: ${({ showLeftMenu }) => (showLeftMenu ? "0px" : "150px")};
  height: calc(100vh - 50px);
  transition: 0.3s;
  border-right: 1px solid #ddd;
  background-color: ${BgColor.Gray50};
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
`;

const StyledMainRight = styled.div<{ showLeftMenu: boolean }>`
  flex-grow: 1;
  width: ${({ showLeftMenu }) => (showLeftMenu ? "100%" : "calc(100vh - 150px)")};
  height: 100%;
`;

const StyledMainPage = styled.div<{ showPageTabBar: boolean }>`
  width: 100%;
  height: ${({ showPageTabBar }) => (showPageTabBar ? "calc(100vh - 90px)" : "100%")};
  overflow-x: hidden;
  overflow-y: auto;
`;

export default MainContainer;
