export type PageId = string;
export type PageIds = string[];
export type PageComponent = () => JSX.Element;
export type PageProps = any;
export type PageOptions = any;

export type PageObj = {
  Component: PageComponent;
  props?: PageProps;
  options?: PageOptions;
};

export type ModalContextType = {
  pageId: string;
  childIds: string[];
  addChildId: (childId: string) => void;
  removeChildId: (childId: string) => void;
};

export const ModalContextInit: ModalContextType = {
  pageId: '',
  childIds: [],
  addChildId: () => {},
  removeChildId: () => {},
};
