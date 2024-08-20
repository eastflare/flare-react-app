import { useReactMutation } from "@/hooks/use-react-mutation";
import { saveApprovalDelegates } from "@/apis/system/Approval";
import { ApprovalDelegate } from "@/models/system/Approval";

export const useApprovalDelegateMutation = () => {
  return useReactMutation((approvalDelegates: ApprovalDelegate[]) => {
    return saveApprovalDelegates(approvalDelegates);
  });
};
