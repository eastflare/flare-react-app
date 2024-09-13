import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { BgColor } from "ui/theme/Color";
import { useSideBarMenus } from "@/hooks/layout/useSideBarMenus";
import { Button, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import useMenuNavigate from "@/hooks/layout/useMenuNavigate";
import { toAbsolutePath } from "@/utils/mainLayoutUtils";
import { TopMenuList } from "./TopMenuList";
import { useMenuContext } from "@/provider/menu-provider";

const TopMenu = ({ onToggleLeftMenu }: { onToggleLeftMenu: () => void }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // TODO: 페이지 전체가 지원진다는 Confirm 창을 통해 실행 필요함
    window.location.replace("/");
  };

  const { sideMenus } = useSideBarMenus();
  const { openPage } = useMenuNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [showToggle, setShowToggle] = useState(false);
  const open = Boolean(anchorEl);
  const menuContext = useMenuContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, menuId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedMenu(menuId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedMenu(null);
  };

  // useEffect(() => {
  //   if (menuContext.selectedHeaderMenu) {
  //     setShowToggle(true);
  //   }
  // }, [menuContext.selectedHeaderMenu]);

  return (
    <StyledHeader id='topMenu'>
      <LeftContainer>
        <ToggleButton
          showToggle={true}
          onClick={e => {
            const currentTarget = e.currentTarget;
            currentTarget.setAttribute("disabled", "true");
            onToggleLeftMenu();
            setTimeout(() => currentTarget.removeAttribute("disabled"), 10);
          }}
        >
          ☰
        </ToggleButton>
        <LogoContainer href='/' onClick={handleLinkClick}>
          <img src='GAP.png' alt='Logo' />
        </LogoContainer>
      </LeftContainer>
      <TopMenuItems>
        <TopMenuList></TopMenuList>
      </TopMenuItems>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0px;
  background-color: ${BgColor.Gray50};
  border-bottom: 1px solid #ddd;
  transition: all 0.2s ease-out;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
`;

const LogoContainer = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  img {
    max-height: 100%;
    max-width: 100%;
  }
`;

const ToggleButton = styled.button<{ showToggle: boolean }>`
  background-color: #2d9bb2;
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: ${({ showToggle }) => (showToggle ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 0px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3ab3bf;
  }
`;

const TopMenuItems = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  nav ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      margin: 0 10px;
      a {
        text-decoration: none;
        color: black;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

export default TopMenu;
