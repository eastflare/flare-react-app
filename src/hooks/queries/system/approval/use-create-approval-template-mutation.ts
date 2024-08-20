import { useReactMutation } from "@/hooks/use-react-mutation";
import { createApprovalTemplate } from "@/apis/system/Approval";
import { ApprovalTemplate } from "@/models/system/ApprovalTemplate";

export const useCreateApprovalTemplateMutation = () => {
  return useReactMutation((approvalTemplate: ApprovalTemplate) => {
    return createApprovalTemplate(approvalTemplate);
  });
};
