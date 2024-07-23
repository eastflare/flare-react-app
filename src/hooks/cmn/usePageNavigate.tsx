import { usePageContext } from "contexts/cmn/PageContext";
import { OpenTypeCode, PageItem } from "store/pageMapStore";
import { getUuid } from "utils/rapUtil";

interface ObjAny {
  [key: string]: any; // You can replace `any` with a more specific type if needed
}

export default function useGoPage() {
  const { addModal, delModal, addWindow } = usePageContext();

  const closeModal = (id: string) => {
    delModal(id);
  };

  const openPage = () => {};
  //element any말고는 openModal호출시 계속 빨간줄 에러 발생....일단 any
  const openModal = (element: any, params: ObjAny, options: ObjAny) => {
    const newId = getUuid();

    const pageItem: PageItem = {
      openTypeCode: OpenTypeCode.MODAL,
      id: newId,
      label: "팝업(모달)",
      pathname: "/popup",
      search: "",
      routePath: "/popup",
      params: params,
      options: options,
      callback: params.callback,
      element: element,
      closeModal: () => {
        closeModal(newId);
      },
    };
    addModal(pageItem);
  };
  const openModeless = (element: any, params: ObjAny, options: ObjAny) => {
    const newId = getUuid();

    const pageItem: PageItem = {
      openTypeCode: OpenTypeCode.MODELESS,
      id: newId,
      label: "팝업(모델리스)",
      pathname: "/popup",
      search: "",
      routePath: "/popup",
      params: params,
      options: options,
      callback: params.callback,
      element: element,
      closeModal: () => {
        closeModal(newId);
      },
    };
    addModal(pageItem);
  };
  const openWindow = (url: string, element: any, params: ObjAny, options: ObjAny) => {
    const newId = getUuid();

    const pageItem: PageItem = {
      openTypeCode: OpenTypeCode.WINDOW,
      id: newId,
      label: "팝업(윈도우)",
      pathname: url,
      search: "",
      routePath: "/popup",
      params: params,
      options: options,
      callback: params.callback,
      element: element,
    };
    addWindow(pageItem);
  };

  return {
    openPage,
    openModal,
    openModeless,
    openWindow,
  };
}
