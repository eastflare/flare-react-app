import { Env } from "config/env";
import React, { startTransition, useCallback, useEffect, useLayoutEffect } from "react";
import { ReactElement, ReactNode, useMemo } from "react";
import { RouteObject, matchRoutes, useLocation, useMatch, useSearchParams } from "react-router-dom";
import usePageCallbackStore from "store/pageCallbackStore";
import usePageMapStore, { OpenTypeCode } from "store/pageMapStore";
import usePageRouteStore from "store/pageRouteStore";

const env = Env.getInstance();
const isWindow = env.isWindow;
const isMdi = env.isWindow ? false : env.isMdi;
const maxPageTabSize = isMdi ? env.maxPageTabSize : 2;

const usePageRoutes = ({ children }: { children: ReactNode }) => {
  const { pageRoutes, setPageRoutes } = usePageRouteStore();
  const { pageMap, curPageId, setPageItem, setCurPageId } = usePageMapStore();
  const { getPageCallback } = usePageCallbackStore();
  const { pathname, search } = useLocation();
  const [searchParams] = useSearchParams();

  //ReactNode로 받아온 Routes 를 RouteObject로 일괄 변환하여 배열로 가지고 있는다.
  const routes = useMemo(
    () =>
      React.Children.toArray(children).map(childNode => {
        const element = childNode as ReactElement;
        return { path: element.props.path, element } as RouteObject;
      }),
    [children]
  );

  //경로에 해당하는 Route객체를 조회한다.
  const route = useMemo(() => matchRoutes(routes, pathname)?.[0]?.route, [routes, pathname]);

  //useMatch Hook을 통해 Params가 담겨있는 Route 객체로 변환한다.
  //현재 주소에 해당하는 Route ID 및 객체
  const routepath = route?.path || "";
  const curRouteItem = useMemo(() => pageRoutes[routepath], [pageRoutes, routepath]);
  const matchedRoute = routepath && useMatch(routepath);

  //현재 화면에 열려있는 Route (Max 10개)
  useEffect(() => {
    //console.log("pageRoutes --->", pageRoutes);
  }, [curRouteItem]);

  useEffect(() => {
    //console.log("routepath -->", routepath);
    //console.log("나는location입니다.", search, pathname);
    //console.log("나는route입니다.", matchedRoute);
    //console.log("나는파람스~입니다.", matchedRoute ? matchedRoute.params : undefined);
    console.log("실험중 페이지맵이 변경이 됐을까요?", pageMap);
  }, [pageMap]);

  const initRoutesObj = useCallback(() => {
    //전체 Route를 Object<id, element> 형태의 맵으로 재구성한다.
    if (Object.keys(pageRoutes)?.length === 0) {
      console.log("실행샐행 --->", ...routes);

      startTransition(() => {
        setPageRoutes(
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
  }, [routes, pageRoutes]);

  // routes가 추가 될때만 실행됨
  useEffect(initRoutesObj, [initRoutesObj]);

  const openPageRoute = useCallback(() => {
    //PathVariable 과 SearchParams 를 합쳐서 하나의 Params로 만듬 (callback function 은 없음)
    const pathParamsObj = matchedRoute ? matchedRoute.params : {};
    const searchParamsObj = Object.fromEntries(searchParams);
    const mergedParamsObj = { ...pathParamsObj, ...searchParamsObj };
    const params = Object.fromEntries(Object.entries(mergedParamsObj).filter(([key]) => key !== "title" && key !== "pageId" && key !== "openTypeCode"));

    //임시 페이지명을 path의 마지막 글자로 변경
    const label = decodeURIComponent(pathname.split("/").pop() || "Home");

    const pageId = pathname;
    //현재 주소와 매핑된 Route가 있을 경우
    if (curRouteItem) {
      //Window 팝업일 경우 OpenTypeCode 와 Callback을 상황에 맞게 변경한다.
      let openTypeCode = OpenTypeCode.PAGE;
      let callback = () => {};

      if (isWindow) {
        //파라메터의 openTypeCode=WINDOW 파라메터로 오면 pageItem의 openTypeCode 를 WINDOW 로 변경한다.
        openTypeCode = OpenTypeCode.WINDOW;

        //윈도우 팝업일 경우 Callback 처리
        const windowCallback = (...args: any[]) => {
          return window.parentCallback(...args);
        };
        callback = windowCallback;
      } else {
        //페이지일 경우 Callback 처리
        const pageCallback = (...args: any[]) => {
          const tmpCallback = getPageCallback(searchParamsObj.pageId);
          console.log("페이지 Callback 입니다.", tmpCallback);
          if (typeof tmpCallback === "function") {
            return tmpCallback(...args);
          }
        };
        callback = pageCallback;
      }

      //메뉴를 클릭하거나 Windows Popup 화면일 경우 Zustand에다 Page정보를 입력한다.
      setPageItem(pageId, {
        openTypeCode: openTypeCode,
        id: pageId,
        label: label,
        pathname: pathname,
        search: search,
        routePath: routepath,
        params: params,
        element: curRouteItem.element as ReactElement,
        callback: callback,
      });

      setCurPageId(pageId);
    }
  }, [pathname, search, curRouteItem]);

  //DOM 이 렌더링 되기 전에 동기적으로 처리 할때
  //(위의 함수가 pathname, search, curRouteItem 가 변하여 함수가 재렌더링 되면 LayoutEffect로 그 함수를 실행함)
  useLayoutEffect(openPageRoute, [openPageRoute]);

  return {
    openedPageMap: pageMap,
    curPageId,
  };
};

export default usePageRoutes;
