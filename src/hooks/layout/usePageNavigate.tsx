import { findPageByPathNm } from "@/apis/system/Page";
import { Page } from "@/models/system/Page";
import { usePageStore } from "@/stores/usePageStore";
import { Env } from "config/env";
import { usePageContext } from "contexts/cmn/PageContext";
import { ReactElement, useCallback } from "react";
import { matchPath } from "react-router-dom";
import { PopupItem, OpenTypeCode, PopupTypeCode } from "stores/usePageMapStore";
import usePageRouteStore from "stores/usePageRouteStore";
import { getUuid } from "utils/rapUtil";
import useMenuNavigate from "./useMenuNavigate";

interface PopupOptions {
  key?: string;
  width?: number;
  height?: number;
  title?: string;
  isFix?: boolean;
  popupType?: PopupTypeCode;
}

interface PageObj {
  pagePathNm: string;
  pageUrl: string;
  pageElement: ReactElement;
  pageParams: Record<string, any>;
  pageCallback: () => {};
}

const env = Env.getInstance();
const isMdi = env.isWindow ? false : env.isMdi;

export default function usePageNavigate() {
  const { pageRoutes, getElementByRoutePath } = usePageRouteStore();
  const { addModal, delModal, addWindow } = usePageContext();
  const { getPage, setPage } = usePageStore();
  const { openPage, openDetail } = useMenuNavigate();

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
  const getPageObj = (url: string, params: Record<string, any>): PageObj => {
    // URL에서 경로 변수 대체
    const pageUrl = params ? replacePathVariables(url, params) : url;

    // 경로 매칭
    const routePath = getMatchedRouteByUrl(pageUrl);
    if (!routePath) {
      throw new Error("No matching route found.");
    }

    // 매칭된 경로 정보 얻기
    const matchRoute = matchPath(routePath, pageUrl);
    const matchParams = matchRoute?.params || {};

    // 요소와 페이지 파라미터 설정
    const element = getElementByRoutePath(routePath);
    const { callback = () => {}, ...restParams } = params;
    const pageParams = { ...matchParams, ...restParams };

    return {
      pagePathNm: routePath,
      pageUrl,
      pageElement: element.props.element,
      pageParams,
      pageCallback: callback,
    };
  };

  // 페이지를 열고 콜백을 호출하는 함수
  const goPage = async (url: string, params: Record<string, any> = {}, options: Record<string, any> = {}, handlePage: (pageObj: PageObj, data: Page) => void) => {
    const pageObj = getPageObj(url, params);

    try {
      // 이미 저장된 페이지 데이터가 있는지 확인합니다.
      const cachedData = getPage(pageObj.pagePathNm);
      if (cachedData) {
        handlePage(pageObj, cachedData);
        return;
      }

      const data = await findPageByPathNm(pageObj.pagePathNm);
      if (data) {
        setPage(pageObj.pagePathNm, data);
        handlePage(pageObj, data);
      } else {
        console.error(`Page with pagePathNm : ${pageObj.pagePathNm} not found.`);
      }
    } catch (error) {
      console.error("Failed to fetch page data:", error);
    }
  };

  // 공통 팝업 생성 함수
  const createPopup = (url: string, params: Record<string, any>, options: PopupOptions = {}, openType: OpenTypeCode, addPopup: (popup: PopupItem) => void) => {
    const handlePage = (pageObj: PageObj, data: Page) => {
      const newId = getUuid();

      // 기본 옵션을 설정합니다.
      const popupOptions: PopupOptions = {
        ...options, // 전달된 옵션을 먼저 적용합니다.
        width: options.width ?? data.poupWthLen ?? 800,
        height: options.height ?? data.poupVtcLen ?? 600,
      };

      const popupItem: PopupItem = {
        openTypeCode: openType,
        id: newId,
        label: popupOptions.title ?? data.pageNm,
        params: pageObj.pageParams,
        options: popupOptions,
        callback: pageObj.pageCallback,
        element: pageObj.pageElement,
        closeModal: () => closeModal(newId),
      };

      addPopup(popupItem);
    };

    goPage(url, params, options, handlePage);
  };

  // Modal 팝업 열기
  const openModal = (url: string, params: Record<string, any>, options?: PopupOptions) => {
    createPopup(url, params, options, OpenTypeCode.MODAL, addModal);
  };

  // Modeless 팝업 열기
  const openModeless = (url: string, params: Record<string, any>, options?: PopupOptions) => {
    createPopup(url, params, options, OpenTypeCode.MODELESS, addModal);
  };

  // Dialog 팝업 열기 (Modal의 일종이므로 openModal을 사용)
  const openDialog = (url: string, params: Record<string, any>, options?: PopupOptions) => {
    openModal(url, params, { ...options, isFix: true });
  };

  const openWindow = (url: string, params: Record<string, any>, options: PopupOptions = {}) => {
    const handlePage = (pageObj: PageObj, data: Page) => {
      const popupOptions: PopupOptions = {
        ...options,
        width: options.width ?? data.poupWthLen ?? 800,
        height: options.height ?? data.poupVtcLen ?? 600,
      };

      const windowItem: PopupItem = {
        openTypeCode: OpenTypeCode.WINDOW,
        id: options?.key ?? pageObj.pageUrl,
        label: options?.title ?? data.pageNm,
        params: pageObj.pageParams,
        options: popupOptions,
        callback: pageObj.pageCallback,
      };
      addWindow(pageObj.pageUrl, windowItem);
    };

    goPage(url, params, options, handlePage);
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
