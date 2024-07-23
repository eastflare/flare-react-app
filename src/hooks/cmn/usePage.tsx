import { useState } from "react";
import { OpenTypeCode, PageItem } from "store/pageMapStore";
import { openWindow } from "utils/windowUtil";

const usePage = (props: { pageItem: PageItem }) => {
  const { params = {}, options = {}, callback = () => {} } = props.pageItem;

  const [modals, setModals] = useState<PageItem[]>([]); // Destructure the tuple correctly
  const setModal = (modalProps: PageItem) => {
    setModals(prev => [...prev, modalProps]);
  };

  const closePage = (id: string) => {
    switch (props.pageItem.openTypeCode) {
      case OpenTypeCode.MODAL:
      case OpenTypeCode.MODELESS:
        const filteredItems = modals.filter(item => item.id !== id);
        setModals(filteredItems);
        break;
      case OpenTypeCode.WINDOW:
      case OpenTypeCode.PAGE:
        console.log("모달페이지가 아님");
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
    setModal,
    close: closePage,
    addWindow,
  });

  return {
    getPageProviderProps,
  };
};

export default usePage;

//PageContext 에서 사용하기 위한 Type을 ReturnType의 함수를 통해 정의함.
export type TPageProviderProps = ReturnType<ReturnType<typeof usePage>["getPageProviderProps"]>;
