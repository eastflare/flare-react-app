import { PageContext } from 'contexts/cmn/PageContext';
import { PageOptions, PageProps } from 'models/cmn/page';
import { useContext } from 'react';
import { usePageStore, useModalStore, useSubPageStore } from 'store/pageStore';
import { getUuid } from 'utils/rapUtil';

export default function useGoPage() {
  //const { open } = useContext(PageDispatchContext);
  const { pages, addPage, removePage } = usePageStore();
  const { modals, addModal, removeModal } = useModalStore();
  const { subPages, addSubPage } = useSubPageStore();
  const parentId = useContext(PageContext);

  const goModal = (Component: any, props: PageProps, options?: PageOptions) => {
    const id = getUuid();

    alert('부모의 ID 입니다. -->' + parentId);
    parentId && addSubPage(id, parentId);
    addPage(id, { Component, props, options });
    addModal(id);

    console.log('subPages', subPages);
  };

  const closeModal = (id: string) => {
    //subPages 에서 자식을 찾았으면 재귀로 closeModal 호출

    removeModal(id);
    removePage(id);
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
