import { useReactQuery } from "@/hooks/use-react-query";
import { MenuLog, MenuLogRequest } from "@/models/admin/MenuLog";
import { findMenuLogs } from "@/apis/admin/MenuLog";
import { LogQueryKeys } from "./log-query-keys";
import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { PaginationResponse } from "@/models/common/Pagination";
import { CommonError } from "@/models/common/APIError";

export const useMenuLogsQuery = (condition: MenuLogRequest, options?: Omit<UseQueryOptions<PaginationResponse<MenuLog>, CommonError, PaginationResponse<MenuLog>, QueryKey>, "queryKey">) => {
  return useReactQuery({
    queryKey: LogQueryKeys.menuLogs(condition),
    queryFn: () => {
      return findMenuLogs(condition);
    },
    ...options,
  });
};
