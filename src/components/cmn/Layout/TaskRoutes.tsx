import { memo, Suspense } from 'react';
import DisplayRoute from './DisplayRoute';
import type { RoutesProps } from 'react-router';

interface TaskRoutesProps {
  routes: Record<PropertyKey, any>;
  routesProps: RoutesProps;
  currentRouteId: string;
}

function TaskRoutes({ routes, routesProps, currentRouteId }: TaskRoutesProps) {
  return (
    <>
      <Suspense fallback=''>
        {Object.keys(routes).map((key) => {
          return (
            <DisplayRoute
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

export default memo(TaskRoutes);
