export const EmployeeQueryKeys = {
  key: ["employee"] as const,
  employees: (params: { searchItem: string; deptCd: string; deptNm: string; empNm: string }) => [...EmployeeQueryKeys.key, { ...params }] as const,
};
