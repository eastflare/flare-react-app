import { create } from "zustand";

import { CommonModalInitialState, CommonModalType } from "models/common/CommonModal";
// import { useTranslation } from 'react-i18next';

interface CommonModalState {
  modalType: CommonModalType;
  isOpen: boolean;
  title: string;
  content: JSX.Element | string;
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
