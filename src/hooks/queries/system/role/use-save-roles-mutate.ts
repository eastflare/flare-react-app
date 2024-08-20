import { setRoles } from "@/apis/system/Role";
import { useReactMutation } from "@/hooks/use-react-mutation";
import { Role } from "@/models/system/Role";

export const useSaveRolesMutate = () => {
  return useReactMutation((roles: Role[]) => {
    return setRoles(roles);
  });
};
