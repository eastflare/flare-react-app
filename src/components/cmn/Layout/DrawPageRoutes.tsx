import { memo, Suspense } from "react";
import type { RoutesProps } from "react-router";
import DrawPageRoute from "./DrawPageRoute";

interface TaskRoutesProps {
  routes: Record<PropertyKey, any>;
  routesProps: RoutesProps;
  curRouteId: string;
}

function DrawPageRoutes({ routes, routesProps, curRouteId }: TaskRoutesProps) {
  return (
    <>
      <Suspense fallback=''>
        {Object.keys(routes).map(key => {
          console.log("display입니다.", routes[key]);
          return (
            <DrawPageRoute
              key={key}
              {...routes?.[key]?.element?.props}
              routesProps={routesProps}
              display={routes?.[key]?.path === curRouteId}
            />
          );
        })}
      </Suspense>
    </>
  );
}

export default memo(DrawPageRoutes);
