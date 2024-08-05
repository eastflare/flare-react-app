import { memo, Suspense } from "react";
import type { RoutesProps } from "react-router";
import DrawPageRoute from "./DrawPageRoute";
import { PageItem } from "store/pageMapStore";
import Loading from "components/elements/Loading";

interface TaskRoutesProps {
  openedPageMap: Map<string, PageItem>;
  routesProps: RoutesProps;
  curPageId: string;
}

function DrawPageRoutes({ openedPageMap, routesProps, curPageId }: TaskRoutesProps) {
  //console.log("나는curRouteId입니다.", curPageId);
  return (
    <>
      <Suspense fallback={<Loading />}>
        {Array.from(openedPageMap.entries()).map(([key, value]) => (
          <DrawPageRoute key={key} {...value?.element?.props} routesProps={routesProps} pageItem={value} display={key === curPageId} />
        ))}
      </Suspense>
    </>
  );
}

export default memo(DrawPageRoutes);
