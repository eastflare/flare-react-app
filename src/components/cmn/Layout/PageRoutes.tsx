import { RoutesProps } from "react-router-dom";

import DrawPageRoutes from "./DrawPageRoutes";
import usePageRoutes from "hooks/cmn/usePageRoutes";

const PageRoutes = ({ children, ...props }: RoutesProps) => {
  const { curRouteId, openedRoutesMap } = usePageRoutes({ children });

  return <DrawPageRoutes curRouteId={curRouteId} routes={openedRoutesMap} routesProps={props} />;
};

export default PageRoutes;
