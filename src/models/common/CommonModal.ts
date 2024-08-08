import { DefaultTFuncReturn } from "i18next";

export type CommonModalType = "confirm" | "alert" | "yesno";

export interface CommonModalInitialState {
  modalType?: CommonModalType;
  title?: string | DefaultTFuncReturn;
  content: JSX.Element | string | DefaultTFuncReturn;
  yesCallback?: () => any;
  noCallback?: () => any;
  showCallbackResult?: boolean;
}

export enum CommonModalAnimateClassName {
  OPEN = "open-common-modal",
  CLOSE = "close-common-modal",
}

export interface CommonModalState extends CommonModalInitialState {
  isOpen: boolean;
  animation: CommonModalAnimateClassName;
}
