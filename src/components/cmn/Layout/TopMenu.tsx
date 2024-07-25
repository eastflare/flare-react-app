import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const TopMenu = ({ onToggleLeftMenu }: { onToggleLeftMenu: () => void }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    //TODO : 페이지 전체가 지원진다는 Confirm 창을 통해 실행 필요함

    window.location.replace("/");
  };

  return (
    <StyledHeader>
      <ToggleButton onClick={onToggleLeftMenu}>☰</ToggleButton>
      <div className='topmenu'>
        <nav>
          <ul>
            <li>
              <a href='/' onClick={handleLinkClick}>
                Home
              </a>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  display: flex;
  height: 50px;
  padding-right: 10px;
  position: relative;
  background-color: white;
  border-bottom: 1px solid black;
  transition: all 0.2s ease-out;
`;

const ToggleButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3e8e41;
  }
`;

export default TopMenu;
