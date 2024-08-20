import { memo, useEffect } from "react";
import type { RoutesProps, PathRouteProps } from "react-router";
import styled from "@emotion/styled";
import usePage from "hooks/cmn/usePage";
import { PageProvider } from "contexts/cmn/PageContext";
import { PageItem } from "stores/usePageMapStore";
import PageModals from "./PageModals";
import useWindowDimensions from "hooks/cmn/useWindowDimensions";
import PageHeaderLayout from "./PageHeaderLayout";

interface DisplayRouteProps extends PathRouteProps {
  routesProps: RoutesProps;
  pageItem: PageItem;
  display?: boolean;
}

function DrawPageMdiRoute({ element, pageItem, display, routesProps, ...props }: DisplayRouteProps) {
  //Page Id
  //Function 가공
  //페이지이동하는 함수
  //const { delPageCallback } = usePageCallbackStore();

  useEffect(() => {
    //해당 페이지가 죽을때 callback 이 있으면 제거해 줘야함
    return () => {
      //delPageCallback(pageItem.id);
    };
  }, []);

  const { pageHeight } = useWindowDimensions();

  console.log("페이지에 넘어온 routesProps 와 props", routesProps, props);
  const { getPageProviderProps } = usePage({ pageItem });
  return (
    <StyledDisplayElement display={display ? `${display}` : undefined}>
      <PageProvider value={{ ...getPageProviderProps() }}>
        <StyledBodyElement pageHeight={pageHeight}>
          <PageHeaderLayout />
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

const StyledBodyElement = styled.div<{ pageHeight?: number }>`
  height: ${props => props.pageHeight || 0}px;
  overflow-y: auto;
  overflow-x: hidden;

  /* 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
    opacity: 0; /* 초기 상태에서 스크롤바를 숨김 */
    transition: opacity 0.3s; /* 부드러운 전환 효과 */
  }

  /* 스크롤바 영역에 마우스 hover 시 스크롤바 표시 */
  &:hover {
    ::-webkit-scrollbar {
      opacity: 1; /* hover 시 스크롤바 표시 */
    }
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d0d0d0; /* 연한 회색으로 스크롤바 색상 */
    border-radius: 4px; /* 스크롤바의 모서리 둥글기 */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #b0b0b0; /* 연한 회색으로 hover 색상 */
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1); /* 연한 배경색 */
  }
`;

export default memo(DrawPageMdiRoute);
