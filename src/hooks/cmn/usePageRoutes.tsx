import { usePageRouterContext } from "contexts/cmn/PageRouterContext";
import React, { startTransition, useCallback, useEffect, useLayoutEffect } from "react";
import { ReactElement, ReactNode, useMemo, useState } from "react";
import { RouteObject, matchRoutes, useLocation, useMatch } from "react-router-dom";

const MAX_PAGE_SIZE = 10;

const usePageRoutes = ({ children }: { children: ReactNode }) => {
  const { deletePageTabId, onDeletePageTabOk, onOpenPageTab } = usePageRouterContext();

  const { pathname } = useLocation();
  const [routesMap, setRoutesMap] = useState<Record<string, RouteObject>>({});

  //ReactNode로 받아온 Routes 를 RouteObject로 일괄 변환하여 배열로 가지고 있는다.
  const routes = useMemo(() => {
    return React.Children.toArray(children).map(childNode => {
      const element = childNode as ReactElement;
      return {
        path: element.props.path,
        element,
      } as RouteObject;
    });
  }, [children]);

  console.log("routes", routes);

  const [{ route }] = useMemo(() => {
    return matchRoutes(routes, pathname) ?? [];
  }, [pathname]);

  const matchedRoute = route?.path && useMatch(route.path);

  useEffect(() => {
    //if (matchedRoute) {
    console.log("나는route입니다.", matchedRoute);
    console.log("나는파람스~입니다.", matchedRoute ? matchedRoute.params : undefined);
    //}
  }, [matchedRoute]);

  //현재 화면에 열려있는 Route (Max 10개)
  const [openedRoutesMap, setOpenedRoutesMap] = useState<Record<string, ReactElement>>({});

  //현재 주소에 해당하는 Route ID 및 객체
  const curRouteItem = useMemo(() => routesMap?.[pathname], [routesMap, pathname]);
  const curRouteId = useMemo(() => curRouteItem?.path, [curRouteItem]);

  console.log("curRouteItem입니다.", curRouteItem);

  const initPageRoutesMap = useCallback(() => {
    //전체 Route를 Map<id, element> 형태의 맵으로 재구성한다.
    if (Object.keys(routesMap)?.length === 0) {
      startTransition(() => {
        setRoutesMap(
          Object.assign(
            {},
            ...routes.map(item => {
              const key = (item?.path as string) ?? "";
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

  const openPageRoute = useCallback(() => {
    //현재 주소와 매핑된 Route가 있을 경우
    if (curRouteItem) {
      //이미열려있는 페이지가 없을 경우 Route를 추가한다.
      if (!openedRoutesMap?.[pathname]) {
        setOpenedRoutesMap(prev => {
          const [home, ...rest] = Object.keys(prev);
          console.log(home);

          //열려있는 화면이 10개가 넘어가면 첫번째 것을 지운다.
          if (rest.length > MAX_PAGE_SIZE) {
            delete prev[rest[0] ?? ""];
          }

          return {
            ...prev,
            [pathname]: routesMap[pathname],
          };
        });
      }

      //상단 Tab을 구성한다.
      startTransition(() => {
        //임시 페이지명을 path의 마지막 글자로 변경
        const label = pathname.split("/").pop()!;

        onOpenPageTab({
          id: pathname,
          path: pathname,
          label: label,
        });
      });
    }
  }, [onOpenPageTab, pathname, curRouteItem, openedRoutesMap]);

  //DOM 이 렌더링 되기 전에 동기적으로 처리 할때
  //(위의 함수가 pathname, curRouteItem, openedRoutesMap 가 변하여 함수가 재렌더링 되면 LayoutEffect로 그 함수를 실행함)
  useLayoutEffect(openPageRoute, [openPageRoute]);

  useEffect(() => {
    if (deletePageTabId === undefined) return;
    startTransition(() => {
      setOpenedRoutesMap(prev => {
        delete prev[deletePageTabId];
        return { ...prev };
      });

      onDeletePageTabOk();
    });
  }, [deletePageTabId]);

  return {
    openedRoutesMap,
    curRouteId,
  };
};

export default usePageRoutes;
