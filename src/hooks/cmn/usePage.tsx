import { useEffect, useState } from "react";
import usePageMapStore, { ModalItem, OpenTypeCode, PageItem, WindowItem } from "store/pageMapStore";
import { openWindow } from "utils/windowUtil";

const usePage = (props: { pageItem: PageItem | ModalItem | WindowItem }) => {
  const {
    openTypeCode = OpenTypeCode.PAGE,
    params = {},
    options = {},
    callback = () => {},
  } = props.pageItem;
  const { deletePageItem } = usePageMapStore();

  const [modals, setModals] = useState<ModalItem[]>([]); // Destructure the tuple correctly
  const addModal = (modalProps: ModalItem) => {
    setModals(prev => [...prev, modalProps]);
  };

  useEffect(() => {
    console.log("모달 키 리스트", modals);
  }, []);

  const delModal = (id: string) => {
    //카운트를 기억해라.... 기본도 안된 사람아
    setModals(prev => prev.filter(item => item.id !== id));
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
        deletePageItem(props.pageItem.id);
        break;
      default:
        break;
    }
  };

  const addWindow = (windowProps: WindowItem) => {
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
    openTypeCode,
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
