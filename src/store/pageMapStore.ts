import { ReactElement } from "react";
import { create } from "zustand";

type Object = {
  [key: string]: any;
};

export enum OpenTypeCode {
  PAGE = "PAGE",
  MODAL = "MODAL",
  MODELESS = "MODELESS",
  WINDOW = "WINDOW",
}

export enum OpenPopupTypeCode {
  NORMAL = "NORMAL",
  TAB = "TAB",
}

export type CallbackFunction<T = any, R = any> = (...args: T[]) => R;
export type CloseFunction = () => void;

export interface PageItem {
  openTypeCode: OpenTypeCode;
  id: string;
  label: string;
  pathname: string;
  search: string;
  routePath: string;
  params?: Object;
  options?: Object;
  callback?: CallbackFunction;
  closeModal?: CloseFunction;
  element: ReactElement;
}

export interface ModalItem {
  openTypeCode: OpenTypeCode;
  id: string;
  label: string;
  params?: Object;
  options?: Object;
  callback?: CallbackFunction;
  closeModal?: CloseFunction;
  element: ReactElement;
}

export interface WindowItem {
  openTypeCode: OpenTypeCode;
  id: string;
  url: string;
  label: string;
  params?: Object;
  options?: Object;
  callback?: CallbackFunction;
  closeModal?: CloseFunction;
}

interface PageMapStore {
  pageMap: Map<string, PageItem>;
  curPageId: string;
  setCurPageId: (id: string) => void;
  setPageItem: (id: string, obj: PageItem) => void;
  deletePageItem: (id: string) => void;
  resetPageMap: () => void;
}

const usePageMapStore = create<PageMapStore>(set => ({
  pageMap: new Map(),
  curPageId: "/",
  setCurPageId: id => set({ curPageId: id }),

  setPageItem: (id, obj) =>
    set(state => {
      //신규 페이지를 추가함
      const newMap = new Map(state.pageMap);
      newMap.set(id, obj);
      console.log("나는 추가됨", newMap);
      return { pageMap: newMap };
    }),

  deletePageItem: id =>
    set(state => {
      const newMap = new Map(state.pageMap);
      newMap.delete(id);
      return { pageMap: newMap };
    }),

  resetPageMap: () => set({ pageMap: new Map() }),
}));

export default usePageMapStore;
