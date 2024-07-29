import { RoutesProps } from "react-router-dom";

import DrawPageSdiRoute from "./DrawPageSdiRoute";
import usePageRoutes from "hooks/cmn/usePageRoutes";
import { memo } from "react";

const PageSdiRoutes = ({ children, ...props }: RoutesProps) => {
  const { curPageId, openedPageMap } = usePageRoutes({ children });
  return <></>;
  //return <DrawPageSdiRoute curPageId={curPageId} openedPageMap={openedPageMap} routesProps={props} />;
};

export default memo(PageSdiRoutes);
