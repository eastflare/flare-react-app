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

  const routeItem = useMemo(() => routesMap?.[pathname], [routesMap, pathname]);
  const currentRouteId = useMemo(() => routeItem?.props?.path, [routeItem]);

  console.log("전체 routes -> ", routes);
  console.log("현재 Path ->", pathname);
  console.log("현재 선택 id -> ", currentRouteId);
  console.log("현재 선택 item -> ", routeItem);

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

  const handleChangeTaskRoute = useCallback(() => {
    if (routeItem) {
      //taskRoutes.pathname 에 지금들어온 경로가 없을 경우 페이지를 추가한다.
      if (!taskRoutes?.[pathname]) {
        setTaskRoutes(prev => {
          const [home, ...rest] = Object.keys(prev);
          console.log(home);

          if (rest.length > MAX_TASK_SIZE) {
            delete prev[rest[0] ?? ""];
          }
          return {
            ...prev,
            [pathname]: routesMap[pathname],
          };
        });
      }
    }
  }, [pathname, routeItem, taskRoutes]);

  useLayoutEffect(() => {
    console.log("한번만 실행되야함");
    handleInitialRoutes();
  }, []);

  //DOM 이 렌더링 되기 전에 동기적으로 처리 할때
  //(위의 함수가 pathname, routeItem, taskRoutes 가 변하여 함수가 재렌더링 되면 LayoutEffect로 그 함수를 실행함)
  useLayoutEffect(handleChangeTaskRoute, [handleChangeTaskRoute]);

  return {
    taskRoutes,
    currentRouteId,
    task,
  };
};

export default usePageRoutes;
