import { ReactElement } from "react";
import { create } from "zustand";

type Object = {
  [key: string]: any;
};

export type CallbackFunction<T = any, R = any> = (...args: T[]) => R;

export interface PageItem {
  id: string;
  label: string;
  pathname: string;
  originPath: string;
  routePath: string;
  params?: Object;
  options?: Object;
  callback?: CallbackFunction;
  element: ReactElement;
}

interface PageMapStore {
  pageMap: Map<string, PageItem>;
  curPageId: string;
  setCurPageId: (id: string) => void;
  addPageItem: (id: string, obj: PageItem) => void;
  deletePageItem: (id: string) => void;
  resetPageMap: () => void;
}

const usePageMapStore = create<PageMapStore>(set => ({
  pageMap: new Map(),
  curPageId: "/",
  setCurPageId: id => set({ curPageId: id }),

  addPageItem: (id, obj) =>
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
