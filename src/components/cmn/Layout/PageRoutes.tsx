import { RoutesProps } from "react-router-dom";

import DrawPageRoutes from "./DrawPageRoutes";
import usePageRoutes from "hooks/cmn/usePageRoutes";
import { memo } from "react";

const PageRoutes = ({ children, ...props }: RoutesProps) => {
  const { curPageId, openedPageMap } = usePageRoutes({ children });
  console.log("나는openedPageMap입니다.", openedPageMap);
  return <DrawPageRoutes curPageId={curPageId} openedPageMap={openedPageMap} routesProps={props} />;
};

export default memo(PageRoutes);
