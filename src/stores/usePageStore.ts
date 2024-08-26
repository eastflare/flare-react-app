import { Page } from "@/models/system/Page";
import { create } from "zustand";

// Zustand store 정의
interface PageStore {
  pages: Record<string, Page | null>;
  setPage: (pagePathNm: string, page: Page | null) => void;
  getPage: (pagePathNm: string) => Page | null;
}

export const usePageStore = create<PageStore>((set, get) => ({
  pages: {},
  setPage: (pagePathNm, page) => {
    set(state => ({
      pages: {
        ...state.pages,
        [pagePathNm]: page,
      },
    }));
  },
  getPage: pagePathNm => get().pages[pagePathNm],
}));
