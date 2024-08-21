import { useReactQuery } from "@/hooks/use-react-query";
import { findRoutes } from "@/apis/system/Route";
import { routeQueryKeys } from "@/hooks/queries/system/route/route-query-keys";
import { RouteCondition } from "@/models/system/Route";

export const useRoutesQuery = (condition: RouteCondition) => {
  return useReactQuery({
    queryKey: routeQueryKeys.routes(condition),
    queryFn: () => {
      return findRoutes(condition);
    },
  });
};
