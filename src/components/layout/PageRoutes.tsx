import { RouteObject, RoutesProps } from "react-router-dom";
import DrawPageRoutes from "./DrawPageRoutes";
import usePageRoutes from "hooks/layout/usePageRoutes";
import { ReactElement, ReactNode, memo } from "react";
import React from "react";

const PageRoutes = ({ children, ...props }: RoutesProps) => {
  const routes = React.useMemo(() => {
    let routeElements: ReactNode[] = [];

    if (React.isValidElement(children)) {
      routeElements = React.Children.toArray(children.props.children);
    }

    return routeElements
      .filter(childNode => React.isValidElement(childNode))
      .map(childNode => {
        const element = childNode as ReactElement;
        return { path: element.props.path, element } as RouteObject;
      });
  }, [children]);

  const { curPageId, openedPageMap } = usePageRoutes({ routes });
  return <DrawPageRoutes curPageId={curPageId} openedPageMap={openedPageMap} routesProps={props} />;
};

export default memo(PageRoutes);
