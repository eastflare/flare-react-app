import { RoutesProps } from "react-router-dom";

import DrawPageRoutes from "./DrawPageRoutes";
import usePageRoutes from "hooks/cmn/usePageRoutes";

const PageRoutes = ({ children, ...props }: RoutesProps) => {
  const { curRouteId, openedRoutes } = usePageRoutes({ children });

  return <DrawPageRoutes currentRouteId={curRouteId} routes={openedRoutes} routesProps={props} />;
};

export default PageRoutes;
