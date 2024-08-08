import { useReactQuery } from "@/hooks/use-react-query";
import { LoginLog, LoginLogRequest } from "@/models/admin/LoginLog";
import { findLoginLogs } from "@/apis/admin/LoginLog";
import { LogQueryKeys } from "./log-query-keys";
import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { PaginationResponse } from "@/models/common/Pagination";
import { CommonError } from "@/models/common/APIError";

export const useLoginLogsQuery = (condition: LoginLogRequest, options?: Omit<UseQueryOptions<PaginationResponse<LoginLog>, CommonError, PaginationResponse<LoginLog>, QueryKey>, "queryKey">) => {
  return useReactQuery({
    queryKey: LogQueryKeys.LoginLogs(condition),
    queryFn: () => {
      return findLoginLogs(condition);
    },
    ...options,
  });
};
