import React from "react";
import styled from "@emotion/styled";
import useMenuNavigate from "@/hooks/layout/useMenuNavigate";

const LeftMenu = () => {
  const { openPage } = useMenuNavigate();

  const handleClick = (path: string, title: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    openPage(path, {}, { title: title });
  };

  return (
    <StyledMenuElement className='leftmenu'>
      <ul>
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
      </ul>
    </StyledMenuElement>
  );
};

const StyledMenuElement = styled.div`
  height: 100%;
`;

export default LeftMenu;
