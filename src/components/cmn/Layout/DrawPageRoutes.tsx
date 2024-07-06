import { memo, Suspense } from "react";
import type { RoutesProps } from "react-router";
import DrawPageRoute from "./DrawPageRoute";

interface TaskRoutesProps {
  routes: Record<PropertyKey, any>;
  routesProps: RoutesProps;
  currentRouteId: string;
}

function DrawPageRoutes({ routes, routesProps, currentRouteId }: TaskRoutesProps) {
  return (
    <>
      <Suspense fallback=''>
        {Object.keys(routes).map(key => {
          return (
            <DrawPageRoute
              key={key}
              {...routes?.[key]?.props}
              routesProps={routesProps}
              display={routes?.[key]?.props?.path === currentRouteId}
            />
          );
        })}
      </Suspense>
    </>
  );
}

export default memo(DrawPageRoutes);
