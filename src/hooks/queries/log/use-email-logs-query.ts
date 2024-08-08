import { useReactQuery } from "@/hooks/use-react-query";
import { EmailLog, EmailLogRequest } from "@/models/admin/EmailLog";
import { findEmailLogs } from "@/apis/admin/EmailLog";
import { LogQueryKeys } from "./log-query-keys";
import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { PaginationResponse } from "@/models/common/Pagination";
import { CommonError } from "@/models/common/APIError";

export const useEmailLogsQuery = (condition: EmailLogRequest, options?: Omit<UseQueryOptions<PaginationResponse<EmailLog>, CommonError, PaginationResponse<EmailLog>, QueryKey>, "queryKey">) => {
  return useReactQuery({
    queryKey: LogQueryKeys.EmailLogs(condition),
    queryFn: () => {
      return findEmailLogs(condition);
    },
    ...options,
  });
};
