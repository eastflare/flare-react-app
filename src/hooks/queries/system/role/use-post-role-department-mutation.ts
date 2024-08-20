import { insertRoleDepartment } from "@/apis/system/RoleDepartment";
import { useReactMutation } from "@/hooks/use-react-mutation";
import { RoleDepartmentMutateRequest } from "@/models/system/Role";

export const usePostRoleDepartmentMutation = () => {
  return useReactMutation((roleDepartmentMutateRequest: RoleDepartmentMutateRequest) => {
    return insertRoleDepartment(roleDepartmentMutateRequest);
  });
};
