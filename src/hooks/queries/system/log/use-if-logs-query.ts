import { useReactQuery } from "@/hooks/use-react-query";
import { IfLog, IfLogRequest } from "@/models/system/IfLog";
import { findIfLogs } from "@/apis/system/ifLog";
import { LogQueryKeys } from "./log-query-keys";
import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { PaginationResponse } from "@/models/common/Pagination";
import { CommonError } from "@/models/common/APIError";

export const useIfLogsQuery = (condition: IfLogRequest, options?: Omit<UseQueryOptions<PaginationResponse<IfLog>, CommonError, PaginationResponse<IfLog>, QueryKey>, "queryKey">) => {
  return useReactQuery({
    queryKey: LogQueryKeys.IfLogs(condition),
    queryFn: () => {
      return findIfLogs(condition);
    },
    ...options,
  });
};
