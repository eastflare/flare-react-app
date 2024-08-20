import { useReactQuery } from '@/hooks/use-react-query';
import { DepartmentQueryKeys } from './department-query-keys';
import { getDepartments } from '@/apis/system/Department';

type UseDepartmentsQueryProps = {
  searchItem?: string;
  deptNm?: string;
};

function useDepartmentsQuery({ searchItem = '', deptNm = '' }: UseDepartmentsQueryProps) {
  return useReactQuery({
    queryKey: DepartmentQueryKeys.departments({ searchItem, deptNm }),
    queryFn: () => getDepartments(searchItem, deptNm),
  });
}

export { useDepartmentsQuery };