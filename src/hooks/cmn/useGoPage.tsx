import { PageContext } from 'contexts/cmn/PageContext';
import { PageOptions, PageProps } from 'models/cmn/page';
import { useContext } from 'react';
import { usePageStore, useModalStore, useSubPageStore } from 'store/pageStore';
import { getUuid } from 'utils/rapUtil';

export default function useGoPage() {
  //const { open } = useContext(PageDispatchContext);
  const { pages, addPage, removePage } = usePageStore();
  const { modals, addModal, removeModal } = useModalStore();
  const { subPages, addSubPage, removeSubPage } = useSubPageStore();
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
    const removeModals = (modalId: string) => {
      // 자식 페이지 제거
      removePage(modalId);
      // 자식 모달 제거
      removeModal(modalId);
      // subPages에서도 자식 페이지 제거
      removeSubPage(modalId);
    };
    const removeChildrenRecursively = (parentId: string) => {
      // parentId를 부모로 가지고 있는 자식 페이지들을 순회하면서 처리
      Object.keys(subPages).forEach((key) => {
        if (subPages[key].includes(parentId)) {
          // 해당 자식 페이지를 재귀적으로 제거
          removeChildrenRecursively(key);
          removeModals(key);
        }
      });
      removeModals(parentId);
    };
    // 재귀적으로 자식 페이지들을 제거하는 함수 호출
    removeChildrenRecursively(id);
    removeModals(id);
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
