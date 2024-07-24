import { usePageContext } from "contexts/cmn/PageContext";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import usePageCallbackStore from "store/pageCallbackStore";
import { ModalItem, OpenTypeCode, WindowItem } from "store/pageMapStore";
import { getUuid } from "utils/rapUtil";

interface ObjAny {
  [key: string]: any;
}

export default function usePageNavigate() {
  const { addModal, delModal, addWindow } = usePageContext();
  const navigator = useNavigate();
  const { addPageCallback } = usePageCallbackStore();

  const closeModal = useCallback(
    (id: string) => {
      console.log("나는 지워집니다. ", id);
      delModal(id);
    },
    [delModal]
  );

  const openPage = (url: string, params: ObjAny, options?: ObjAny) => {
    let arrParams = new Array();
    const pageId = options?.key ?? getUuid();

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

    //Zustand에다가 Callback Function 을 등록하고 Url에는 pageId를 callbackId로 등록한다.
    arrParams.push("pageId=" + pageId);
    addPageCallback(pageId, params.callback);

    const searchUrl = url + "?" + arrParams.join("&");

    navigator(searchUrl);
  };
  //element any말고는 openModal호출시 계속 빨간줄 에러 발생....일단 any
  const openModal = (element: any, params: ObjAny, options?: ObjAny) => {
    const newId = getUuid();

    const modalItem: ModalItem = {
      openTypeCode: OpenTypeCode.MODAL,
      id: newId,
      label: options?.title ?? "모달팝업",
      params: params,
      options: options,
      callback: params?.callback,
      element: element,
      closeModal: () => {
        closeModal(newId);
      },
    };
    //PageContext에 팝업정보를 추가한다.
    addModal(modalItem);
  };
  const openModeless = (element: any, params: ObjAny, options?: ObjAny) => {
    const newId = getUuid();

    const modelessItem: ModalItem = {
      openTypeCode: OpenTypeCode.MODELESS,
      id: newId,
      label: options?.title ?? "모델리스팝업",
      params: params,
      options: options,
      callback: params?.callback,
      element: element,
      closeModal: () => {
        closeModal(newId);
      },
    };
    //PageContext에 팝업정보를 추가한다.
    addModal(modelessItem);
  };
  const openWindow = (url: string, params: ObjAny, options?: ObjAny) => {
    const newId = getUuid();

    //TODO : id는 url에 해당하는 프로그램 Code 와 같은 값이 필요함
    //서버마다 같은창을 안쓰게 개발_id 형태로 변경 필요 예) env_팝업ID

    const windowItem: WindowItem = {
      openTypeCode: OpenTypeCode.WINDOW,
      id: options?.key ?? newId,
      label: options?.title ?? "팝업(윈도우)",
      url: url,
      params: params,
      options: options,
      callback: params?.callback,
    };
    addWindow(windowItem);
  };

  return {
    openPage,
    openModal,
    openModeless,
    openWindow,
  };
}
