import { memo } from "react";
import PageView from "./PageView";
import { PageItem } from "stores/usePageMapStore";

interface TaskRoutesProps {
  openedPageMap: Map<string, PageItem>;
  curPageId: string;
}

function PageRenderer({ openedPageMap, curPageId }: TaskRoutesProps) {
  return (
    <>
      {Array.from(openedPageMap.entries()).map(([key, value]) => (
        <PageView key={key} {...value} pageItem={value} display={key === curPageId} />
      ))}
    </>
  );
}

export default memo(PageRenderer);
