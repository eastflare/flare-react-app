import { useReactQuery } from '@/hooks/use-react-query';
import { RoleQueryKeys } from './role-query-keys';
import { UseQueryOptions } from '@tanstack/react-query';
import { getRoleEmps } from '@/apis/system/RoleEmployee';

export const useRoleEmployeesQuery = (
  condition: string,
  options?: Omit<UseQueryOptions, 'queryKey'>
) => {
  return useReactQuery({
    queryKey: RoleQueryKeys.roleEmployees(condition),
    queryFn: () => {
      return getRoleEmps(condition);
    },
    ...options,
  });
};