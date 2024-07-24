import { create } from "zustand";

interface PageCallbackStore {
  pageCallbacks: Record<string, Function>;
  addPageCallback: (id: string, func: Function) => void;
  delPageCallback: (id: string) => void;
  resetPageCallbacks: () => void;
  getPageCallback: (id: string) => Function;
}

const usePageCallbackStore = create<PageCallbackStore>((set, get) => ({
  pageCallbacks: {},

  addPageCallback: (id, func) =>
    set(state => ({
      pageCallbacks: {
        ...state.pageCallbacks,
        [id]: func,
      },
    })),

  delPageCallback: id =>
    set(state => {
      const newPageCallbacks = { ...state.pageCallbacks };
      delete newPageCallbacks[id];
      return { pageCallbacks: newPageCallbacks };
    }),

  resetPageCallbacks: () => set({ pageCallbacks: {} }),

  getPageCallback: id => get().pageCallbacks[id],
}));

export default usePageCallbackStore;
