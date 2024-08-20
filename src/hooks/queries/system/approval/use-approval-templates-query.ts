import { useReactQuery } from "@/hooks/use-react-query";
import { getApprovalTemplate } from "@/apis/system/Approval";
import { ApprovalQueryKeys } from "@/hooks/queries/system/approval/approval-query-keys";

export const useApprovalTemplatesQuery = (aprTplNm: string) => {
  return useReactQuery({
    queryKey: ApprovalQueryKeys.approvalTemplates(aprTplNm),
    queryFn: () => {
      return getApprovalTemplate(aprTplNm);
    },
  });
};
