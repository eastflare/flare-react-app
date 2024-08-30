import { RouteObject, RoutesProps } from "react-router-dom";
import DrawPageRoutes from "./DrawPageRoutes";
import usePageRoutes from "hooks/layout/usePageRoutes";
import { ReactElement, ReactNode, memo } from "react";
import React from "react";
import routes from "@/pages/page-route";

const PageContainer = () => {
  // const routes = React.useMemo(() => {
  //   let routeElements: ReactNode[] = [];

  //   if (React.isValidElement(children)) {
  //     routeElements = React.Children.toArray(children.props.children);
  //   }

  //   return routeElements
  //     .filter(childNode => React.isValidElement(childNode))
  //     .map(childNode => {
  //       const element = childNode as ReactElement;
  //       return { path: element.props.path, element } as RouteObject;
  //     });
  // }, [children]);

  //console.log("이거슨 칠드런 ", children, routes);

  const { curPageId, openedPageMap } = usePageRoutes({ routes });
  return <DrawPageRoutes curPageId={curPageId} openedPageMap={openedPageMap} />;
};

export default memo(PageContainer);
