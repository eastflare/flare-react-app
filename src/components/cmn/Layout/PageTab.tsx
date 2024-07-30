import styled from "@emotion/styled";
import usePageTab from "hooks/cmn/usePageTab";
import { useEffect, useRef } from "react";
import usePageMapStore, { PageItem } from "store/pageMapStore";

interface PageTabProps {
  label: string;
  onClick: (...args: any[]) => void;
  onClose: (e?: MouseEvent) => void;
  onPopup: () => void;
  isActive: boolean;
}

const PageTab = ({ label, onClick, onClose, isActive }: PageTabProps) => {
  const { curPageId, getPageItem } = usePageMapStore();
  const { onPageTabPopup } = usePageTab();
  const isNotClosable = ["Home"].includes(label);
  // Inside the PageTab component
  const tabRef = useRef<HTMLDivElement>(null);

  const buildUrl = (pageItem: PageItem): string => {
    const baseUrl = "http://eastflare.iptime.org";
    const { pathname, search } = pageItem;

    // If search parameter exists, prepend '&' else prepend '?'
    const separator = search ? "&" : "?";
    const url = `${baseUrl}${pathname}${search}${separator}openTypeCode=WINDOW`;

    return url;
  };

  useEffect(() => {
    const handleDragStart = (e: DragEvent) => {
      const pageItem = getPageItem(curPageId);
      if (pageItem) {
        e.dataTransfer?.setData("text/plain", buildUrl(pageItem));
      }
    };

    const handleDragEnd = (e: DragEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      if (clientX < 0 || clientY < 0 || clientX > innerWidth || clientY > innerHeight) {
        //alert("Tab dragged outside the browser window!");
        onPageTabPopup();
      }
    };

    const tabElement = tabRef.current;

    if (tabElement) {
      tabElement.addEventListener("dragstart", handleDragStart);
      tabElement.addEventListener("dragend", handleDragEnd);
    }

    return () => {
      if (tabElement) {
        tabElement.removeEventListener("dragstart", handleDragStart);
        tabElement.removeEventListener("dragend", handleDragEnd);
      }
    };
  }, [curPageId]);

  return (
    <StyledPageTab
      ref={tabRef}
      onClick={onClick}
      isOpenTab={isActive}
      draggable // Add draggable attribute here
    >
      <StyledPageTabLabel>{label}</StyledPageTabLabel>
      {!isNotClosable && (
        <StyledIconButton
          onClick={e => {
            e.stopPropagation();
            onClose();
          }}
        >
          X
        </StyledIconButton>
      )}
    </StyledPageTab>
  );
};

const StyledPageTab = styled.div<{ isOpenTab: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 0;
  padding: 0 6px;
  border-radius: 4px;
  border: 1px solid #000000;
  color: ${({ isOpenTab }) => (isOpenTab ? "red" : "#000000")};
  box-sizing: border-box;
  font-weight: 500;
`;

const StyledPageTabLabel = styled.span`
  cursor: pointer;
  font-size: 13px;
  overflow: hidden;
  letter-spacing: -0.2px;
  max-width: 155px;
  margin-right: 2px;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: veritcal;

  line-break: auto;
`;

const StyledIconButton = styled.button`
  background-color: unset;
  padding: unset;
  border: unset;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.25s;
`;

export default PageTab;
