import { useReactQuery } from "@/hooks/use-react-query";
import { RoleQueryKeys } from "./role-query-keys";
import { UseQueryOptions } from "@tanstack/react-query";
import { getRoleDepartment } from "@/apis/system/RoleDepartment";

export const useRoleDepartmentsQuery = (condition: string, options?: Omit<UseQueryOptions, "queryKey">) => {
  return useReactQuery({
    queryKey: RoleQueryKeys.roleDepartments(condition),
    queryFn: () => {
      return getRoleDepartment(condition);
    },
    ...options,
  });
};
