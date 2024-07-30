import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { BgColor, FontColor } from "ui/theme/Color";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const pageHeaderLayout = () => {
  return (
    <>
      <HeaderSection>
        <h1>메뉴명</h1>
        <div className='breadcrumb'>
          <>
            <Link to='/'>Home</Link>
            <KeyboardArrowRightIcon />
            <Link to='/'>메뉴명1</Link>
            <KeyboardArrowRightIcon />
            <Link to='/'>메뉴명2</Link>
          </>
        </div>
      </HeaderSection>
    </>
  );
};

export default pageHeaderLayout;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 30px 0 25px;
  background-color: ${BgColor.White};
  transition: 0.5s;

  h1 {
    color: ${FontColor.Default};
    font-size: 18px;
    font-weight: bold;
  }

  .breadcrumb {
    font-size: 12px;
    font-weight: 400;
    color: ${FontColor.Primary};
    svg {
      margin: 0 2px;
      vertical-align: middle;
      fill: ${FontColor.Gray400};
      font-size: 14px;
    }
    span {
      font-weight: 500;
    }
  }
`;
