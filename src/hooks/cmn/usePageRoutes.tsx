import React, { startTransition, useCallback, useEffect, useLayoutEffect } from "react";
import { ReactElement, ReactNode, useMemo, useState } from "react";
import { RouteObject, matchRoutes, useLocation, useMatch, useSearchParams } from "react-router-dom";
import usePageMapStore, { OpenTypeCode } from "store/pageMapStore";
import extractor from "utils/extractorUtil";

//const MAX_PAGE_SIZE = 10;

const usePageRoutes = ({ children }: { children: ReactNode }) => {
  const { pageMap, curPageId, setPageItem, setCurPageId } = usePageMapStore();
  const { pathname, search } = useLocation();
  const [routesMap, setRoutesMap] = useState<Record<string, RouteObject>>({});
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
  const curRouteItem = useMemo(() => routesMap[routepath], [routesMap, routepath]);
  const matchedRoute = routepath && useMatch(routepath);

  //현재 화면에 열려있는 Route (Max 10개)
  useEffect(() => {
    //console.log("routesMap --->", routesMap);
  }, [curRouteItem]);

  useEffect(() => {
    //console.log("routepath -->", routepath);
    //console.log("나는location입니다.", search, pathname);
    //console.log("나는route입니다.", matchedRoute);
    //console.log("나는파람스~입니다.", matchedRoute ? matchedRoute.params : undefined);
    console.log("실험중 페이지맵이 변경이 됐을까요?", pageMap);
  }, [pageMap]);

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
  }, [routes, routesMap]);

  // routes가 추가 될때만 실행됨
  useLayoutEffect(initPageRoutesMap, [initPageRoutesMap]);

  const callbackWithParams = useCallback((num: number, str: string) => {
    alert("이거슨 콜백을 받으면 실행되는 부분 " + num + " " + str);
  }, []);

  // const callbackWithParams = (num: number, str: string) => {
  //   alert("이거슨 콜백을 받으면 실행되는 부분 " + num + " " + str);
  // };

  const openPageRoute = useCallback(() => {
    //임시 페이지명을 path의 마지막 글자로 변경
    let label = pathname.split("/").pop();
    if (!label) {
      label = "Home";
    }

    //PathVariable 과 SearchParams 를 합쳐서 하나의 Params로 만듬
    const pathParams = matchedRoute ? matchedRoute.params : {};
    const searchParamsObj = Object.fromEntries(searchParams);
    const params = { ...pathParams, ...searchParamsObj };

    const pageId = pathname;
    //현재 주소와 매핑된 Route가 있을 경우
    if (curRouteItem) {
      //이미열려있는 페이지가 없을 경우 Route를 추가한다.
      // if (!pageMap.has(pageId)) {
      //   console.log("이미열려있는 페이지가 없을 경우 Route를 추가한다.");
      //   //PageMap을 추가함
      //   setPageItem(pageId, {
      //     id: pageId,
      //     label: label,
      //     pathname: pathname,
      //     search: search,
      //     routePath: routepath,
      //     options: {},
      //     params: {},
      //     element: curRouteItem.element as ReactElement,
      //     callback: callbackWithParams,
      //   });
      // }

      //파라메터의 openTypeCode=WINDOW 파라메터로 오면 pageItem의 openTypeCode 를 WINDOW 로 변경한다.
      let openTypeCode = OpenTypeCode.PAGE;
      let callback = callbackWithParams;

      if (extractor.getQueryParameterValue("openTypeCode") === "WINDOW") {
        openTypeCode = OpenTypeCode.WINDOW;

        console.log("나는나느나는 윈도우 팝업입니다.", window.opener, window.opener.parentCallback);
        //윈도우 팝업일 경우 Callback 처리
        const windowCallback = (...args: any[]) => {
          window.parentCallback(...args);
        };
        callback = windowCallback;
      }

      setPageItem(pageId, {
        openTypeCode: openTypeCode,
        id: pageId,
        label: label,
        pathname: pathname,
        search: search,
        routePath: routepath,
        //options: {},
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
