import React, { useEffect } from "react";
import styled from "@emotion/styled";
import useMenuNavigate from "@/hooks/layout/useMenuNavigate";
import { useSideBarMenus } from "@/hooks/layout/useSideBarMenus";
import { useMenuContext } from "@/provider/menu-provider";
import useSessionStore from "@/stores/useSessionStore";
import { useTranslation } from "react-i18next";
import { LeftMenuList } from "./LeftMenuList";
import { css } from "@emotion/react";
import { BgColor, FontColor } from "@/ui/theme/Color";
import { useMenuContext as useLeftMenu } from "@/contexts/MenuContext";

const st = {
  root: (isClicked: boolean) => css`
    position: relative;
    z-index: 11;
    width: ${isClicked ? "240px" : "0"};
    height: calc(100vh - 52px);
    background-color: ${BgColor.Gray50};
    transition: 0.3s;
    border-right: 1px solid #ddd;
  `,

  iconList: css`
    width: 100%;
    height: 100%;
  `,

  accList: css`
    width: 100%;
    height: 100%;
    .pate-title {
      text-align: center;
      font-size: 15px;
      font-weight: bold;
      padding: 18px 14px;
      border-bottom: 1px solid #ddd;
      color: ${FontColor.Gray400};
    }
    overflow-y: auto;
  `,
  iconWrapper: css`
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

const LeftMenu = () => {
  const { openPage } = useMenuNavigate();
  const { sideMenus } = useSideBarMenus();
  const menuContext = useMenuContext();
  const { headerMenus } = useSessionStore();
  const { t } = useTranslation();
  const { setShowLeftMenu } = useLeftMenu();

  const handleClick = (path: string, title: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    openPage(path, {}, { title: title });
  };

  const getHeaderMenuName = (mnuId: string) => {
    const headerMenu = headerMenus.find(item => item.mnuId === mnuId);
    if (location.pathname === "/") {
      return "Home";
    }
    return String(t(`${headerMenu?.msgCtn}`, `__${headerMenu?.mnuNm}`));
  };

  useEffect(() => {
    if (menuContext.selectedHeaderMenu) {
      setShowLeftMenu(true);
    }
  }, [menuContext.selectedHeaderMenu]);

  return (
    <StyledMenuElement className='leftmenu'>
      <div css={st.accList}>
        <p className='pate-title'>{getHeaderMenuName(menuContext.selectedHeaderMenu)}</p>
        {getHeaderMenuName(menuContext.selectedHeaderMenu) !== "Home" && sideMenus.map(it => <LeftMenuList key={it.menuInfo.mnuId} summary={{ menuInfo: it.menuInfo }} content={it.children} isActive={false} />)}
      </div>
      {/* <ul>
        <li>
          <a href='#' onClick={e => handleClick("/sample/sample1", "메뉴명-Sample1", e)}>
            Sample1
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/sample2", "메뉴명-Sample2", e)}>
            Sample2
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/sample3", "메뉴명-Sample3", e)}>
            Sample3
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/sample4/eastflare", "메뉴명-Sample4-1", e)}>
            샘플4/:id 이
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/sample4/jscho128", "메뉴명-Sample4-2", e)}>
            샘플4/:id 조
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/sample5/eastflare/이현승?message=111&message2=222", "메뉴명-Sample5-1", e)}>
            샘플5/:id/:name 이
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/sample5/jscho128/조재성?message=333&message2=444&name=전선배", "메뉴명-Sample5-2", e)}>
            샘플5/:id/:name 조
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/sample6?message=ABCDEF", "메뉴명-Sample6-1", e)}>
            샘플6 메세지
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/sample6?message=bbb", "메뉴명-Sample6-2", e)}>
            샘플6 다른메세지
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/about", "메뉴명-About", e)}>
            About
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/service", "메뉴명-Services", e)}>
            Services
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/contact", "메뉴명-Contact", e)}>
            Contact
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/grid", "메뉴명-AG-GRID", e)}>
            AG-GRID
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/form", "메뉴명-React-hook-form", e)}>
            React-hook-form
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/system/page/page-list", "메뉴명-페이지 목록", e)}>
            페이지 목록
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/system/log/login-log-list", "메뉴명-로그인로그", e)}>
            로그인로그
          </a>
        </li>
      </ul> */}
    </StyledMenuElement>
  );
};

const StyledMenuElement = styled.div`
  width: 150px;
  overflow: hidden;
`;

export default LeftMenu;
