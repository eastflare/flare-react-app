import { findPageByPathNm } from "@/apis/system/Page";
import { usePageStore } from "@/stores/usePageStore";
import { Env } from "config/env";
import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { ReactElement, ReactNode, useMemo } from "react";
import { RouteObject, matchRoutes, useLocation, useMatch, useSearchParams } from "react-router-dom";
import usePageCallbackStore from "stores/usePageCallbackStore";
import usePageMapStore, { OpenTypeCode } from "stores/usePageMapStore";
import usePageRouteStore from "stores/usePageRouteStore";

const env = Env.getInstance();
const isWindow = env.isWindow;
const isMdi = env.isWindow ? false : env.isMdi;
const maxPageTabSize = isMdi ? env.maxPageTabSize : 2;

const usePageRoutes = ({ routes }: { routes: RouteObject[] }) => {
  const { pageRoutes, setPageRoutes } = usePageRouteStore();
  const { pageMap, curPageId, setPageItem, setMasterPageItem, setDetailPageItem } = usePageMapStore();
  const { getPageCallback } = usePageCallbackStore();
  const { getPage, setPage } = usePageStore();
  const { pathname, search } = useLocation();
  const [searchParams] = useSearchParams();

  // Update pageRoutes
  useEffect(() => {
    const routeMap = routes.reduce(
      (acc, item) => {
        const key = item.path?.startsWith("/") ? item.path : `/${item.path}`;
        acc[key] = item;
        return acc;
      },
      {} as Record<string, RouteObject>
    );

    console.log("라우트 맵을 만들고 있습니다.", routeMap);

    setPageRoutes(routeMap);
  }, [routes, setPageRoutes]);

  //경로에 해당하는 Route객체를 조회한다.
  const route = useMemo(() => matchRoutes(routes, pathname)?.[0]?.route, [routes, pathname]);

  //useMatch Hook을 통해 Params가 담겨있는 Route 객체로 변환한다.
  //현재 주소에 해당하는 Route ID 및 객체
  const routepath = route?.path || "";
  const curRouteItem = useMemo(() => pageRoutes[routepath], [pageRoutes, routepath]);
  const matchedRoute = routepath && useMatch(routepath);

  const getPageInfo = useCallback(
    async (routepath: string) => {
      // routepath가 빈 문자열이거나 "/"인 경우 null을 반환
      if (!routepath || routepath === "/") return null;

      try {
        // 이미 저장된 페이지 데이터가 있는지 확인합니다.
        const cachedData = getPage(routepath);
        if (cachedData) {
          return cachedData;
        }

        const data = await findPageByPathNm(routepath);
        if (data) {
          setPage(routepath, data);
          return data;
        } else {
          console.error(`Page with pagePathNm : ${routepath} not found.`);
        }
      } catch (error) {
        console.error("Failed to fetch page data:", error);
      }
    },
    [routepath]
  );

  const openPageRoute = useCallback(async () => {
    // PathVariable과 SearchParams를 합쳐서 하나의 Params로 만듦 (callback function 없음)
    const pathParams = matchedRoute ? matchedRoute.params : {};
    const { title, detailYn, openTypeCode, ...restSearchParams } = Object.fromEntries(searchParams);
    const params = { ...pathParams, ...restSearchParams };
    const data = await getPageInfo(routepath);
    const label = pathname === "/" ? "Home" : decodeURIComponent(title ?? data?.pageNm);
    const pageId = pathname;

    // 현재 주소와 매핑된 Route가 있을 경우
    if (curRouteItem) {
      // Window 팝업일 경우 OpenTypeCode와 Callback을 상황에 맞게 변경한다.
      let openTypeCode = OpenTypeCode.PAGE;
      let callback = () => {};

      if (isWindow) {
        // 파라미터의 openTypeCode=WINDOW 파라미터로 오면 pageItem의 openTypeCode를 WINDOW로 변경한다.
        openTypeCode = OpenTypeCode.WINDOW;

        // 윈도우 팝업일 경우 Callback 처리
        const windowCallback = (...args: any[]) => {
          return window.parentCallback(...args);
        };
        callback = windowCallback;
      } else {
        // 페이지일 경우 Callback 처리
        const pageCallback = (...args: any[]) => {
          const tmpCallback = getPageCallback(pageId);
          if (typeof tmpCallback === "function") {
            return tmpCallback(...args);
          }
        };
        callback = pageCallback;
      }

      const pageItem = {
        openTypeCode: openTypeCode,
        id: pageId,
        label: label,
        pathname: pathname,
        search: search,
        routePath: routepath,
        params: params,
        element: curRouteItem.element as ReactElement,
        callback: callback,
      };

      if (isMdi) {
        // 메뉴를 클릭하거나 Windows Popup 화면일 경우 Zustand에다 Page정보를 입력한다.
        setPageItem(pageId, pageItem);
      } else {
        if (detailYn === "Y") {
          setDetailPageItem(pageId, pageItem);
        } else {
          setMasterPageItem(pageId, pageItem);
        }
      }
    }
  }, [pathname, search, curRouteItem]);

  // DOM이 렌더링되기 전에 동기적으로 처리
  useLayoutEffect(() => {
    const executeAsync = async () => {
      await openPageRoute();
    };
    executeAsync();
  }, [openPageRoute]);

  return {
    openedPageMap: pageMap,
    curPageId,
  };
};

export default usePageRoutes;
