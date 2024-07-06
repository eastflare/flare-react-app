import React, { startTransition, useCallback, useEffect, useLayoutEffect } from "react";
import { ReactElement, ReactNode, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export type TaskItem = { id: string; path: string; label: string };
export type TaskMap = Map<string, TaskItem>;

const HomeTaskItem: TaskItem = { id: "/", path: "/", label: "Home" };
const MAX_TASK_SIZE = 10;

function createInitialTaskMap(): TaskMap {
  return new Map([[HomeTaskItem.id, HomeTaskItem]]);
}

const usePageRoutes = ({ children }: { children: ReactNode }) => {
  //임시 (다른 훅에 들어가있는 state)
  const [task] = useState<TaskMap>(createInitialTaskMap());

  const { pathname } = useLocation();
  const [routesMap, setRoutesMap] = useState<Record<string, ReactElement>>({});
  const [taskRoutes, setTaskRoutes] = useState<Record<string, ReactElement>>({});

  //전체 Page에 대한 Route를 배열로 생성한다.
  const routes = useMemo(() => {
    return React.Children.toArray(children);
  }, [children]);

  console.log("이렇게해도 찍히나요??", routes);

  const routeItem = useMemo(() => routesMap?.[pathname], [routesMap, pathname]);
  const currentRouteId = useMemo(() => routeItem?.props?.path, [routeItem]);

  const handleInitialRoutes = useCallback(() => {
    if (Object.keys(routesMap)?.length === 0) {
      startTransition(() => {
        setRoutesMap(
          Object.assign(
            {},
            ...(routes as ReactElement[]).map(item => {
              const key = (item?.props?.path as string) ?? "";
              const _key = key.startsWith("/") ? key : "/" + key;
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
    console.log("한번만 실행되야함");
    handleInitialRoutes();
  }, []);

  const handleChangeTaskRoute = useCallback(() => {
    if (routeItem) {
      if (!taskRoutes?.[pathname]) {
        setTaskRoutes(prev => {
          const [home, ...rest] = Object.keys(prev);
          console.log(home);

          if (rest.length > MAX_TASK_SIZE) {
            //delete prev[rest.at(0) ?? ""];
          }
          return {
            ...prev,
            [pathname]: routesMap[pathname],
          };
        });
      }
    }
  }, [pathname]);

  useLayoutEffect(handleChangeTaskRoute, [handleChangeTaskRoute]);

  return {
    taskRoutes,
    currentRouteId,
    task,
  };
};

export default usePageRoutes;
