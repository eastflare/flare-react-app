import { Env } from "config/env";
import { usePageContext } from "contexts/cmn/PageContext";
import { useCallback } from "react";
import { matchPath, useNavigate } from "react-router-dom";
import usePageCallbackStore from "store/pageCallbackStore";
import { ModalItem, OpenTypeCode, WindowItem } from "store/pageMapStore";
import usePageRouteStore from "store/pageRouteStore";
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

  /*
  function createURLFromTemplate(template:string, data:Record<string,string>) {
    return template.replace(/:([a-zA-Z]+)/g, (_, key) => {
      return encodeURIComponent(data[key]);
    });
  }

  // 사용 예시
  const template = "/sample/:id/:name";
  const data = { id: "jscho128", name: "조재성", pw: "aaa" };

  const result = createURLFromTemplate(template, data);
  console.log(result); // "/sample/jscho128/%EC%A1%B0%EC%9E%AC%EC%84%B1"
  */

  const openPage = (url: string, params: ObjAny, options?: PageOptions) => {
    let arrParams = new Array();
    const pageId = options?.key ?? url;

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (key === "callback") {
          return; // continue;
        }
        arrParams.push(key + "=" + value);
      });
    }

    if (options?.title) {
      arrParams.push("title=" + options?.title);
    }

    if (options?.isDetail) {
      arrParams.push("detailYn=Y");
    }

    //Zustand에다가 Callback Function 을 등록하고 Url에는 pageId를 callbackId로 등록한다.
    arrParams.push("pageId=" + pageId);
    addPageCallback(pageId, params.callback);
    const searchUrl = url + "?" + arrParams.join("&");
    navigator(searchUrl);
  };

  const openDetail = (url: string, params: ObjAny, options?: PageOptions) => {
    if (!options) {
      options = {};
    }
    options.isDetail = true;
    openPage(url, params, options);
  };

  const openModal = (url: string, params: ObjAny, options?: PopupOptions) => {
    const newId = getUuid();
    const { pageElement, pageParams, pageCallback } = getPageObj(url, params);

    const modalItem: ModalItem = {
      openTypeCode: OpenTypeCode.MODAL,
      id: newId,
      label: options?.title ?? "모달팝업",
      params: pageParams,
      options: options,
      callback: pageCallback,
      element: pageElement,
      closeModal: () => {
        closeModal(newId);
      },
    };
    //PageContext에 팝업정보를 추가한다.
    addModal(modalItem);
  };

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
    //URL을 통해 routePath를 찾는다.
    const matchRoute = getMatchedRouteByUrl(url);

    let routePath = "";
    let routeParams = {};

    if (matchRoute) {
      routePath = matchRoute.pattern.path;
      routeParams = matchRoute.params;
    }

    const element = getElementByRoutePath(routePath);
    const { callback, ...restParams } = params;
    const pageParams = { ...routeParams, ...restParams };

    const pageObj = {
      pageElement: element.props.element,
      pageParams,
      pageCallback: callback || (() => {}),
    };

    return pageObj;
  };

  const openModeless = (url: string, params: ObjAny, options?: PopupOptions) => {
    const newId = getUuid();
    const { pageElement, pageParams, pageCallback } = getPageObj(url, params);

    const modelessItem: ModalItem = {
      openTypeCode: OpenTypeCode.MODELESS,
      id: newId,
      label: options?.title ?? "모델리스팝업",
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
  const openWindow = (url: string, params: ObjAny, options?: ObjAny) => {
    const newId = getUuid();
    const { pageParams, pageCallback } = getPageObj(url, params);

    //TODO : id는 url에 해당하는 프로그램 Code 와 같은 값이 필요함
    //서버마다 같은창을 안쓰게 개발_id 형태로 변경 필요 예) env_팝업ID

    const windowItem: WindowItem = {
      openTypeCode: OpenTypeCode.WINDOW,
      id: options?.key ?? newId,
      label: options?.title ?? "팝업(윈도우)",
      url: url,
      params: pageParams,
      options: options,
      callback: pageCallback,
    };
    addWindow(windowItem);
  };

  return {
    openPage,
    openDetail,
    openModal,
    openModeless,
    openWindow,
  };
}
