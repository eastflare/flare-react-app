import { findPageById } from "@/apis/system/Page";
import { Page } from "@/models/system/Page";
import { Env } from "config/env";
import { usePageContext } from "contexts/cmn/PageContext";
import { useCallback } from "react";
import { matchPath, useNavigate } from "react-router-dom";
import usePageCallbackStore from "stores/usePageCallbackStore";
import { PopupItem, OpenTypeCode } from "stores/usePageMapStore";
import usePageRouteStore from "stores/usePageRouteStore";
import { getUuid } from "utils/rapUtil";

interface ObjAny {
  [key: string]: any;
}

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

  const getMatchedRouteByUrl = useCallback(
    (url: string) => {
      for (const routePath in pageRoutes) {
        const match = matchPath(routePath, url);
        if (match) {
          return match;
        }
      }
      return null;
    },
    [pageRoutes]
  );

  const getPageObj = (url: string, params: ObjAny) => {
    // pathVariable이 있는 경우는 params의 값을 포함하여 url을 변경한다.
    const pageUrl = url.replace(/:([a-zA-Z]+)/g, (_, key) => {
      return encodeURIComponent(params[key]);
    });

    //URL을 통해 routePath를 찾는다.
    const matchRoute = getMatchedRouteByUrl(pageUrl);

    let routePath = "";
    let routeParams = {};

    if (matchRoute) {
      routePath = matchRoute.pattern.path;
      routeParams = matchRoute.params;
    } else {
      throw new Error("No matching route found.");
    }

    const element = getElementByRoutePath(routePath);
    const { callback, ...restParams } = params;
    const pageParams = { ...routeParams, ...restParams };

    const pageObj = {
      pageUrl,
      pageElement: element.props.element,
      pageParams,
      pageCallback: callback || (() => {}),
    };

    return pageObj;
  };

  const goPage = async (pageId: string, callback: (data: Page) => void) => {
    const data = await findPageById(pageId);
    if (data) {
      callback(data);
    }
  };

  const openPage = (pageId: string, params: ObjAny, options?: PageOptions) => {
    const open = (data: Page) => {
      const { pageUrl, pageParams, pageCallback } = getPageObj(data.pageUrl, params);

      let arrParams = new Array();
      const newId = pageUrl;

      if (pageParams) {
        Object.entries(pageParams).forEach(([key, value]) => {
          arrParams.push(key + "=" + value);
        });
      }

      if (options?.title) {
        arrParams.push("title=" + options?.title ?? data.pageNm);
      }

      if (options?.isDetail) {
        arrParams.push("detailYn=Y");
      }

      //Zustand에다가 Callback Function 을 등록하고 Url에는 pageId를 callbackId로 등록한다.
      arrParams.push("pageId=" + newId);
      addPageCallback(newId, pageCallback);
      const searchUrl = pageUrl + "?" + arrParams.join("&");
      navigator(searchUrl);
    };

    goPage(pageId, open);
  };

  const openDetail = (url: string, params: ObjAny, options?: PageOptions) => {
    if (!options) {
      options = {};
    }
    options.isDetail = true;
    openPage(url, params, options);
  };

  const openModal = (pageId: string, params: ObjAny, options?: PopupOptions) => {
    const open = (data: Page) => {
      const newId = getUuid();
      const { pageElement, pageParams, pageCallback } = getPageObj(data.pageUrl, params);

      // 기본 옵션을 설정합니다.
      const modalOptions: PopupOptions = {
        ...options, // 전달된 옵션을 먼저 적용합니다.
        isFix: options?.isFix ?? false,
        width: options?.width ?? data.poupWthLen ?? 800,
        height: options?.height ?? data.poupVtcLen ?? 600,
      };

      const PopupItem: PopupItem = {
        openTypeCode: OpenTypeCode.MODAL,
        id: newId,
        label: modalOptions.title ?? data.pageNm,
        params: pageParams,
        options: modalOptions,
        callback: pageCallback,
        element: pageElement,
        closeModal: () => closeModal(newId),
      };

      // PageContext에 팝업 정보를 추가합니다.
      addModal(PopupItem);
    };

    goPage(pageId, open);
  };

  const openDialog = (pageId: string, params: ObjAny, options?: PopupOptions) => {
    openModal(pageId, params, {
      ...options,
      isFix: true,
    });
  };

  const openModeless = (pageId: string, params: ObjAny, options?: PopupOptions) => {
    const open = (data: Page) => {
      const newId = getUuid();
      const { pageElement, pageParams, pageCallback } = getPageObj(data.pageId, params);
      options!.isFix = false;

      const modelessItem: PopupItem = {
        openTypeCode: OpenTypeCode.MODELESS,
        id: newId,
        label: options?.title ?? data.pageNm,
        params: pageParams,
        options: options,
        callback: pageCallback,
        element: pageElement,
        closeModal: () => {
          closeModal(newId);
        },
      };
      //PageContext에 팝업정보를 추가한다.
      addModal(modelessItem);
    };

    goPage(pageId, open);
  };

  const openWindow = (pageId: string, params: ObjAny, options?: ObjAny) => {
    const open = (data: Page) => {
      const newId = getUuid();
      const { pageParams, pageCallback } = getPageObj(data.pageUrl, params);

      //TODO : id는 url에 해당하는 프로그램 Code 와 같은 값이 필요함
      //서버마다 같은창을 안쓰게 개발_id 형태로 변경 필요 예) env_팝업ID

      const windowItem: PopupItem = {
        openTypeCode: OpenTypeCode.WINDOW,
        id: options?.key ?? newId,
        label: options?.title ?? data.pageNm,
        params: pageParams,
        options: options,
        callback: pageCallback,
      };
      addWindow(data.pageUrl, windowItem);
    };

    goPage(pageId, open);
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
