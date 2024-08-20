import { useReactMutation } from "@/hooks/use-react-mutation";
import { saveRoutes } from "@/apis/system/Route";
import { Route } from "@/models/system/Route";

export const useRoutesMutation = () => {
  return useReactMutation((routes: Route[]) => {
    return saveRoutes(routes);
  });
};
