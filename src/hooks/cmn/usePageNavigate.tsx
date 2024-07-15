import { usePageContext } from "contexts/cmn/PageContext";
import { ReactElement } from "react";
import { OpenTypeCode, PageItem } from "store/pageMapStore";
import { getUuid } from "utils/rapUtil";

interface ObjAny {
  [key: string]: any; // You can replace `any` with a more specific type if needed
}

export default function useGoPage() {
  const { setModal, closeModal } = usePageContext();

  const openPage = () => {};
  const openModal = (element: ReactElement, params: ObjAny, options: ObjAny) => {
    const newId = getUuid();

    const pageItem: PageItem = {
      openTypeCode: OpenTypeCode.MODAL,
      id: newId,
      label: "팝업",
      pathname: "/popup",
      search: "",
      routePath: "/popup",
      params: params,
      options: options,
      callback: () => {
        alert("aaaa");
      },
      element: element,
      close: () => {
        closeModal(newId);
      },
    };
    setModal(pageItem);
  };
  const openModeless = () => {};
  const openWindow = () => {};

  return {
    openPage,
    openModal,
    openModeless,
    openWindow,
  };
}
