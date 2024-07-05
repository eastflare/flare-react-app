import {
  ReactElement,
  ReactNode,
  startTransition,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import React from 'react';

const TaskUpper = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const [routesMap, setRoutesMap] = useState<Record<string, ReactElement>>({});

  const routes = useMemo(() => {
    return React.Children.toArray(children);
  }, [children]);
  console.log('이렇게해도 찍히나요??', routes);

  const routeItem = useMemo(() => routesMap?.[pathname], [routesMap, pathname]);
  const currentRouteId = useMemo(() => routeItem?.props?.path, [routeItem]);

  const handleInitialRoutes = useCallback(() => {
    if (Object.keys(routesMap)?.length === 0) {
      startTransition(() => {
        setRoutesMap(
          Object.assign(
            {},
            ...(routes as ReactElement[]).map((item) => {
              const key = (item?.props?.path as string) ?? '';
              const _key = key.startsWith('/') ? key : '/' + key;
              return {
                [_key]: item,
              };
            })
          )
        );
      });
    }
  }, [routes]);

  useEffect(() => {
    console.log('한번만 실행되야함');
    handleInitialRoutes();
  }, []);

  const handleChangeTaskRoute = useCallback(() => {
    console.log('패스가 변경되면 이게 실행이 되야지요', currentRouteId);
  }, [pathname]);

  useLayoutEffect(handleChangeTaskRoute, [handleChangeTaskRoute]);

  const handleClick = (key: string) => {
    //setCurrentRouteId(() => key);
  };

  return (
    <>
      {/* <button
        onClick={() => {
          handleClick('/sample1');
        }}
      >
        sample1
      </button>
      <button
        onClick={() => {
          handleClick('/sample2');
        }}
      >
        sample2
      </button>
      <button
        onClick={() => {
          handleClick('/sample3');
        }}
      >
        sample3
      </button> */}

      {children}

      {/* <TaskRoutes
        routes={taskRoutes}
        routesProps={}
        currentRouteId={currentRouteId}
      /> */}
    </>
  );
};

export default TaskUpper;
