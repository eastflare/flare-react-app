import { useReactQuery } from "@/hooks/use-react-query";
import { findRoutes } from "@/apis/system/Route";
import { routeQueryKeys } from "@/hooks/queries/system/route/route-query-keys";
import { RouteCondition } from "@/models/system/Route";

export const useRoutesQuery = ({ ruteId, ruteNm, ruteUrl, useYn }: RouteCondition) => {
  return useReactQuery({
    queryKey: routeQueryKeys.routes({ ruteId, ruteNm, ruteUrl, useYn }),
    queryFn: () => {
      return findRoutes({ ruteId, ruteNm, ruteUrl, useYn });
    },
  });
};
