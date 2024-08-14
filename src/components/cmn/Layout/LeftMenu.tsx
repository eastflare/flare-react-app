import React from "react";
import { useNavigate } from "react-router-dom";

const LeftMenu = () => {
  const navigate = useNavigate();

  const handleClick = (path: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <div className='leftmenu'>
      <ul>
        <li>
          <a href='#' onClick={e => handleClick("/sample1", e)}>
            Sample1
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample2", e)}>
            Sample2
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample3", e)}>
            Sample3
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample4/eastflare", e)}>
            샘플4/:id 이
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample4/jscho128", e)}>
            샘플4/:id 조
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample5/eastflare/이현승?message=111&message2=222", e)}>
            샘플5/:id/:name 이
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample5/jscho128/조재성?message=333&message2=444&name=전선배", e)}>
            샘플5/:id/:name 조
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample6?message=ABCDEF", e)}>
            샘플6 메세지
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/sample6?message=bbb", e)}>
            샘플6 다른메세지
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/about", e)}>
            about
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/services", e)}>
            services
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/contact", e)}>
            contact
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/grid", e)}>
            AG-GRID
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/form", e)}>
            React-hook-form
          </a>
        </li>
        <li>
          <a href='#' onClick={e => handleClick("/loginLog", e)}>
            로그인로그
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LeftMenu;
