import styled from "@emotion/styled";
import { usePageRouterContext } from "contexts/cmn/PageRouterContext";
import PageTab from "./PageTab";

const PageTopBar = () => {
  const { pageTab, curPageTabId, onNavigatePageTab, onDeletePageTab } = usePageRouterContext();

  return (
    <StyledPageTopBar
      onContextMenu={e => {
        e.preventDefault();
        return false;
      }}
    >
      <StyledMDIContainer>
        {[...pageTab.keys()].map((key: string) => {
          let objPageTab = pageTab.get(key);
          let pageTabId = objPageTab?.id ?? "";
          let pageTabPath = objPageTab?.path ?? "";
          let pageTabLabel = objPageTab?.label ?? "";

          console.log("PageTopBar 현재 curPageTabId ", curPageTabId);

          return (
            <PageTab
              key={key}
              label={pageTabLabel}
              isActive={curPageTabId === pageTabId}
              onClose={onDeletePageTab(pageTabId)}
              onClick={() => onNavigatePageTab({ path: pageTabPath })}
              pageTabItem={pageTab.get(key)!}
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
