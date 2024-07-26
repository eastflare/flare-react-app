import styled from "@emotion/styled";
import usePageTab from "hooks/cmn/usePageTab";
import PageTab from "./PageTab";

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

          return <PageTab key={key} label={pageLabel} isActive={curPageId === key} onClose={() => onPageTabClose(key)} onClick={() => onPageTabClick(key)} onPopup={() => onPageTabPopup()} />;
        })}
      </StyledMDIContainer>
      <StyledPageTopButtons>
        <button>{"<"}</button>
        <button>{">"}</button>
        <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClickPopup(e)}>{"🗖"}</button>
        <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClickClose(e)}>{"X"}</button>
      </StyledPageTopButtons>
    </StyledPageTopBar>
  );
};

export default PageTopBar;

const StyledPageTopBar = styled.div`
  height: 40px;
  padding: 4px 4px;
  background-color: #ffffff;
  border-bottom: 1px solid #000000;
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
  column-gap: 4px;
`;

const StyledPageTopButtons = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
  align-items: center;

  button {
    background-color: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }

    &:active {
      background-color: #e0e0e0;
    }
  }
`;
