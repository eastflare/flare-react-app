import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const TopMenu = () => {
  return (
    <StyledHeader>
      <div className='topmenu'>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
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
