import React from 'react';
import { useNavigate } from 'react-router-dom';

const LeftMenu = () => {
  const navigate = useNavigate();

  const handleClick = (
    path: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <div className='leftmenu'>
      <ul>
        <li>
          <a href='#' onClick={(e) => handleClick('/sample1', e)}>
            Sample1
          </a>
        </li>
        <li>
          <a href='#' onClick={(e) => handleClick('/sample2', e)}>
            Sample2
          </a>
        </li>
        <li>
          <a href='#' onClick={(e) => handleClick('/sample3', e)}>
            Sample3
          </a>
        </li>
        <li>
          <a href='#' onClick={(e) => handleClick('/about', e)}>
            about
          </a>
        </li>
        <li>
          <a href='#' onClick={(e) => handleClick('/services', e)}>
            services
          </a>
        </li>
        <li>
          <a href='#' onClick={(e) => handleClick('/contact', e)}>
            contact
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LeftMenu;
