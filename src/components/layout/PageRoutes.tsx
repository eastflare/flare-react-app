import { RoutesProps } from "react-router-dom";
import DrawPageRoutes from "./DrawPageRoutes";
import usePageRoutes from "hooks/layout/usePageRoutes";
import { memo } from "react";

const PageRoutes = ({ children, ...props }: RoutesProps) => {
  const { curPageId, openedPageMap } = usePageRoutes({ children });
  return <DrawPageRoutes curPageId={curPageId} openedPageMap={openedPageMap} routesProps={props} />;
};

export default memo(PageRoutes);
