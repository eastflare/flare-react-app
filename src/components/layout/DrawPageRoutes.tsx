import { memo } from "react";
import DrawPageRoute from "./DrawPageRoute";
import { PageItem } from "stores/usePageMapStore";

interface TaskRoutesProps {
  openedPageMap: Map<string, PageItem>;
  curPageId: string;
}

function DrawPageRoutes({ openedPageMap, curPageId }: TaskRoutesProps) {
  return (
    <>
      {Array.from(openedPageMap.entries()).map(([key, value]) => (
        <DrawPageRoute key={key} {...value} pageItem={value} display={key === curPageId} />
      ))}
    </>
  );
}

export default memo(DrawPageRoutes);
