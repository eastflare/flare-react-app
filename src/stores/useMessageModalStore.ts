import { create } from "zustand";

import { Undefinedable } from "models/common/FalsyGeneric";
import { CommonModalAnimateClassName } from "models/common/CommonModal";

interface CommonModalState {
  isOpen: boolean;
  msgCtn: Undefinedable<string>;
  koMessage: Undefinedable<string>;
  animation: CommonModalAnimateClassName;
  yesCallback?: (item?: string[]) => any;
  noCallback?: () => any;
  setMessageModalStateWhenModalOpen: (msgCtn: string, koMessage?: string, yesCallback?: (item?: string[]) => void, noCallback?: () => void) => void;
  setMessageModalStateWhenModalClose: () => void;
}

export const useMessageModalStore = create<CommonModalState>(set => {
  return {
    isOpen: false,
    msgCtn: undefined,
    koMessage: undefined,
    animation: CommonModalAnimateClassName.OPEN,
    setMessageModalStateWhenModalOpen: async (msgCtn: string, koMessage?: string, yesCallback?: (item?: string[]) => any, noCallback?: () => any) => {
      set({
        isOpen: true,
        msgCtn: msgCtn,
        koMessage: koMessage ?? "",
        yesCallback: yesCallback,
        noCallback: noCallback,
      });
    },
    setMessageModalStateWhenModalClose: async () => {
      set({
        animation: CommonModalAnimateClassName.CLOSE,
      });

      setTimeout(() => {
        set({
          isOpen: false,
          msgCtn: undefined,
          yesCallback: undefined,
          noCallback: undefined,
          animation: CommonModalAnimateClassName.OPEN,
        });
      }, 180);
    },
  };
});
