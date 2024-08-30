import { memo } from "react";
import type { RoutesProps } from "react-router";
import DrawPageRoute from "./DrawPageRoute";
import { PageItem } from "stores/usePageMapStore";

interface TaskRoutesProps {
  openedPageMap: Map<string, PageItem>;
  routesProps: RoutesProps;
  curPageId: string;
}

function DrawPageRoutes({ openedPageMap, routesProps, curPageId }: TaskRoutesProps) {
  //console.log("나는curRouteId입니다.test", curPageId);
  console.log("이게 뭐하는 건가요?", openedPageMap);
  return (
    <>
      {Array.from(openedPageMap.entries()).map(([key, value]) => (
        <DrawPageRoute key={key} {...value} routesProps={routesProps} pageItem={value} display={key === curPageId} />
      ))}
    </>
  );
}

export default memo(DrawPageRoutes);
