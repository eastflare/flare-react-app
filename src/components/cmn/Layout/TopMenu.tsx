import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const TopMenu = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    //TODO : 페이지 전체가 지원진다는 Confirm 창을 통해 실행 필요함

    window.location.replace("/");
  };

  return (
    <StyledHeader>
      <button>좌측접기펴기</button>
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

export default TopMenu;
