import { RoutesProps } from "react-router-dom";

import DrawPageMdiRoutes from "./DrawPageMdiRoutes";
import usePageRoutes from "hooks/cmn/usePageRoutes";
import { memo } from "react";

const PageMdiRoutes = ({ children, ...props }: RoutesProps) => {
  const { curPageId, openedPageMap } = usePageRoutes({ children });

  return <DrawPageMdiRoutes curPageId={curPageId} openedPageMap={openedPageMap} routesProps={props} />;
};

export default memo(PageMdiRoutes);
