import { findPageById } from "@/apis/system/Page";
import { Page } from "@/models/system/Page";
import { Env } from "config/env";
import { usePageContext } from "contexts/cmn/PageContext";
import { useCallback } from "react";
import { matchPath, useNavigate } from "react-router-dom";
import usePageCallbackStore from "stores/usePageCallbackStore";
import { PopupItem, OpenTypeCode, PopupTypeCode } from "stores/usePageMapStore";
import usePageRouteStore from "stores/usePageRouteStore";
import { getUuid } from "utils/rapUtil";

interface PageOptions {
  key?: string;
  title?: string;
  isDetail?: boolean;
}

interface PopupOptions {
  key?: string;
  width?: number;
  height?: number;
  title?: string;
  isFix?: boolean;
  popupType?: PopupTypeCode;
}

const env = Env.getInstance();
const isMdi = env.isWindow ? false : env.isMdi;

export default function usePageNavigate() {
  const { pageRoutes, getElementByRoutePath } = usePageRouteStore();
  const { addModal, delModal, addWindow } = usePageContext();
  const { addPageCallback } = usePageCallbackStore();
  const navigator = useNavigate();

  const closeModal = useCallback(
    (id: string) => {
      delModal(id);
    },
    [delModal]
  );

  // URL에서 매칭된 경로를 찾는 함수
  const getMatchedRouteByUrl = useCallback(
    (url: string) => {
      return Object.keys(pageRoutes).find(routePath => matchPath(routePath, url)) || null;
    },
    [pageRoutes]
  );

  // 경로 변수들을 URL에 대체하는 함수
  const replacePathVariables = (url: string, params: Record<string, any>): string => {
    return url.replace(/:([a-zA-Z]+)/g, (_, key) => encodeURIComponent(params[key]));
  };

  // 페이지 정보를 생성하는 함수
  const getPageObj = (url: string, params: Record<string, any>) => {
    // URL에서 경로 변수 대체
    const pageUrl = replacePathVariables(url, params);

    // 경로 매칭
    const routePath = getMatchedRouteByUrl(pageUrl);
    if (!routePath) {
      throw new Error("No matching route found.");
    }

    // 매칭된 경로 정보 얻기
    const matchRoute = matchPath(routePath, pageUrl);
    const routeParams = matchRoute?.params || {};

    // 요소와 페이지 파라미터 설정
    const element = getElementByRoutePath(routePath);
    const { callback = () => {}, ...restParams } = params;
    const pageParams = { ...routeParams, ...restParams };

    return {
      pageUrl,
      pageElement: element.props.element,
      pageParams,
      pageCallback: callback,
    };
  };

  // 페이지를 열고 콜백을 호출하는 함수
  const goPage = async (pageId: string, callback: (data: Page) => void) => {
    try {
      const data = await findPageById(pageId);
      if (data) {
        callback(data);
      } else {
        console.error(`Page with ID ${pageId} not found.`);
      }
    } catch (error) {
      console.error("Failed to fetch page data:", error);
    }
  };

  // 공통 팝업 생성 함수
  const createPopup = (pageId: string, params: Record<string, any>, options: PopupOptions = {}, openType: OpenTypeCode, addPopup: (popup: PopupItem) => void) => {
    const handlePage = (data: Page) => {
      const newId = getUuid();
      const { pageElement, pageParams, pageCallback } = getPageObj(data.pageUrl, params);

      // 기본 옵션을 설정합니다.
      const popupOptions: PopupOptions = {
        ...options, // 전달된 옵션을 먼저 적용합니다.
        //isFix: options.isFix ?? (openType === OpenTypeCode.MODELESS ? false : true),
        width: options.width ?? data.poupWthLen ?? 800,
        height: options.height ?? data.poupVtcLen ?? 600,
      };

      const popupItem: PopupItem = {
        openTypeCode: openType,
        id: newId,
        label: popupOptions.title ?? data.pageNm,
        params: pageParams,
        options: popupOptions,
        callback: pageCallback,
        element: pageElement,
        closeModal: () => closeModal(newId),
      };

      addPopup(popupItem);
    };

    goPage(pageId, handlePage);
  };

  // Modal 팝업 열기
  const openModal = (pageId: string, params: Record<string, any>, options?: PopupOptions) => {
    createPopup(pageId, params, options, OpenTypeCode.MODAL, addModal);
  };

  // Modeless 팝업 열기
  const openModeless = (pageId: string, params: Record<string, any>, options?: PopupOptions) => {
    createPopup(pageId, params, options, OpenTypeCode.MODELESS, addModal);
  };

  // Dialog 팝업 열기 (Modal의 일종이므로 openModal을 사용)
  const openDialog = (pageId: string, params: Record<string, any>, options?: PopupOptions) => {
    openModal(pageId, params, { ...options, isFix: true });
  };

  const openWindow = (pageId: string, params: Record<string, any>, options?: PopupOptions) => {
    const handlePage = (data: Page) => {
      const { pageParams, pageCallback } = getPageObj(data.pageUrl, params);

      const windowItem: PopupItem = {
        openTypeCode: OpenTypeCode.WINDOW,
        id: options?.key ?? data.pageId,
        label: options?.title ?? data.pageNm,
        params: pageParams,
        options: options,
        callback: pageCallback,
      };
      addWindow(data.pageUrl, windowItem);
    };

    goPage(pageId, handlePage);
  };

  const openPage = (pageId: string, params: Record<string, any>, options?: PageOptions) => {
    const handlePage = (data: Page) => {
      const { pageUrl, pageParams, pageCallback } = getPageObj(data.pageUrl, params);

      let queryParams = new Array();
      const newId = pageUrl;

      // 페이지 파라미터 추가
      Object.entries(pageParams).forEach(([key, value]) => {
        queryParams.push(`${key}=${value}`);
      });

      const title = options?.title ?? data.pageNm;
      if (title) {
        queryParams.push(`title=${encodeURIComponent(title)}`);
      }

      if (options?.isDetail) {
        queryParams.push("detailYn=Y");
      }

      queryParams.push("pageId=" + newId);

      addPageCallback(newId, pageCallback);
      const searchUrl = `${pageUrl}?${queryParams.join("&")}`;

      navigator(searchUrl);
    };

    goPage(pageId, handlePage);
  };

  const openDetail = (url: string, params: Record<string, any>, options: PageOptions = {}) => {
    const updatedOptions = { ...options, isDetail: true };
    openPage(url, params, updatedOptions);
  };

  return {
    openPage,
    openDetail,
    openModal,
    openModeless,
    openWindow,
    openDialog,
  };
}
