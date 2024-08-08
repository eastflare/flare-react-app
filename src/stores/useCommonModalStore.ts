import { create } from "zustand";

import { CommonModalInitialState, CommonModalType } from "models/common/CommonModal";
import { DefaultTFuncReturn } from "i18next";
// import { useTranslation } from 'react-i18next';

interface CommonModalState {
  modalType: CommonModalType;
  isOpen: boolean;
  title: string | DefaultTFuncReturn;
  content: JSX.Element | string | DefaultTFuncReturn;
  showCallbackResult: boolean;
  yesCallback?: () => any;
  noCallback?: () => any;
  setCommonModalStateWhenModalOpen: (commonModalInitialState: CommonModalInitialState) => void;
  setCommonModalStateWhenModalClose: () => void;
}

export const useCommonModalStore = create<CommonModalState>(set => {
  return {
    modalType: "alert",
    isOpen: false,
    title: "",
    content: "",
    showCallbackResult: false,
    setCommonModalStateWhenModalOpen: (commonModalInitialState: CommonModalInitialState) => {
      const defaultTitle = "";
      set({
        ...commonModalInitialState,
        isOpen: true,
        title: commonModalInitialState.title ?? defaultTitle,
      });
    },
    setCommonModalStateWhenModalClose: () => {
      set({
        isOpen: false,
        modalType: "alert",
        content: "",
        yesCallback: undefined,
        noCallback: undefined,
        // showCallbackResult: false,
      });
    },
  };
});
