import { useReactQuery } from "@/hooks/use-react-query";
import { CommonQueryKeys } from "@/hooks/queries/system/common/common-query-keys";
import { getCommonCodeNames } from "@/apis/common/CommonApi";

export const useCommonCodeNamesQuery = (cmnGrCd: string) => {
  return useReactQuery({
    queryKey: CommonQueryKeys.commonCodeNames(cmnGrCd),
    queryFn: () => {
      return getCommonCodeNames(cmnGrCd);
    },
  });
};
