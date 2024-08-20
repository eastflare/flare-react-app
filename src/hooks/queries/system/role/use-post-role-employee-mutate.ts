import { setRoleEmps } from "@/apis/system/RoleEmployee";
import { useReactMutation } from "@/hooks/use-react-mutation";
import { RoleEmployeeMutateRequest } from "@/models/system/Role";

export const usePostRoleEmployeeMutate = () => {
  return useReactMutation((roleEmployeeMutateRequest: RoleEmployeeMutateRequest) => {
    return setRoleEmps(roleEmployeeMutateRequest);
  });
};
