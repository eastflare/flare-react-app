import { RoutesProps } from "react-router-dom";

import DrawPageRoutes from "./DrawPageRoutes";
import usePageRoutes from "hooks/cmn/usePageRoutes";

const PageRoutes = ({ children, ...props }: RoutesProps) => {
  const { currentRouteId, taskRoutes } = usePageRoutes({ children });

  return <DrawPageRoutes currentRouteId={currentRouteId} routes={taskRoutes} routesProps={props} />;
};

export default PageRoutes;
