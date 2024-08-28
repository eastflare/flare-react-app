import { PopupItem } from "@/stores/usePageMapStore";
import { useState } from "react";
import { openWindow } from "utils/windowUtil";

const useMenuProvider = () => {
  const [showLeftMenu, setShowLeftMenu] = useState(false);

  const close = () => {};

  const addWindow = (url: string, windowProps: PopupItem) => {
    openWindow(url, windowProps);
  };

  const getMenuProviderProps = () => ({
    showLeftMenu,
    setShowLeftMenu,
    close,
    addWindow,
  });

  return {
    getMenuProviderProps,
  };
};

export default useMenuProvider;

//MenuContext 에서 사용하기 위한 Type을 ReturnType의 함수를 통해 정의함.
export type TMenuProviderProps = ReturnType<ReturnType<typeof useMenuProvider>["getMenuProviderProps"]>;
