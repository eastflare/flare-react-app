import { create } from "zustand";

interface PageCallbackStore {
  pageCallbacks: Record<string, Function>;
  addPageCallback: (id: string, func: Function) => void;
  removePageCallback: (id: string) => void;
  resetPageCallbacks: () => void;
}

const usePageCallbackStore = create<PageCallbackStore>(set => ({
  pageCallbacks: {},

  addPageCallback: (id, func) =>
    set(state => ({
      pageCallbacks: {
        ...state.pageCallbacks,
        [id]: func,
      },
    })),

  removePageCallback: id =>
    set(state => {
      const newPageCallbacks = { ...state.pageCallbacks };
      delete newPageCallbacks[id];
      return { pageCallbacks: newPageCallbacks };
    }),

  resetPageCallbacks: () => set({ pageCallbacks: {} }),
}));

export default usePageCallbackStore;
