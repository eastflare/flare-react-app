import { useEffect, useMemo, useState } from "react";
import { ModalItem, OpenTypeCode, PageItem, WindowItem } from "stores/usePageMapStore";
import { openWindow } from "utils/windowUtil";
import usePageTab from "./usePageTab";

const usePage = (props: { pageItem: PageItem | ModalItem | WindowItem }) => {
  const { openTypeCode = OpenTypeCode.PAGE, params = {}, options = {}, callback = () => {} } = props.pageItem;

  const { onPageTabClose } = usePageTab();
  const [modals, setModals] = useState<ModalItem[]>([]); // Destructure the tuple correctly
  const [refreshCount, setRefreshCount] = useState(0);
  const addModal = (modalProps: ModalItem) => {
    setModals(prev => [...prev, modalProps]);
  };

  // Function to decode all values in the params object
  const decodeParams = (params: { [key: string]: string }) => {
    const decodedParams: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(params)) {
      decodedParams[key] = decodeURIComponent(value);
    }
    return decodedParams;
  };

  // Decoding the params
  const decodedParams = useMemo(() => decodeParams(params), [params]);

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
        console.log("일반페이지 지우기1", props.pageItem.id);
        onPageTabClose(props.pageItem.id);
        console.log("일반페이지 지우기2", props.pageItem.id);
        break;
      default:
        break;
    }
  };

  const addWindow = (windowProps: WindowItem) => {
    openWindow(windowProps);
  };

  const getPageProviderProps = () => ({
    openTypeCode,
    refreshCount,
    setRefreshCount,
    params: decodedParams,
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
