import { create } from "zustand";

type Object = {
  [key: string]: any;
};

export type CallbackFunction<T = any, R = any> = (...args: T[]) => R;

interface PageItem {
  id: string;
  label: string;
  pathname: string;
  originPath: string;
  routePath: string;
  params?: Object;
  options?: Object;
  callback?: CallbackFunction;
}

interface PageMapStore {
  pageMap: Map<string, PageItem>;
  addPageItem: (id: string, obj: PageItem) => void;
  deletePageItem: (id: string) => void;
  resetPageItem: () => void;
}

const usePageMapStore = create<PageMapStore>(set => ({
  pageMap: new Map(),

  addPageItem: (id, obj) =>
    set(state => {
      // 기존 데이터를 순회하면서 originPath와 같은 아이템이 있을경우 변경하지 않는다.
      for (const item of state.pageMap.values()) {
        if (item.originPath === obj.originPath) {
          return state;
        }
      }

      //신규 페이지를 추가함
      const newMap = new Map(state.pageMap);
      newMap.set(id, obj);
      console.log("나는 추가됨", obj);
      return { pageMap: newMap };
    }),

  deletePageItem: id =>
    set(state => {
      const newMap = new Map(state.pageMap);
      newMap.delete(id);
      return { pageMap: newMap };
    }),

  resetPageItem: () => set({ pageMap: new Map() }),
}));

export default usePageMapStore;
