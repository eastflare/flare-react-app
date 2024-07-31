import styled from "@emotion/styled";
import usePageTab from "hooks/cmn/usePageTab";
import PageTab from "./PageTab";
import { IconButton } from "components/buttons/CustomButton";
import { ReactSVG } from "react-svg";
import leftArrowIcon from "assets/img/leftArrow.svg";
import rightArrowIcon from "assets/img/rightArrow.svg";
import popupIcon from "assets/img/popup.svg";
import closeIcon from "assets/img/close.svg";

const PageTopBar = () => {
  const { openedPageMap, curPageId, onPageTabClick, onPageTabClose, onPageTabReset, onPageTabPopup } = usePageTab();

  const handleClickClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onPageTabReset();
  };

  const handleClickPopup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onPageTabPopup();
  };

  return (
    <StyledPageTopBar
      id='topBar'
      onContextMenu={e => {
        e.preventDefault();
        return false;
      }}
    >
      <StyledMDIContainer>
        {[...openedPageMap.keys()].map((key: string) => {
          let pageItem = openedPageMap.get(key);
          let pageLabel = pageItem?.label ?? "";

          console.log("key 가 어떻게 생겼나요?", key);

          return <PageTab key={key} pageId={key} label={pageLabel} isActive={curPageId === key} onClose={() => onPageTabClose(key)} onClick={() => onPageTabClick(key)} onPopup={() => onPageTabPopup()} />;
        })}
      </StyledMDIContainer>
      <StyledPageTopButtons>
        <IconButton className='leftArrow-button'>
          <ReactSVG src={leftArrowIcon} />
        </IconButton>
        <IconButton>
          <ReactSVG src={rightArrowIcon} />
        </IconButton>
        <IconButton className='popup-button' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClickPopup(e)}>
          <ReactSVG src={popupIcon} />
        </IconButton>
        <IconButton className='close-button' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClickClose(e)}>
          <ReactSVG src={closeIcon} />
        </IconButton>
      </StyledPageTopButtons>
    </StyledPageTopBar>
  );
};

export default PageTopBar;

const StyledPageTopBar = styled.div`
  height: 40px;
  background-color: #f7f9f8;
  border-bottom: 1px solid #ebeeed;
  box-shadow: #f0f0f0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledMDIContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const StyledPageTopButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  margin: 0;

  button {
    background-color: #f7f9f8;
    padding: 4px 8px;
    cursor: pointer;

    &:first-of-type {
      margin-left: 0;
    }

    &:hover {
      background-color: #f0f0f0;
    }

    &:active {
      background-color: #e0e0e0;
    }
  }

  .leftArrow-button {
    padding-top: 6px;
  }

  .popup-button {
    padding-top: 10px;
  }

  .close-button {
    padding-top: 8px;
  }
`;
