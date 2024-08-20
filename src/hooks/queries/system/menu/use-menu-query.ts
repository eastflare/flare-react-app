import { useReactQuery } from "@/hooks/use-react-query";
import { MenuQueryKeys } from "./menu-query-keys";
import { getAllMenus } from "@/apis/system/MenuApi";
import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { MenuVO } from "@/models/system/Menu";
import { CommonError } from "@/models/common/APIError";

export const useMenuAllQuery = (options?: Omit<UseQueryOptions<MenuVO[], CommonError, MenuVO[], QueryKey>, "queryKey">) => {
  return useReactQuery({
    queryKey: MenuQueryKeys.menuAll(),
    queryFn: () => {
      return getAllMenus();
    },
    ...options,
  });
};
