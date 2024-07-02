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

export type PageContextType = {
  pageId: string;
  childIds: string[];
  addChildId: (childId: string) => void;
  removeChildId: (childId: string) => void;
};

export const PageContextInit: PageContextType = {
  pageId: '',
  childIds: [],
  addChildId: () => {},
  removeChildId: () => {},
};
