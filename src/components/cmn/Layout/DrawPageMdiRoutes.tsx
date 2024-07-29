import { memo, Suspense } from "react";
import type { RoutesProps } from "react-router";
import DrawPageMdiRoute from "./DrawPageMdiRoute";
import { PageItem } from "store/pageMapStore";

interface TaskRoutesProps {
  openedPageMap: Map<string, PageItem>;
  routesProps: RoutesProps;
  curPageId: string;
}

function DrawPageMdiRoutes({ openedPageMap, routesProps, curPageId }: TaskRoutesProps) {
  //console.log("나는pageMap입니다.", openedPageMap);
  //console.log("나는curRouteId입니다.", curPageId);
  return (
    <>
      <Suspense fallback=''>
        {Array.from(openedPageMap.entries()).map(([key, value]) => (
          <DrawPageMdiRoute key={key} {...value?.element?.props} routesProps={routesProps} pageItem={value} display={key === curPageId} />
        ))}
      </Suspense>
    </>
  );
}

export default memo(DrawPageMdiRoutes);
