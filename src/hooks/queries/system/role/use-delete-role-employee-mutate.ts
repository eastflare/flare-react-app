import { deleteRoleEmps } from "@/apis/system/RoleEmployee";
import { useReactMutation } from "@/hooks/use-react-mutation";
import { RoleEmployeeMutateRequest } from "@/models/system/Role";

export const useDeleteRoleEmployeeMutate = () => {
  return useReactMutation((roleEmployeeMutateRequest: RoleEmployeeMutateRequest) => {
    return deleteRoleEmps(roleEmployeeMutateRequest);
  });
};
