import React, { startTransition, useCallback, useLayoutEffect } from "react";
import { ReactElement, ReactNode, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export type TaskItem = { id: string; path: string; label: string };
export type TaskMap = Map<string, TaskItem>;

const HomeTaskItem: TaskItem = { id: "/", path: "/", label: "Home" };
const MAX_TASK_SIZE = 10;

function initTaskMap(): TaskMap {
  return new Map([[HomeTaskItem.id, HomeTaskItem]]);
}

const usePageRoutes = ({ children }: { children: ReactNode }) => {
  //임시 (다른 훅에 들어가있는 state)
  const [task] = useState<TaskMap>(initTaskMap());

  const { pathname } = useLocation();

  //전체 Page에 대한 Route 배열 및 Map
  const routes = useMemo(() => {
    return React.Children.toArray(children);
  }, [children]);
  const [routesMap, setRoutesMap] = useState<Record<string, ReactElement>>({});

  //현재 화면에 열려있는 Route (Max 10개)
  const [openedRoutes, setOpenedRoutes] = useState<Record<string, ReactElement>>({});

  //현재 주소에 해당하는 Route ID 및 객체
  const curRouteItem = useMemo(() => routesMap?.[pathname], [routesMap, pathname]);
  const curRouteId = useMemo(() => curRouteItem?.props?.path, [curRouteItem]);

  console.log("전체 routes -> ", routes);
  console.log("현재 Path ->", pathname);
  console.log("현재 선택 id -> ", curRouteId);
  console.log("현재 선택 item -> ", curRouteItem);

  const initPageRoutesMap = useCallback(() => {
    //전체 Route를 Map<id, element> 형태의 맵으로 재구성한다.
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

  // routes가 추가 될때만 실행됨
  useLayoutEffect(initPageRoutesMap, [initPageRoutesMap]);

  const openPageRoutes = useCallback(() => {
    //현재 주소와 매핑된 Route가 있을 경우
    if (curRouteItem) {
      //이미열려있는 페이지가 없을 경우 Route를 추가한다.
      if (!openedRoutes?.[pathname]) {
        setOpenedRoutes(prev => {
          const [home, ...rest] = Object.keys(prev);
          console.log(home);

          //열려있는 화면이 10개가 넘어가면 첫번째 것을 지운다.
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
  }, [pathname, curRouteItem, openedRoutes]);

  //DOM 이 렌더링 되기 전에 동기적으로 처리 할때
  //(위의 함수가 pathname, curRouteItem, openedRoutes 가 변하여 함수가 재렌더링 되면 LayoutEffect로 그 함수를 실행함)
  useLayoutEffect(openPageRoutes, [openPageRoutes]);

  return {
    openedRoutes,
    curRouteId,
    task,
  };
};

export default usePageRoutes;
