import styled from "@emotion/styled";
import usePageTab from "hooks/layout/usePageTab";
import PageTab from "./PageTab";
import { IconButton } from "components/buttons/CustomButton";
import { ReactSVG } from "react-svg";
import leftArrowIcon from "assets/img/leftArrow.svg";
import rightArrowIcon from "assets/img/rightArrow.svg";
import popupIcon from "assets/img/popup.svg";
import closeIcon from "assets/img/close.svg";
import { useRef } from "react";

const PageTabBar = () => {
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

  const handleTabClick = (key: string) => {
    onPageTabClick(key);

    // Ensure the clicked tab is fully visible
    if (mdiContainerRef.current) {
      const tabElement = document.getElementById(`tab-${key}`);
      if (tabElement) {
        const tabLeft = tabElement.offsetLeft;
        const tabRight = tabLeft + tabElement.offsetWidth;
        const containerLeft = mdiContainerRef.current.scrollLeft;
        const containerRight = containerLeft + mdiContainerRef.current.offsetWidth;

        // Adjust scroll to the right if the tab is partially out of view on the right
        if (tabRight > containerRight) {
          mdiContainerRef.current.scrollLeft += tabRight - containerRight;
        }
        // Adjust scroll to the left if the tab is partially out of view on the left
        else if (tabLeft < containerLeft) {
          mdiContainerRef.current.scrollLeft -= containerLeft - tabLeft;
        }
      }
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
    <StyledPageTabBar
      id='pageTabBar'
      onContextMenu={e => {
        e.preventDefault();
        return false;
      }}
    >
      <StyledMDIContainer ref={mdiContainerRef}>
        {[...openedPageMap.keys()].map((key: string) => {
          let pageItem = openedPageMap.get(key);
          let pageLabel = pageItem?.label ?? "";

          return (
            <PageTab
              key={key}
              pageId={key}
              id={`tab-${key}`} // 추가된 ID 속성
              label={pageLabel}
              isActive={curPageId === key}
              onClose={() => onPageTabClose(key)}
              onClick={() => handleTabClick(key)} // 클릭 핸들러 수정
              onPopup={() => onPageTabPopup()}
            />
          );
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
    </StyledPageTabBar>
  );
};

export default PageTabBar;

const StyledPageTabBar = styled.div`
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
  overflow-x: auto;
  scroll-behavior: smooth;
  white-space: nowrap;
  margin-right: 98px;
  -webkit-overflow-scrolling: touch; /* 모바일에서 부드러운 스크롤을 위해 추가 */
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
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
    padding-top: 4px;
  }

  .popup-button {
    padding-top: 10px;
  }

  .close-button {
    padding-top: 8px;
  }
`;
