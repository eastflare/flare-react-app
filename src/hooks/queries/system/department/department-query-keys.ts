export const DepartmentQueryKeys = {
  key: ["department"] as const,
  departments: (params: { searchItem: string; deptNm: string }) => [...DepartmentQueryKeys.key, { ...params }] as const,
};
