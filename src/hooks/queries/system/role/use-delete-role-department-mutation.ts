import { deleteRoleDepartment } from "@/apis/system/RoleDepartment";
import { useReactMutation } from "@/hooks/use-react-mutation";
import { RoleDepartmentMutateRequest } from "@/models/system/Role";

export const useDeleteRoleDepartmentMutation = () => {
  return useReactMutation((roleDepartmentMutateRequest: RoleDepartmentMutateRequest) => {
    return deleteRoleDepartment(roleDepartmentMutateRequest);
  });
};
