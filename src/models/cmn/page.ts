export type PageId = string;
export type PageComponent = () => JSX.Element;
export type PageProps = any;
export type PageCallback = any;
export type PageOptions = any;

export type PageObj = {
  id: PageId;
  Component: PageComponent;
  props?: PageProps;
  callback?: PageCallback;
  options?: PageOptions;
};
