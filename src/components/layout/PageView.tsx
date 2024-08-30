import { memo, useEffect } from "react";
import type { PathRouteProps } from "react-router";
import styled from "@emotion/styled";
import usePageProvider from "hooks/layout/usePageProvider";
import { PageProvider } from "contexts/PageContext";
import { PageItem } from "stores/usePageMapStore";
import PageModals from "./PageModals";
import PageHeader from "./PageHeader";

interface DisplayRouteProps extends PathRouteProps {
  pageItem: PageItem;
  display?: boolean;
}

function PageView({ element, pageItem, display }: DisplayRouteProps) {
  //Page Id
  //Function 가공
  //페이지이동하는 함수
  //const { delPageCallback } = usePageCallbackStore();

  useEffect(() => {
    console.log("페이지 그릴때 element", element);
    //해당 페이지가 죽을때 callback 이 있으면 제거해 줘야함
    return () => {
      //delPageCallback(pageItem.id);
    };
  }, []);

  const { getPageProviderProps } = usePageProvider({ pageItem });
  return (
    <StyledDisplayElement display={display ? `${display}` : undefined}>
      <PageProvider value={{ ...getPageProviderProps() }}>
        <StyledBodyElement>
          <PageHeader />
          {element}
        </StyledBodyElement>
        <PageModals />
      </PageProvider>
    </StyledDisplayElement>
  );
}

const StyledDisplayElement = styled.div<{
  display?: string;
}>`
  display: ${props => (props.display ? "unset" : "none")};
`;

const StyledBodyElement = styled.div`
  padding: 20px;
`;

export default memo(PageView);
