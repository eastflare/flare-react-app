import { usePageRouterContext } from "contexts/cmn/PageRouterContext";
import React, { startTransition, useCallback, useEffect, useLayoutEffect } from "react";
import { ReactElement, ReactNode, useMemo, useState } from "react";
import { RouteObject, matchRoutes, useLocation, useMatch } from "react-router-dom";
import usePageMapStore, { CallbackFunction } from "store/pageMapStore";
import { getUuid } from "utils/rapUtil";

const MAX_PAGE_SIZE = 10;

const usePageRoutes = ({ children }: { children: ReactNode }) => {
  const { deletePageTabId, onDeletePageTabOk, onOpenPageTab } = usePageRouterContext();
  const { pageMap, addPageItem } = usePageMapStore();
  const { pathname, search, hash, key, state } = useLocation();
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

  //console.log("routes", routes);

  //경로에 해당하는 Route객체를 조회한다.
  const [{ route }] = useMemo(() => {
    return matchRoutes(routes, pathname) ?? [];
  }, [pathname]);

  //useMatch Hook을 통해 Params가 담겨있는 Route 객체로 변환한다.
  const routepath = route?.path || "";
  const matchedRoute = routepath && useMatch(routepath);

  useEffect(() => {
    console.log("나는location입니다.", search, pathname, hash, key, state);
    console.log("나는route입니다.", matchedRoute);
    console.log("나는파람스~입니다.", matchedRoute ? matchedRoute.params : undefined);
  }, [matchedRoute]);

  useEffect(() => {
    console.log("페이지 맵입니다.", pageMap);
  }, [pageMap]);

  //현재 화면에 열려있는 Route (Max 10개)
  const [openedRoutesMap, setOpenedRoutesMap] = useState<Record<string, RouteObject>>({});

  //현재 주소에 해당하는 Route ID 및 객체
  const curRouteItem = useMemo(() => routesMap?.[pathname], [routesMap, pathname]);
  const curRouteId = useMemo(() => curRouteItem?.path as string, [curRouteItem]);

  //console.log("curRouteItem입니다.", curRouteItem);

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

  const callbackWithParams: CallbackFunction<[number, string], void> = (num, str) => {
    alert(num + " " + str);
  };

  const openPageRoute = useCallback(() => {
    //현재 주소와 매핑된 Route가 있을 경우
    if (curRouteItem) {
      //이미열려있는 페이지가 없을 경우 Route를 추가한다.
      if (!openedRoutesMap?.[pathname]) {
        setOpenedRoutesMap(prev => {
          const [home, ...rest] = Object.keys(prev);
          //console.log(home);

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
        const uuid = getUuid();

        console.log("값이 추가됩니다.");
        //PageMap을 추가함
        addPageItem(uuid, {
          id: uuid,
          label: label,
          pathname: pathname,
          originPath: pathname + search,
          routePath: routepath,
          options: {},
          params: {},
          callback: callbackWithParams,
        });

        onOpenPageTab({
          id: pathname,
          path: pathname,
          label: label,
        });
      });
    }
  }, [onOpenPageTab, pathname, search, curRouteItem, openedRoutesMap]);

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
