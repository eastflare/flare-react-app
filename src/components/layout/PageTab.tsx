import styled from "@emotion/styled";
import usePageTab from "hooks/layout/usePageTab";
import { useEffect, useRef, useState } from "react";
import usePageMapStore, { PageItem } from "stores/usePageMapStore";

interface PageTabProps {
  pageId: string;
  label: string;
  id: string;
  onClick: (...args: any[]) => void;
  onClose: (e?: MouseEvent) => void;
  onPopup: () => void;
  isActive: boolean;
}

const PageTab = ({ pageId, label, onClick, onClose, isActive }: PageTabProps) => {
  const { setTabsOrder, getPageItem, pageMap, setCurPageId } = usePageMapStore();
  const { onPageTabPopup } = usePageTab();
  const isNotClosable = ["Home"].includes(label);
  const tabRef = useRef<HTMLDivElement>(null);
  const [dataValue, setDataValue] = useState<string | null>(null);

  const buildUrl = (pageItem: PageItem): string => {
    const baseUrl = window.location.protocol + window.location.host;
    const { pathname, search } = pageItem;
    const separator = search ? "&" : "?";
    const url = `${baseUrl}${pathname}${search}${separator}openTypeCode=WINDOW`;

    return url;
  };

  useEffect(() => {
    const handleDragStart = (e: DragEvent) => {
      //const value = e.target?.getAttribute("data-value");
      const value = tabRef.current?.getAttribute("data-value") ?? "";
      if (value === "/") {
        return;
      }
      setDataValue(value);
      const pageItem = getPageItem(value);
      if (pageItem) {
        e.dataTransfer?.setData("text/plain", buildUrl(pageItem));
      }
      if (e.dataTransfer) {
        e.dataTransfer?.setData("application/tab-id", value);
        e.dataTransfer.effectAllowed = "move";
      }
    };

    const handleDragEnd = (e: DragEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      if (clientX < 0 || clientY < 0 || clientX > innerWidth || clientY > innerHeight) {
        //alert("Tab dragged outside the browser window!");
        if (dataValue !== null) {
          onPageTabPopup(dataValue);
        }
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
  }, [dataValue]);

  return (
    <StyledPageTab
      ref={tabRef}
      onClick={() => {
        onClick();
        if (dataValue !== null) {
          setCurPageId(dataValue);
        }
      }}
      isOpenTab={isActive}
      data-value={pageId}
      draggable
      onDrop={e => {
        e.preventDefault();
        const sourceTabId = e.dataTransfer?.getData("application/tab-id");
        if (sourceTabId && sourceTabId !== pageId) {
          const newOrder = Array.from(pageMap.keys());
          const sourceIndex = newOrder.indexOf(sourceTabId);
          const targetIndex = newOrder.indexOf(pageId);
          newOrder.splice(sourceIndex, 1);
          newOrder.splice(targetIndex, 0, sourceTabId);
          const homeIndex = newOrder.indexOf("/");
          if (targetIndex <= homeIndex) {
            return;
          }
          setTabsOrder(newOrder);
          setCurPageId(sourceTabId);
        }
      }}
      onDragOver={e => {
        e.preventDefault();
        const targetTabId = e.currentTarget.getAttribute("data-value");
        if (targetTabId === "/") {
          e.dataTransfer.dropEffect = "none";
        } else {
          e.dataTransfer.dropEffect = "move";
        }
      }}
    >
      <StyledPageTabLabel isOpenTab={isActive}>{label}</StyledPageTabLabel>
      {!isNotClosable && (
        <StyledIconButton
          isOpenTab={isActive}
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
  border-right: 1px solid #f1f4f3;
  color: ${({ isOpenTab }) => (isOpenTab ? "#1F1F1F" : "#979998")};
  box-sizing: border-box;
  background-color: ${({ isOpenTab }) => (isOpenTab ? "#FFFFFF" : "#f1f4f3")};
  flex: none;
  order: 0;
  flex-grow: 0;
  height: 40px;
  padding: 0px 8px 0px 8px;
`;

const StyledPageTabLabel = styled.span<{ isOpenTab: boolean }>`
  font-weight: ${({ isOpenTab }) => (isOpenTab ? "700" : "400")};
  cursor: pointer;
  font-size: 12px;
  overflow: hidden;
  letter-spacing: -0.2px;
  max-width: 155px;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: veritcal;

  line-break: auto;
`;

const StyledIconButton = styled.button<{ isOpenTab: boolean }>`
  color: ${({ isOpenTab }) => (isOpenTab ? "#1F1F1F" : "#979998")};
  background-color: unset;
  padding: 0px 0px 0px 7px;
  border: unset;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.25s;
`;

export default PageTab;
