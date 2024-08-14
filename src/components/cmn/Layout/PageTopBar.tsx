import styled from "@emotion/styled";
import usePageTab from "hooks/cmn/usePageTab";
import PageTab from "./PageTab";
import { IconButton } from "components/buttons/CustomButton";
import { ReactSVG } from "react-svg";
import leftArrowIcon from "assets/img/leftArrow.svg";
import rightArrowIcon from "assets/img/rightArrow.svg";
import popupIcon from "assets/img/popup.svg";
import closeIcon from "assets/img/close.svg";
import { useRef } from "react";

const PageTopBar = () => {
  const { openedPageMap, curPageId, onPageTabClick, onPageTabClose, onPageTabReset, onPageTabPopup } = usePageTab();
  const mdiContainerRef = useRef<HTMLDivElement>(null); // MDI 컨테이너 참조

  const handleScrollLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (mdiContainerRef.current) {
      mdiContainerRef.current.scrollLeft -= 100; // 왼쪽으로 스크롤
    }
  };

  const handleScrollRight = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (mdiContainerRef.current) {
      mdiContainerRef.current.scrollLeft += 100; // 오른쪽으로 스크롤
    }
  };

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
      <StyledMDIContainer ref={mdiContainerRef}>
        {" "}
        {/* ref 연결 */}
        {[...openedPageMap.keys()].map((key: string) => {
          let pageItem = openedPageMap.get(key);
          let pageLabel = pageItem?.label ?? "";

          return <PageTab key={key} pageId={key} label={pageLabel} isActive={curPageId === key} onClose={() => onPageTabClose(key)} onClick={() => onPageTabClick(key)} onPopup={() => onPageTabPopup()} />;
        })}
      </StyledMDIContainer>
      <StyledPageTopButtons>
        <IconButton className='leftArrow-button' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleScrollLeft(e)}>
          <ReactSVG src={leftArrowIcon} />
        </IconButton>
        <IconButton className='rightArrow-button' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleScrollRight(e)}>
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
  overflow-x: hidden; /* 스크롤이 가능하도록 설정 */
  scroll-behavior: smooth; /* 부드럽게 스크롤되도록 설정 */
  white-space: nowrap; /* 탭들이 한 줄에 나란히 놓이도록 설정 */
`;

const StyledPageTopButtons = styled.div`
  position: absolute;
  right: 0;
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
    margin: 0; /* 버튼 간의 여백 제거 */

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

  .rightArrow-button {
    padding-top: 6px;
  }

  .popup-button {
    padding-top: 10px;
  }

  .close-button {
    padding-top: 8px;
  }
`;
