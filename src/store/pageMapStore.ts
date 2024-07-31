import { ReactElement } from "react";
import { create } from "zustand";

type Object = {
  [key: string]: any;
};

export enum OpenTypeCode {
  PAGE = "PAGE",
  DETAIL = "DETAIL",
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
export type PopupFunction = () => void;

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
  getPageItem: (id: string) => PageItem | undefined;
  deletePageItem: (id: string) => void;
  resetPageMap: () => void;
  setMasterPageItem: (id: string, obj: PageItem) => void;
  setDetailPageItem: (id: string, obj: PageItem) => void;
  setTabsOrder: (newOrder: string[]) => void;
}

const usePageMapStore = create<PageMapStore>((set, get) => ({
  pageMap: new Map(),
  curPageId: "",
  setCurPageId: id => set({ curPageId: id }),

  setPageItem: (id, obj) =>
    set(state => {
      //신규 페이지를 추가함
      const newMap = new Map(state.pageMap);
      newMap.set(id, obj);
      console.log("나는 추가됨", newMap);
      return { pageMap: newMap, curPageId: id };
    }),

  getPageItem: id => get().pageMap.get(id),

  deletePageItem: id =>
    set(state => {
      const newMap = new Map(state.pageMap);
      newMap.delete(id);
      return { pageMap: newMap };
    }),

  resetPageMap: () =>
    set(state => {
      // Keep only the entry with id '/'
      const newMap = new Map();
      if (state.pageMap.has("/")) {
        newMap.set("/", state.pageMap.get("/"));
      }
      return { pageMap: newMap, curPageId: "/" };
    }),

  setMasterPageItem: (id: string, obj: PageItem) =>
    set(() => {
      const newMap = new Map();
      newMap.set(id, obj);
      return { pageMap: newMap, curPageId: id };
    }),

  setDetailPageItem: (id, obj) =>
    set(state => {
      const newMap = new Map(state.pageMap);
      const entries = Array.from(newMap.entries());

      if (entries.length <= 1) {
        // If there are no items, add the new item as the first item
        newMap.set(id, obj);
      } else {
        // If there are already two items, replace the second item
        const firstItem = entries[0];
        newMap.clear();
        newMap.set(firstItem[0], firstItem[1]);
        newMap.set(id, obj);
      }

      console.log("나는 두 번째 항목으로 추가됨", newMap);
      return { pageMap: newMap, curPageId: id };
    }),

  setTabsOrder: newOrder =>
    set(state => {
      const newMap = new Map<string, PageItem>();
      newOrder.forEach(id => {
        const item = state.pageMap.get(id);
        if (item) {
          newMap.set(id, item);
        }
      });
      return { pageMap: newMap };
    }),
}));

export default usePageMapStore;
