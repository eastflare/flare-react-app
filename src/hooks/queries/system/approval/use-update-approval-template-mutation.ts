import { useReactMutation } from "@/hooks/use-react-mutation";
import { modifyApprovalTemplate } from "@/apis/system/Approval";
import { ApprovalTemplate } from "@/models/system/ApprovalTemplate";

export const useUpdateApprovalTemplateMutation = () => {
  return useReactMutation((approvalTemplate: ApprovalTemplate) => {
    return modifyApprovalTemplate(approvalTemplate);
  });
};
