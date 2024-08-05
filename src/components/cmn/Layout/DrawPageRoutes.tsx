import { memo } from "react";
import type { RoutesProps } from "react-router";
import DrawPageRoute from "./DrawPageRoute";
import { PageItem } from "store/pageMapStore";

interface TaskRoutesProps {
  openedPageMap: Map<string, PageItem>;
  routesProps: RoutesProps;
  curPageId: string;
}

function DrawPageRoutes({ openedPageMap, routesProps, curPageId }: TaskRoutesProps) {
  //console.log("나는curRouteId입니다.test", curPageId);
  return (
    <>
      {Array.from(openedPageMap.entries()).map(([key, value]) => (
        <DrawPageRoute key={key} {...value?.element?.props} routesProps={routesProps} pageItem={value} display={key === curPageId} />
      ))}
    </>
  );
}

export default memo(DrawPageRoutes);
