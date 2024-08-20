import { useReactQuery } from "@/hooks/use-react-query";
import { getApprovalDelegates } from "@/apis/system/Approval";
import { ApprovalQueryKeys } from "@/hooks/queries/system/approval/approval-query-keys";

export type DelegateSearchParam = {
  dlgtUserId?: string;
  searchStatus?: string;
};

export const useApprovalDelegatesQuery = (searchParams: DelegateSearchParam) => {
  return useReactQuery({
    queryKey: ApprovalQueryKeys.approvalDelegates(searchParams),
    queryFn: () => {
      return getApprovalDelegates(searchParams.dlgtUserId ?? "", searchParams.searchStatus ?? "");
    },
  });
};
