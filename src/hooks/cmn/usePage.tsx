import { useState } from "react";
import usePageMapStore, { OpenTypeCode, PageItem } from "store/pageMapStore";
import { openWindow } from "utils/windowUtil";

const usePage = (props: { pageItem: PageItem }) => {
  const { params = {}, options = {}, callback = () => {} } = props.pageItem;
  const { deletePageItem } = usePageMapStore();

  const [modals, setModals] = useState<PageItem[]>([]); // Destructure the tuple correctly
  const addModal = (modalProps: PageItem) => {
    setModals(prev => [...prev, modalProps]);
  };

  const delModal = (id: string) => {
    const filteredItems = modals.filter(item => item.id !== id);
    setModals(filteredItems);
  };

  const close = () => {
    switch (props.pageItem.openTypeCode) {
      case OpenTypeCode.MODAL:
      case OpenTypeCode.MODELESS:
        props.pageItem.closeModal?.();
        break;
      case OpenTypeCode.WINDOW:
        window.close();
        break;
      case OpenTypeCode.PAGE:
        console.log("모달페이지가 아님");
        deletePageItem(props.pageItem.id);
        break;
      default:
        break;
    }
  };

  const addWindow = (windowProps: PageItem) => {
    openWindow(windowProps);
  };

  // setPageItem(pageId, {
  //   openTypeCode : OpenTypeCode.PAGE,
  //   id: pageId,
  //   label: label,
  //   pathname: pathname,
  //   search: search,
  //   routePath: routepath,
  //   //options: {},
  //   params: params,
  //   element: curRouteItem.element as ReactElement,
  //   callback: callbackWithParams,
  // });

  const getPageProviderProps = () => ({
    params,
    options,
    callback,
    modals,
    addModal,
    delModal,
    close,
    addWindow,
  });

  return {
    getPageProviderProps,
  };
};

export default usePage;

//PageContext 에서 사용하기 위한 Type을 ReturnType의 함수를 통해 정의함.
export type TPageProviderProps = ReturnType<ReturnType<typeof usePage>["getPageProviderProps"]>;
