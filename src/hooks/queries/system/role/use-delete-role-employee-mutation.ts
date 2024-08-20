import { deleteRoleEmps } from "@/apis/system/RoleEmployee";
import { useReactMutation } from "@/hooks/use-react-mutation";
import { RoleEmployeeMutateRequest } from "@/models/system/Role";

export const useDeleteRoleEmployeeMutation = () => {
  return useReactMutation((roleEmployeeMutateRequest: RoleEmployeeMutateRequest) => {
    return deleteRoleEmps(roleEmployeeMutateRequest);
  });
};
