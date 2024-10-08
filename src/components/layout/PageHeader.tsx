import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { BgColor, FontColor } from "ui/theme/Color";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { usePageContext } from "contexts/PageContext";
import { IconButton } from "components/buttons/CustomButton";
import refreshIcon from "assets/img/refresh.svg";
import { ReactSVG } from "react-svg";

const PageHeader = () => {
  const { setRefreshCount } = usePageContext();

  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1);
  };

  return (
    <HeaderSection>
      <h1>메뉴명</h1>
      <div className='right-section'>
        <div className='breadcrumb'>
          <Link to='/'>Home</Link>
          <KeyboardArrowRightIcon />
          <Link to='/'>메뉴명1</Link>
          <KeyboardArrowRightIcon />
          <Link to='/'>메뉴명2</Link>
        </div>
        <IconButton onClick={handleRefresh} className='refresh-button'>
          <ReactSVG src={refreshIcon} />
        </IconButton>
      </div>
    </HeaderSection>
  );
};

export default PageHeader;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background-color: ${BgColor.White};
  transition: 0.5s;

  h1 {
    color: ${FontColor.Default};
    font-size: 18px;
    font-weight: bold;
  }

  .right-section {
    display: flex;
    align-items: center;
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

  .refresh-button {
    color: ${FontColor.Default};
    margin-top: 10px;
  }
`;
