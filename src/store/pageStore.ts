import { create } from 'zustand';
import _ from 'lodash';
import { PageObj } from 'models/cmn/page';

interface PageState {
  pages: { [id: string]: PageObj };
  addPage: (id: string, page: PageObj) => void;
  removePage: (id: string) => void;
}

export const usePageStore = create<PageState>((set) => ({
  pages: {},
  addPage: (id, page) =>
    set((state) => {
      return { pages: { ...state.pages, [id]: page } };
    }),
  removePage: (id) =>
    set((state) => {
      const _pages = _.cloneDeep(state.pages);
      delete _pages[id];
      return { pages: _pages };
    }),
}));

interface SubPageState {
  subPages: { [id: string]: string };
  addSubPage: (id: string, parentId: string) => void;
  removeSubPage: (id: string) => void;
}

export const useSubPageStore = create<SubPageState>((set) => ({
  subPages: {},
  addSubPage: (id, parentId) =>
    set((state) => {
      return { subPages: { ...state.subPages, [id]: parentId } };
    }),
  removeSubPage: (id) =>
    set((state) => {
      const _subPages = { ...state.subPages };
      delete _subPages[id];
      return { subPages: _subPages };
    }),
}));

interface ModalState {
  modals: string[];
  addModal: (id: string) => void;
  removeModal: (id: string) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modals: [],
  addModal: (id) =>
    set((state) => {
      return { modals: [...state.modals, id] };
    }),
  removeModal: (id) =>
    set((state) => {
      return { modals: state.modals.filter((modalId) => modalId !== id) };
    }),
}));
