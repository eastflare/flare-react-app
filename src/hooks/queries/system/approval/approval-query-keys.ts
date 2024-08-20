import { DelegateSearchParam } from "@/hooks/queries/system/approval/use-approval-delegates-query";

export const ApprovalQueryKeys = {
  key: ["approval"] as const,
  approvalTemplates: (aprTplNm: string) => [...ApprovalQueryKeys.key, "approvalTemplates", aprTplNm] as const,
  approvalDelegates: (searchParams: DelegateSearchParam) => [...ApprovalQueryKeys.key, "approvalDelegates", searchParams] as const,
};
