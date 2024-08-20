import { useReactQuery } from "@/hooks/use-react-query";
import { getCommonCodeGroups } from "@/apis/system/CommonCode";
import { CommonQueryKeys } from "@/hooks/queries/system/common/common-query-keys";

export type CommonCodeSearchParams = {
  cmnGrCd: string;
  cmnCd: string;
  useYn: string;
};

export const useCommonCodeGroupsQuery = ({ cmnGrCd, cmnCd, useYn }: CommonCodeSearchParams) => {
  return useReactQuery({
    queryKey: CommonQueryKeys.commonCodeGroups({ cmnGrCd, cmnCd, useYn }),
    queryFn: () => {
      return getCommonCodeGroups(cmnGrCd, cmnCd, useYn);
    },
  });
};
