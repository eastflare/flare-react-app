import useWindowDimensions from "@/hooks/cmn/useWindowDimensions";
import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const LeftMenu = () => {
  const navigate = useNavigate();
  const { topMenuHeight, windowHeight } = useWindowDimensions();
  const menuHeight = windowHeight - topMenuHeight;

  const handleClick = (path: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <StyledMenuElement className='leftmenu' bodyHeight={menuHeight}>
      <ul>
        <li>
          <a href='#' onClick={e => handleClick("/sample/sample1", e)}>
            Sample1
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/sample2", e)}>
            Sample2
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/sample3", e)}>
            Sample3
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/sample4/eastflare", e)}>
            샘플4/:id 이
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/sample4/jscho128", e)}>
            샘플4/:id 조
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/sample5/eastflare/이현승?message=111&message2=222", e)}>
            샘플5/:id/:name 이
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/sample5/jscho128/조재성?message=333&message2=444&name=전선배", e)}>
            샘플5/:id/:name 조
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/sample6?message=ABCDEF", e)}>
            샘플6 메세지
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/sample6?message=bbb", e)}>
            샘플6 다른메세지
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/about", e)}>
            about
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/services", e)}>
            services
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/contact", e)}>
            contact
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/grid", e)}>
            AG-GRID
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample/form", e)}>
            React-hook-form
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/system/page/page-list", e)}>
            페이지 목록
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/system/page/login-log-list", e)}>
            로그인로그
          </a>
        </li>
      </ul>
    </StyledMenuElement>
  );
};

const StyledMenuElement = styled.div<{ bodyHeight?: number }>`
  height: ${props => props.bodyHeight || 0}px;
  overflow-y: auto;
  overflow-x: hidden;

  /* 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
    opacity: 0; /* 초기 상태에서 스크롤바를 숨김 */
    transition: opacity 0.3s; /* 부드러운 전환 효과 */
  }

  /* 스크롤바 영역에 마우스 hover 시 스크롤바 표시 */
  &:hover {
    ::-webkit-scrollbar {
      opacity: 1; /* hover 시 스크롤바 표시 */
    }
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d0d0d0; /* 연한 회색으로 스크롤바 색상 */
    border-radius: 4px; /* 스크롤바의 모서리 둥글기 */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #b0b0b0; /* 연한 회색으로 hover 색상 */
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1); /* 연한 배경색 */
  }
`;

export default LeftMenu;
