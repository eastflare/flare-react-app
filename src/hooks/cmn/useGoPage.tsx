import { ModalContext } from "contexts/cmn/ModalContext";
import { PageOptions, PageProps } from "models/cmn/page";
import { useCallback, useContext } from "react";
import { usePageStore, useModalStore, useSubPageStore } from "store/pageStore";
import { getUuid } from "utils/rapUtil";

export default function useGoPage() {
  //const { open } = useContext(PageDispatchContext);
  const { pages, addPage, removePage } = usePageStore();
  const { modals, addModal, removeModal } = useModalStore();
  const { subPages } = useSubPageStore();
  const { pageId, addChildId, removeChildId } = useContext(ModalContext);

  const goModal = useCallback((Component: any, props: PageProps, options?: PageOptions) => {
    const newId = getUuid();
    addPage(newId, { Component, props, options });
    console.log("pageId => ", pageId);
    pageId ? addChildId(newId) : addModal(newId);

    console.log("subPages", subPages);
  }, []);

  const closeModal = (id: string) => {
    removePage(id);
    pageId ? removeChildId(id) : removeModal(id);
  };

  const goPage = () => {};

  const goTab = () => {};

  return {
    pages,
    modals,
    goModal,
    closeModal,
    goPage,
    goTab,
  };
}
