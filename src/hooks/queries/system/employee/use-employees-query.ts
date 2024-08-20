import { useReactQuery } from "@/hooks/use-react-query";
import { EmployeeQueryKeys } from "./employee-query-keys";
import { getEmployeeBySearchCondition } from "@/apis/system/Employee";

type UseEmployeesQueryProps = {
  searchItem?: string;
  deptCd?: string;
  deptNm?: string;
  empNm?: string;
};

function useEmployeesQuery({ searchItem = "", deptCd = "", deptNm = "", empNm = "" }: UseEmployeesQueryProps) {
  return useReactQuery({
    queryKey: EmployeeQueryKeys.employees({ searchItem, deptCd, deptNm, empNm }),
    queryFn: () => getEmployeeBySearchCondition(searchItem, deptCd, deptNm, empNm),
    enabled: Boolean(deptCd),
  });
}

export { useEmployeesQuery };
