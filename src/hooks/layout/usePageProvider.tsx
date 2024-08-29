import { useEffect, useMemo, useState, useCallback } from "react";
import { PopupItem, OpenTypeCode, PageItem } from "stores/usePageMapStore";
import { openWindow } from "utils/windowUtil";
import usePageTab from "./usePageTab";

const usePageProvider = (props: { pageItem: PageItem | PopupItem }) => {
  const { openTypeCode = OpenTypeCode.PAGE, params = {}, options = {}, callback = () => {} } = props.pageItem;

  const { onPageTabClose } = usePageTab();
  const [modals, setModals] = useState<PopupItem[]>([]);
  const [refreshCount, setRefreshCount] = useState(0);

  const addModal = useCallback((modalProps: PopupItem) => {
    setModals(prev => [...prev, modalProps]);
  }, []);

  const delModal = useCallback((id: string) => {
    setModals(prev => prev.filter(item => item.id !== id));
  }, []);

  console.log("또 이거슨 뭔가요?", props.pageItem);

  const close = useCallback(() => {
    switch (props.pageItem.openTypeCode) {
      case OpenTypeCode.MODAL:
      case OpenTypeCode.MODELESS:
      case OpenTypeCode.DIALOG:
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
  }, [props.pageItem, onPageTabClose]);

  const addWindow = useCallback((url: string, windowProps: PopupItem) => {
    openWindow(url, windowProps);
  }, []);

  // params 객체의 값을 모두 디코딩하는 함수
  const decodeParams = (params: { [key: string]: string }) => {
    const decodedParams: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(params)) {
      decodedParams[key] = decodeURIComponent(value);
    }
    return decodedParams;
  };

  // params 디코딩
  const decodedParams = useMemo(() => decodeParams(params), [params]);

  useEffect(() => {
    //console.log("모달 키 리스트", modals);
  }, [modals]);

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

export default usePageProvider;

// PageContext 에서 사용하기 위한 Type을 ReturnType의 함수를 통해 정의함.
export type TPageProviderProps = ReturnType<ReturnType<typeof usePageProvider>["getPageProviderProps"]>;
