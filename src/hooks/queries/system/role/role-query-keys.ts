export const RoleQueryKeys = {
  key: ["role"] as const,
  roles: (condition: string) => [...RoleQueryKeys.key, "roles", condition] as const,
  roleDepartments: (condition: string) => [...RoleQueryKeys.key, "roleDepartments", condition] as const,
  roleEmployees: (condition: string) => [...RoleQueryKeys.key, "roleEmployees", condition] as const,
};
