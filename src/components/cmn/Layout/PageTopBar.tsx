import styled from "@emotion/styled";
import usePageTab from "hooks/cmn/usePageTab";
import PageTab from "./PageTab";

const PageTopBar = () => {
  //const { openedPageMap, curpageId, onNavigateopenedPageMap, onDeleteopenedPageMap } = usePageRouterContext();

  const { openedPageMap, curPageId, onPageTabClick, onPageTabClose } = usePageTab();

  return (
    <StyledPageTopBar
      onContextMenu={e => {
        e.preventDefault();
        return false;
      }}
    >
      <StyledMDIContainer>
        {[...openedPageMap.keys()].map((key: string) => {
          let pageItem = openedPageMap.get(key);
          let pageLabel = pageItem?.label ?? "";

          return (
            <PageTab
              key={key}
              label={pageLabel}
              isActive={curPageId === key}
              onClose={onPageTabClose(key)}
              onClick={() => onPageTabClick(key)}
            />
          );
        })}
      </StyledMDIContainer>
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
