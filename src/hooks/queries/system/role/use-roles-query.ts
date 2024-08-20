import { useReactQuery } from '@/hooks/use-react-query';
import { RoleQueryKeys } from './role-query-keys';
import { getRoles } from '@/apis/system/Role';
import { UseQueryOptions } from '@tanstack/react-query';

export const useRolesQuery = (condition: string, options?: Omit<UseQueryOptions, 'queryKey'>) => {
  return useReactQuery({
    queryKey: RoleQueryKeys.roles(condition),
    queryFn: () => {
      return getRoles(condition);
    },
    ...options,
  });
};