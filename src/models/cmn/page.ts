export type PageId = string;
export type PageComponent = () => JSX.Element;
export type PageProps = any;
export type PageOptions = any;

export type PageObj = {
  Component: PageComponent;
  props?: PageProps;
  options?: PageOptions;
};
